import { Timestamp } from 'firebase/firestore';

export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL: string | null;
  createdAt: Timestamp;
  reviewsCount: number;
}

export interface CompanyLocation {
  district: string;
  city: string;
}

export interface RatingsBreakdown {
  qualidadeTrabalho: number;
  cumprimentoPrazos: number;
  comunicacao: number;
  resolucaoProblemas: number;
  qualidadePreco: number;
  profissionalismo: number;
}

export type CompanyStatus = 'recomendado' | 'neutro' | 'com-problemas' | 'evitar';

export interface Company {
  id: string;
  name: string;
  slug: string;
  location: CompanyLocation;
  categories: string[];
  avgRating: number;
  ratingsBreakdown: RatingsBreakdown;
  reviewsCount: number;
  status: CompanyStatus;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type RecommendationType = 'yes' | 'no' | 'with-reservations';

export interface CompanyResponse {
  content: string;
  respondedAt: Timestamp;
}

export interface Review {
  id: string;
  companyId: string;
  userId: string;
  userName: string;
  isAnonymous: boolean;
  ratings: RatingsBreakdown;
  overallRating: number;
  title: string;
  content: string;
  workType: string[];
  serviceDate: Timestamp;
  wouldRecommend: RecommendationType;
  photos: string[];
  helpfulVotes: number;
  reportCount: number;
  companyResponse: CompanyResponse | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Vote {
  odId: string;
  oderId: string;
  helpful: boolean;
  odAt: Timestamp;
  userId: string;
}

// Form types
export interface ReviewFormData {
  companyName: string;
  companyLocation: CompanyLocation;
  workType: string[];
  ratings: RatingsBreakdown;
  title: string;
  content: string;
  serviceDate: Date;
  wouldRecommend: RecommendationType;
  photos: File[];
  isAnonymous: boolean;
}

// Filter types
export interface CompanyFilters {
  district?: string;
  category?: string;
  minRating?: number;
  maxRating?: number;
  status?: CompanyStatus;
  sortBy: 'recent' | 'rating-high' | 'rating-low' | 'reviews';
}

// Search types
export interface SearchResult {
  companies: Company[];
  totalCount: number;
  hasMore: boolean;
}
