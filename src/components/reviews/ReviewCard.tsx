import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { clsx } from 'clsx';
import {
  ThumbsUp,
  Flag,
  ChevronDown,
  ChevronUp,
  Calendar,
  MessageCircle,
  User,
} from 'lucide-react';
import type { Review } from '@/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { StarRating } from './StarRating';
import { RatingBreakdown } from './RatingBreakdown';
import { formatRelativeTime, truncateText } from '@/utils/calculations';
import { WORK_CATEGORIES, RECOMMENDATION_OPTIONS } from '@/utils/constants';
import { useAuth } from '@/context/AuthContext';
import { voteOnReview, getUserVote } from '@/lib/firestore';
import { useStore } from '@/store/useStore';
import { useEffect } from 'react';

interface ReviewCardProps {
  review: Review;
  showCompanyLink?: boolean;
  companyName?: string;
  companySlug?: string;
}

export function ReviewCard({
  review,
  showCompanyLink = false,
  companyName,
  companySlug,
}: ReviewCardProps) {
  const { user } = useAuth();
  const { addToast, setLoginModalOpen, updateReview } = useStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showRatings, setShowRatings] = useState(false);
  const [userVote, setUserVote] = useState<boolean | null>(null);
  const [isVoting, setIsVoting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const contentIsLong = review.content.length > 300;
  const displayContent = isExpanded ? review.content : truncateText(review.content, 300);

  const recommendation = RECOMMENDATION_OPTIONS.find(
    (opt) => opt.value === review.wouldRecommend
  );

  const workTypeLabels = review.workType
    .map((id) => WORK_CATEGORIES.find((c) => c.id === id)?.label)
    .filter(Boolean);

  // Fetch user's vote
  useEffect(() => {
    if (user) {
      getUserVote(review.id, user.id).then(setUserVote);
    }
  }, [review.id, user]);

  const handleVote = async (helpful: boolean) => {
    if (!user) {
      setLoginModalOpen(true);
      return;
    }

    setIsVoting(true);
    try {
      await voteOnReview(review.id, user.id, helpful);

      // Update local state
      if (userVote === helpful) {
        // Removing vote
        setUserVote(null);
        if (helpful) {
          updateReview(review.id, { helpfulVotes: review.helpfulVotes - 1 });
        }
      } else {
        // Adding or changing vote
        const delta = helpful
          ? userVote === false ? 1 : 1
          : userVote === true ? -1 : 0;
        setUserVote(helpful);
        updateReview(review.id, { helpfulVotes: review.helpfulVotes + delta });
      }
    } catch {
      addToast('error', 'Erro ao votar');
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <Card className="overflow-hidden" padding="none">
      {/* Header */}
      <div className="p-4 sm:p-6 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Avatar */}
            <div className={clsx(
              'w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0',
              'bg-terracotta-100 text-terracotta-600'
            )}>
              {review.isAnonymous ? (
                <User className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <span className="font-display font-semibold text-base sm:text-lg">
                  {review.userName.charAt(0).toUpperCase()}
                </span>
              )}
            </div>

            {/* User info & meta */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-ink-800 text-sm sm:text-base">
                  {review.isAnonymous ? 'Anónimo' : review.userName}
                </span>
                {recommendation && (
                  <Badge
                    variant={
                      review.wouldRecommend === 'yes' ? 'success' :
                      review.wouldRecommend === 'no' ? 'danger' : 'warning'
                    }
                    size="sm"
                  >
                    {recommendation.icon} {recommendation.label}
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-2 sm:gap-3 mt-1 text-xs sm:text-sm text-ink-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  {formatRelativeTime(review.createdAt.toDate())}
                </span>
                {showCompanyLink && companyName && companySlug && (
                  <Link
                    to={`/empresa/${companySlug}`}
                    className="hover:text-terracotta-600 transition-colors truncate"
                  >
                    sobre {companyName}
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Overall rating */}
          <div className="ml-13 sm:ml-0 sm:text-right">
            <StarRating value={review.overallRating} readonly size="sm" showValue />
          </div>
        </div>

        {/* Work types */}
        {workTypeLabels.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {workTypeLabels.map((label) => (
              <Badge key={label} variant="default" size="sm">
                {label}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Title & Content */}
      <div className="px-4 sm:px-6 pb-4">
        <h3 className="font-display text-base sm:text-lg font-semibold text-ink-900 mb-2">
          {review.title}
        </h3>

        <p className="text-ink-600 leading-relaxed whitespace-pre-wrap">
          {displayContent}
        </p>

        {contentIsLong && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 text-sm font-medium text-terracotta-600 hover:text-terracotta-700 flex items-center gap-1"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4" />
                Ler menos
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                Ler mais
              </>
            )}
          </button>
        )}

        {/* Rating breakdown toggle */}
        <button
          onClick={() => setShowRatings(!showRatings)}
          className="mt-3 text-sm text-ink-500 hover:text-ink-700 flex items-center gap-1 transition-colors"
        >
          {showRatings ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Ocultar avaliações detalhadas
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Ver avaliações detalhadas
            </>
          )}
        </button>

        {/* Rating breakdown */}
        <motion.div
          initial={false}
          animate={{ height: showRatings ? 'auto' : 0, opacity: showRatings ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <div className="mt-4 p-4 bg-cream-100 rounded-editorial">
            <RatingBreakdown ratings={review.ratings} variant="bars" size="sm" animated={false} />
          </div>
        </motion.div>
      </div>

      {/* Photos */}
      {review.photos.length > 0 && (
        <div className="px-4 sm:px-6 pb-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
            {review.photos.map((photo, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(photo)}
                className="flex-shrink-0 w-20 h-20 rounded-editorial overflow-hidden border border-sand-200 hover:border-terracotta-400 transition-colors"
              >
                <img
                  src={photo}
                  alt={`Foto ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Company Response */}
      {review.companyResponse && (
        <div className="mx-4 sm:mx-6 mb-4 p-3 sm:p-4 bg-olive-50 border-l-4 border-olive-400 rounded-r-editorial">
          <div className="flex items-center gap-2 mb-2">
            <MessageCircle className="w-4 h-4 text-olive-600" />
            <span className="font-semibold text-sm text-olive-700">Resposta da Empresa</span>
            <span className="text-xs text-olive-500">
              {formatRelativeTime(review.companyResponse.respondedAt.toDate())}
            </span>
          </div>
          <p className="text-sm text-olive-800">{review.companyResponse.content}</p>
        </div>
      )}

      {/* Footer */}
      <div className="px-4 sm:px-6 py-3 sm:py-4 bg-cream-100/50 border-t border-sand-100 flex items-center justify-between gap-2">
        <Button
          variant={userVote === true ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => handleVote(true)}
          disabled={isVoting}
          leftIcon={<ThumbsUp className="w-4 h-4" />}
        >
          <span className="hidden xs:inline">Útil</span> ({review.helpfulVotes})
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="text-ink-400 hover:text-status-avoid"
          leftIcon={<Flag className="w-4 h-4" />}
        >
          <span className="hidden xs:inline">Reportar</span>
        </Button>
      </div>

      {/* Image lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-ink-900/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            src={selectedImage}
            alt="Foto ampliada"
            className="max-w-full max-h-full object-contain rounded-editorial"
          />
          <button
            className="absolute top-4 right-4 p-2 text-cream-50 hover:text-white"
            onClick={() => setSelectedImage(null)}
          >
            <span className="sr-only">Fechar</span>
            ✕
          </button>
        </div>
      )}
    </Card>
  );
}
