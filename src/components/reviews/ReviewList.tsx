import { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';
import type { Review } from '@/types';
import { ReviewCard } from './ReviewCard';
import { ReviewCardSkeleton } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';
import { getReviewsForCompany } from '@/lib/firestore';
import { useStore } from '@/store/useStore';
import { DocumentSnapshot } from 'firebase/firestore';

interface ReviewListProps {
  companyId: string;
  companyName?: string;
  companySlug?: string;
}

export function ReviewList({ companyId, companyName, companySlug }: ReviewListProps) {
  const { reviews, setReviews, addReviews, isLoadingReviews, setIsLoadingReviews } = useStore();
  const [lastDoc, setLastDoc] = useState<DocumentSnapshot | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  const loadReviews = useCallback(async (isLoadMore = false) => {
    setIsLoadingReviews(true);

    try {
      const result = await getReviewsForCompany(
        companyId,
        10,
        isLoadMore ? lastDoc ?? undefined : undefined
      );

      if (isLoadMore) {
        addReviews(result.reviews);
      } else {
        setReviews(result.reviews);
      }

      setLastDoc(result.lastDoc);
      setHasMore(result.hasMore);
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setIsLoadingReviews(false);
      setInitialLoad(false);
    }
  }, [companyId, lastDoc, setReviews, addReviews, setIsLoadingReviews]);

  useEffect(() => {
    loadReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyId]);

  if (initialLoad && isLoadingReviews) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <ReviewCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-12 bg-cream-50 rounded-editorial border border-sand-200">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-sand-100 flex items-center justify-center">
          <svg className="w-8 h-8 text-sand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <h3 className="font-display text-lg font-semibold text-ink-800 mb-2">
          Ainda não há avaliações
        </h3>
        <p className="text-ink-500 max-w-sm mx-auto">
          Seja o primeiro a partilhar a sua experiência com esta empresa.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review: Review, index: number) => (
        <motion.div
          key={review.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <ReviewCard
            review={review}
            companyName={companyName}
            companySlug={companySlug}
          />
        </motion.div>
      ))}

      {hasMore && (
        <div className="flex justify-center pt-4">
          <Button
            variant="secondary"
            onClick={() => loadReviews(true)}
            disabled={isLoadingReviews}
            leftIcon={isLoadingReviews ? <Loader2 className="w-4 h-4 animate-spin" /> : undefined}
          >
            {isLoadingReviews ? 'A carregar...' : 'Ver mais avaliações'}
          </Button>
        </div>
      )}
    </div>
  );
}
