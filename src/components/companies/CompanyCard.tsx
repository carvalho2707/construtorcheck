import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { clsx } from 'clsx';
import { MapPin, MessageSquare } from 'lucide-react';
import type { Company } from '@/types';
import { Card } from '@/components/ui/Card';
import { Badge, StatusBadge } from '@/components/ui/Badge';
import { StarRating } from '@/components/reviews/StarRating';
import { WORK_CATEGORIES } from '@/utils/constants';

interface CompanyCardProps {
  company: Company;
  index?: number;
}

export function CompanyCard({ company, index = 0 }: CompanyCardProps) {
  const categoryLabels = company.categories
    .slice(0, 3)
    .map((id) => WORK_CATEGORIES.find((c) => c.id === id)?.label)
    .filter(Boolean);

  const hasMoreCategories = company.categories.length > 3;

  // Generate a consistent color based on company name
  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-terracotta-100 text-terracotta-700',
      'bg-olive-100 text-olive-700',
      'bg-sand-200 text-sand-700',
      'bg-status-recommended/20 text-status-recommended',
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link to={`/empresa/${company.slug}`}>
        <Card hover className="group">
          <div className="flex items-start gap-4">
            {/* Company Avatar */}
            <div className={clsx(
              'w-16 h-16 rounded-editorial flex items-center justify-center flex-shrink-0',
              'font-display font-bold text-2xl',
              'transition-transform duration-300 group-hover:scale-105',
              getAvatarColor(company.name)
            )}>
              {company.name.charAt(0).toUpperCase()}
            </div>

            {/* Company Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-display text-lg font-semibold text-ink-900 group-hover:text-terracotta-600 transition-colors truncate">
                {company.name}
              </h3>

              <div className="flex items-center gap-1 text-sm text-ink-400 mt-0.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>{company.location.city}, {company.location.district}</span>
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {categoryLabels.map((label) => (
                  <Badge key={label} variant="default" size="sm">
                    {label}
                  </Badge>
                ))}
                {hasMoreCategories && (
                  <Badge variant="default" size="sm">
                    +{company.categories.length - 3}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Footer with rating */}
          <div className="mt-4 pt-4 border-t border-sand-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3 sm:gap-4">
              <StarRating value={company.avgRating} readonly size="sm" showValue />
              <span className="flex items-center gap-1 text-xs sm:text-sm text-ink-400">
                <MessageSquare className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                {company.reviewsCount} {company.reviewsCount === 1 ? 'avaliação' : 'avaliações'}
              </span>
            </div>

            <StatusBadge status={company.status} size="sm" />
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
