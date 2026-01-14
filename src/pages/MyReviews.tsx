import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { FileText, PenLine, Trash2, Edit } from 'lucide-react';
import type { Review } from '@/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ReviewCardSkeleton } from '@/components/ui/Skeleton';
import { ReviewCard } from '@/components/reviews/ReviewCard';
import { useAuth } from '@/context/AuthContext';
import { useStore } from '@/store/useStore';
import { getUserReviews, deleteReview, getCompanyById } from '@/lib/firestore';

interface ReviewWithCompany extends Review {
  companyName?: string;
  companySlug?: string;
}

export function MyReviews() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { addToast, setLoginModalOpen } = useStore();
  const [reviews, setReviews] = useState<ReviewWithCompany[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      setLoginModalOpen(true);
      navigate('/');
    }
  }, [user, authLoading, setLoginModalOpen, navigate]);

  useEffect(() => {
    async function loadReviews() {
      if (!user) return;

      try {
        const userReviews = await getUserReviews(user.id);

        // Fetch company info for each review
        const reviewsWithCompanies = await Promise.all(
          userReviews.map(async (review) => {
            const company = await getCompanyById(review.companyId);
            return {
              ...review,
              companyName: company?.name,
              companySlug: company?.slug,
            };
          })
        );

        setReviews(reviewsWithCompanies);
      } catch (error) {
        console.error('Error loading reviews:', error);
        addToast('error', 'Erro ao carregar avaliações');
      } finally {
        setLoading(false);
      }
    }

    loadReviews();
  }, [user, addToast]);

  const handleDelete = async (reviewId: string) => {
    if (!user) return;

    const confirmed = window.confirm('Tem a certeza que deseja eliminar esta avaliação?');
    if (!confirmed) return;

    setDeletingId(reviewId);
    try {
      await deleteReview(reviewId, user.id);
      setReviews((prev) => prev.filter((r) => r.id !== reviewId));
      addToast('success', 'Avaliação eliminada');
    } catch (error) {
      console.error('Error deleting review:', error);
      addToast('error', 'Erro ao eliminar avaliação');
    } finally {
      setDeletingId(null);
    }
  };

  if (authLoading || (!user && loading)) {
    return (
      <div className="min-h-screen bg-cream-100 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-terracotta-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-100">
      {/* Header */}
      <div className="bg-cream-50 border-b border-sand-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-editorial bg-terracotta-100">
                <FileText className="w-6 h-6 text-terracotta-600" />
              </div>
              <div>
                <h1 className="font-display text-display-xs text-ink-900">
                  As Minhas Avaliações
                </h1>
                <p className="text-ink-500">
                  {reviews.length} {reviews.length === 1 ? 'avaliação publicada' : 'avaliações publicadas'}
                </p>
              </div>
            </div>

            <Link to="/avaliar">
              <Button leftIcon={<PenLine className="w-4 h-4" />}>
                Nova Avaliação
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <ReviewCardSkeleton key={i} />
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <Card className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-sand-100 flex items-center justify-center">
              <FileText className="w-8 h-8 text-sand-400" />
            </div>
            <h2 className="font-display text-xl font-semibold text-ink-800 mb-2">
              Ainda não publicou avaliações
            </h2>
            <p className="text-ink-500 max-w-md mx-auto mb-6">
              Partilhe a sua experiência com empresas de construção e ajude outros consumidores.
            </p>
            <Link to="/avaliar">
              <Button>Escrever Primeira Avaliação</Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-6">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className="relative">
                  <ReviewCard
                    review={review}
                    showCompanyLink
                    companyName={review.companyName}
                    companySlug={review.companySlug}
                  />

                  {/* Actions overlay */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="bg-cream-50/90 hover:bg-cream-50"
                      leftIcon={<Edit className="w-4 h-4" />}
                      onClick={() => navigate(`/avaliar?editar=${review.id}`)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="bg-cream-50/90 hover:bg-status-avoid/10 text-status-avoid"
                      leftIcon={<Trash2 className="w-4 h-4" />}
                      isLoading={deletingId === review.id}
                      onClick={() => handleDelete(review.id)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
