import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { clsx } from 'clsx';
import {
  MapPin,
  Calendar,
  PenLine,
  ChevronLeft,
  Share2,
  Flag,
} from 'lucide-react';
import type { Company } from '@/types';
import { Button } from '@/components/ui/Button';
import { Badge, StatusBadge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { StarRating } from '@/components/reviews/StarRating';
import { RatingBreakdown } from '@/components/reviews/RatingBreakdown';
import { ReviewList } from '@/components/reviews/ReviewList';
import { getCompanyBySlug } from '@/lib/firestore';
import { WORK_CATEGORIES } from '@/utils/constants';
import { formatRelativeTime } from '@/utils/calculations';
import { useAuth } from '@/context/AuthContext';
import { useStore } from '@/store/useStore';

export function CompanyPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { setLoginModalOpen, addToast } = useStore();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [showRadar, setShowRadar] = useState(false);

  useEffect(() => {
    async function loadCompany() {
      if (!slug) return;

      try {
        const data = await getCompanyBySlug(slug);
        setCompany(data);
      } catch (error) {
        console.error('Error loading company:', error);
      } finally {
        setLoading(false);
      }
    }

    loadCompany();
  }, [slug]);

  const handleWriteReview = () => {
    if (!user) {
      setLoginModalOpen(true);
      return;
    }
    navigate(`/avaliar?empresa=${slug}`);
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: company?.name,
          text: `Veja as avaliações de ${company?.name} no ConstrutorCheck`,
          url,
        });
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(url);
      addToast('success', 'Link copiado para a área de transferência');
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Skeleton width={100} height={20} className="mb-4" />
        <Skeleton width="60%" height={40} className="mb-4" />
        <Skeleton width="40%" height={20} className="mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Skeleton variant="rectangular" height={200} className="mb-6" />
            <Skeleton variant="rectangular" height={300} />
          </div>
          <div>
            <Skeleton variant="rectangular" height={400} />
          </div>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="font-display text-2xl font-semibold text-ink-800 mb-4">
          Empresa não encontrada
        </h1>
        <p className="text-ink-500 mb-8">
          A empresa que procura não existe ou foi removida.
        </p>
        <Link to="/empresas">
          <Button variant="secondary">Ver todas as empresas</Button>
        </Link>
      </div>
    );
  }

  const categoryLabels = company.categories
    .map((id) => WORK_CATEGORIES.find((c) => c.id === id)?.label)
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-cream-100">
      {/* Header */}
      <div className="bg-cream-50 border-b border-sand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <Link
            to="/empresas"
            className="inline-flex items-center gap-1 text-sm text-ink-500 hover:text-ink-700 mb-6"
          >
            <ChevronLeft className="w-4 h-4" />
            Voltar às empresas
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            {/* Company info */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-display text-display-sm lg:text-display-md text-ink-900"
                >
                  {company.name}
                </motion.h1>
                <StatusBadge status={company.status} />
              </div>

              <div className="flex flex-wrap items-center gap-4 text-ink-500 mb-4">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {company.location.city}, {company.location.district}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Última avaliação: {formatRelativeTime(company.updatedAt.toDate())}
                </span>
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {categoryLabels.map((label) => (
                  <Badge key={label} variant="default" size="md">
                    {label}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                leftIcon={<Share2 className="w-4 h-4" />}
              >
                Partilhar
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-ink-400 hover:text-status-avoid"
                leftIcon={<Flag className="w-4 h-4" />}
              >
                Reportar
              </Button>
              <Button
                onClick={handleWriteReview}
                leftIcon={<PenLine className="w-4 h-4" />}
              >
                Escrever Avaliação
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Rating Summary */}
            <Card>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-display text-xl font-semibold text-ink-900 mb-2">
                    Avaliação Geral
                  </h2>
                  <div className="flex items-center gap-3">
                    <span className="font-display text-4xl font-bold text-terracotta-600">
                      {company.avgRating.toFixed(1)}
                    </span>
                    <div>
                      <StarRating value={company.avgRating} readonly size="md" />
                      <p className="text-sm text-ink-500 mt-1">
                        Baseado em {company.reviewsCount} {company.reviewsCount === 1 ? 'avaliação' : 'avaliações'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Toggle view */}
                <div className="hidden md:flex border border-sand-200 rounded-editorial overflow-hidden">
                  <button
                    onClick={() => setShowRadar(false)}
                    className={clsx(
                      'px-4 py-2 text-sm font-medium transition-colors',
                      !showRadar ? 'bg-terracotta-100 text-terracotta-700' : 'text-ink-500 hover:bg-cream-100'
                    )}
                  >
                    Barras
                  </button>
                  <button
                    onClick={() => setShowRadar(true)}
                    className={clsx(
                      'px-4 py-2 text-sm font-medium transition-colors',
                      showRadar ? 'bg-terracotta-100 text-terracotta-700' : 'text-ink-500 hover:bg-cream-100'
                    )}
                  >
                    Radar
                  </button>
                </div>
              </div>

              <RatingBreakdown
                ratings={company.ratingsBreakdown}
                variant={showRadar ? 'radar' : 'bars'}
                size="md"
              />
            </Card>

            {/* Reviews */}
            <div>
              <h2 className="font-display text-xl font-semibold text-ink-900 mb-6">
                Avaliações ({company.reviewsCount})
              </h2>
              <ReviewList
                companyId={company.id}
                companyName={company.name}
                companySlug={company.slug}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick actions */}
            <Card>
              <h3 className="font-display font-semibold text-ink-900 mb-4">
                Teve experiência com esta empresa?
              </h3>
              <p className="text-sm text-ink-500 mb-4">
                A sua avaliação ajuda outros consumidores a tomar decisões informadas.
              </p>
              <Button
                onClick={handleWriteReview}
                className="w-full"
                leftIcon={<PenLine className="w-4 h-4" />}
              >
                Escrever Avaliação
              </Button>
            </Card>

            {/* Rating legend */}
            <Card>
              <h3 className="font-display font-semibold text-ink-900 mb-4">
                Sobre os Estados
              </h3>
              <div className="space-y-3">
                {[
                  { status: 'recomendado' as const, desc: 'Avaliação média ≥ 4.0' },
                  { status: 'neutro' as const, desc: 'Avaliação média entre 2.5 e 4.0' },
                  { status: 'com-problemas' as const, desc: 'Avaliação média entre 1.5 e 2.5' },
                  { status: 'evitar' as const, desc: 'Avaliação média < 1.5' },
                ].map((item) => (
                  <div key={item.status} className="flex items-start gap-3">
                    <StatusBadge status={item.status} size="sm" showIcon={false} />
                    <span className="text-sm text-ink-500">{item.desc}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
