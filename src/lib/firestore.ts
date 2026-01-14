import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  DocumentSnapshot,
  Timestamp,
  runTransaction,
  increment,
  QueryConstraint,
} from 'firebase/firestore';
import { db } from './firebase';
import type { Company, Review, User, CompanyStatus } from '@/types';
import { calculateCompanyStatus, calculateUpdatedRatings, calculateUpdatedAverage, slugify } from '@/utils/calculations';

// Collections
const companiesRef = collection(db, 'companies');
const reviewsRef = collection(db, 'reviews');
const usersRef = collection(db, 'users');
const votesRef = collection(db, 'votes');

// ============ COMPANIES ============

export async function getCompanies(
  filters?: {
    district?: string;
    category?: string;
    status?: CompanyStatus;
    sortBy?: 'recent' | 'rating-high' | 'rating-low' | 'reviews';
  },
  pageSize = 12,
  lastDoc?: DocumentSnapshot
): Promise<{ companies: Company[]; lastDoc: DocumentSnapshot | null; hasMore: boolean }> {
  const constraints: QueryConstraint[] = [];

  if (filters?.district) {
    constraints.push(where('location.district', '==', filters.district));
  }

  if (filters?.category) {
    constraints.push(where('categories', 'array-contains', filters.category));
  }

  if (filters?.status) {
    constraints.push(where('status', '==', filters.status));
  }

  // Sorting
  switch (filters?.sortBy) {
    case 'rating-high':
      constraints.push(orderBy('avgRating', 'desc'));
      break;
    case 'rating-low':
      constraints.push(orderBy('avgRating', 'asc'));
      break;
    case 'reviews':
      constraints.push(orderBy('reviewsCount', 'desc'));
      break;
    default:
      constraints.push(orderBy('updatedAt', 'desc'));
  }

  constraints.push(limit(pageSize + 1));

  if (lastDoc) {
    constraints.push(startAfter(lastDoc));
  }

  const q = query(companiesRef, ...constraints);
  const snapshot = await getDocs(q);

  const companies: Company[] = [];
  let lastVisible: DocumentSnapshot | null = null;

  snapshot.docs.slice(0, pageSize).forEach((doc) => {
    companies.push({ id: doc.id, ...doc.data() } as Company);
    lastVisible = doc;
  });

  return {
    companies,
    lastDoc: lastVisible,
    hasMore: snapshot.docs.length > pageSize,
  };
}

export async function getCompanyBySlug(slug: string): Promise<Company | null> {
  const q = query(companiesRef, where('slug', '==', slug), limit(1));
  const snapshot = await getDocs(q);

  if (snapshot.empty) return null;

  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() } as Company;
}

export async function getCompanyById(id: string): Promise<Company | null> {
  const docRef = doc(companiesRef, id);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) return null;

  return { id: snapshot.id, ...snapshot.data() } as Company;
}

export async function searchCompanies(searchTerm: string): Promise<Company[]> {
  // Simple prefix search - for production, consider Algolia or similar
  const normalizedSearch = searchTerm.toLowerCase();

  const q = query(
    companiesRef,
    orderBy('name'),
    limit(10)
  );

  const snapshot = await getDocs(q);
  const companies: Company[] = [];

  snapshot.forEach((doc) => {
    const data = doc.data();
    if (data.name.toLowerCase().includes(normalizedSearch)) {
      companies.push({ id: doc.id, ...data } as Company);
    }
  });

  return companies;
}

export async function createOrGetCompany(
  name: string,
  location: { district: string; city: string },
  categories: string[]
): Promise<string> {
  const slug = slugify(name);

  // Check if company exists
  const existing = await getCompanyBySlug(slug);
  if (existing) return existing.id;

  // Create new company
  const now = Timestamp.now();
  const newCompany = {
    name,
    slug,
    location,
    categories,
    avgRating: 0,
    ratingsBreakdown: {
      qualidadeTrabalho: 0,
      cumprimentoPrazos: 0,
      comunicacao: 0,
      resolucaoProblemas: 0,
      qualidadePreco: 0,
      profissionalismo: 0,
    },
    reviewsCount: 0,
    status: 'neutro' as CompanyStatus,
    createdAt: now,
    updatedAt: now,
  };

  const docRef = await addDoc(companiesRef, newCompany);
  return docRef.id;
}

// ============ REVIEWS ============

export async function getReviewsForCompany(
  companyId: string,
  pageSize = 10,
  lastDoc?: DocumentSnapshot
): Promise<{ reviews: Review[]; lastDoc: DocumentSnapshot | null; hasMore: boolean }> {
  const constraints: QueryConstraint[] = [
    where('companyId', '==', companyId),
    orderBy('createdAt', 'desc'),
    limit(pageSize + 1),
  ];

  if (lastDoc) {
    constraints.push(startAfter(lastDoc));
  }

  const q = query(reviewsRef, ...constraints);
  const snapshot = await getDocs(q);

  const reviews: Review[] = [];
  let lastVisible: DocumentSnapshot | null = null;

  snapshot.docs.slice(0, pageSize).forEach((doc) => {
    reviews.push({ id: doc.id, ...doc.data() } as Review);
    lastVisible = doc;
  });

  return {
    reviews,
    lastDoc: lastVisible,
    hasMore: snapshot.docs.length > pageSize,
  };
}

export async function getUserReviews(userId: string): Promise<Review[]> {
  const q = query(
    reviewsRef,
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Review));
}

export async function createReview(
  reviewData: Omit<Review, 'id' | 'helpfulVotes' | 'reportCount' | 'companyResponse' | 'createdAt' | 'updatedAt'>
): Promise<string> {
  const now = Timestamp.now();

  // Use transaction to update company stats atomically
  const reviewId = await runTransaction(db, async (transaction) => {
    const companyRef = doc(companiesRef, reviewData.companyId);
    const companyDoc = await transaction.get(companyRef);

    if (!companyDoc.exists()) {
      throw new Error('Company not found');
    }

    const companyData = companyDoc.data() as Company;
    const newReviewsCount = companyData.reviewsCount + 1;

    // Calculate new ratings
    const newRatingsBreakdown = calculateUpdatedRatings(
      companyData.ratingsBreakdown,
      companyData.reviewsCount,
      reviewData.ratings
    );

    const newAvgRating = calculateUpdatedAverage(
      companyData.avgRating,
      companyData.reviewsCount,
      reviewData.overallRating
    );

    const newStatus = calculateCompanyStatus(newAvgRating);

    // Create review
    const reviewRef = doc(reviewsRef);
    transaction.set(reviewRef, {
      ...reviewData,
      helpfulVotes: 0,
      reportCount: 0,
      companyResponse: null,
      createdAt: now,
      updatedAt: now,
    });

    // Update company
    transaction.update(companyRef, {
      avgRating: newAvgRating,
      ratingsBreakdown: newRatingsBreakdown,
      reviewsCount: newReviewsCount,
      status: newStatus,
      updatedAt: now,
    });

    // Update user review count
    const userRef = doc(usersRef, reviewData.userId);
    transaction.update(userRef, {
      reviewsCount: increment(1),
    });

    return reviewRef.id;
  });

  return reviewId;
}

export async function updateReview(
  reviewId: string,
  updates: Partial<Review>
): Promise<void> {
  const reviewRef = doc(reviewsRef, reviewId);
  await updateDoc(reviewRef, {
    ...updates,
    updatedAt: Timestamp.now(),
  });
}

export async function deleteReview(reviewId: string, userId: string): Promise<void> {
  await runTransaction(db, async (transaction) => {
    const reviewRef = doc(reviewsRef, reviewId);
    const reviewDoc = await transaction.get(reviewRef);

    if (!reviewDoc.exists()) {
      throw new Error('Review not found');
    }

    const reviewData = reviewDoc.data() as Review;
    const companyRef = doc(companiesRef, reviewData.companyId);
    const companyDoc = await transaction.get(companyRef);

    if (companyDoc.exists()) {
      const companyData = companyDoc.data() as Company;
      const newReviewsCount = Math.max(0, companyData.reviewsCount - 1);

      // Recalculate would require fetching all reviews, so we'll just decrement
      // In production, you might want a Cloud Function for accurate recalculation
      transaction.update(companyRef, {
        reviewsCount: newReviewsCount,
        updatedAt: Timestamp.now(),
      });
    }

    // Delete review
    transaction.delete(reviewRef);

    // Update user review count
    const userRef = doc(usersRef, userId);
    transaction.update(userRef, {
      reviewsCount: increment(-1),
    });
  });
}

// ============ VOTES ============

export async function voteOnReview(
  reviewId: string,
  oderId: string,
  helpful: boolean
): Promise<void> {
  const voteId = `${oderId}_${reviewId}`;
  const voteRef = doc(votesRef, voteId);
  const voteDoc = await getDoc(voteRef);

  await runTransaction(db, async (transaction) => {
    const reviewRef = doc(reviewsRef, reviewId);
    const reviewDoc = await transaction.get(reviewRef);

    if (!reviewDoc.exists()) {
      throw new Error('Review not found');
    }

    if (voteDoc.exists()) {
      const existingVote = voteDoc.data();

      if (existingVote.helpful === helpful) {
        // Remove vote
        transaction.delete(voteRef);
        transaction.update(reviewRef, {
          helpfulVotes: increment(helpful ? -1 : 0),
        });
      } else {
        // Change vote
        transaction.update(voteRef, {
          helpful,
          odAt: Timestamp.now(),
        });
        transaction.update(reviewRef, {
          helpfulVotes: increment(helpful ? 1 : -1),
        });
      }
    } else {
      // New vote
      transaction.set(voteRef, {
        odId: voteId,
        oderId,
        helpful,
        odAt: Timestamp.now(),
      });

      if (helpful) {
        transaction.update(reviewRef, {
          helpfulVotes: increment(1),
        });
      }
    }
  });
}

export async function getUserVote(reviewId: string, oderId: string): Promise<boolean | null> {
  const voteId = `${oderId}_${reviewId}`;
  const voteRef = doc(votesRef, voteId);
  const voteDoc = await getDoc(voteRef);

  if (!voteDoc.exists()) return null;

  return voteDoc.data().helpful;
}

// ============ USERS ============

export async function createUser(userId: string, data: Omit<User, 'id'>): Promise<void> {
  const userRef = doc(usersRef, userId);
  await updateDoc(userRef, data).catch(() => {
    // Document doesn't exist, create it
    return addDoc(collection(db, 'users'), { ...data, id: userId });
  });
}

export async function getUser(userId: string): Promise<User | null> {
  const userRef = doc(usersRef, userId);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) return null;

  return { id: userDoc.id, ...userDoc.data() } as User;
}

// ============ STATS ============

export async function getStats(): Promise<{ companiesCount: number; reviewsCount: number }> {
  // For demo purposes, we'll count documents
  // In production, consider maintaining counters in a separate document
  const [companiesSnapshot, reviewsSnapshot] = await Promise.all([
    getDocs(query(companiesRef, limit(1000))),
    getDocs(query(reviewsRef, limit(1000))),
  ]);

  return {
    companiesCount: companiesSnapshot.size,
    reviewsCount: reviewsSnapshot.size,
  };
}
