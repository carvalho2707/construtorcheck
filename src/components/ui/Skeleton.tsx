import { clsx } from 'clsx';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export function Skeleton({
  className,
  variant = 'text',
  width,
  height,
}: SkeletonProps) {
  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return (
    <div
      className={clsx(
        'animate-pulse bg-gradient-to-r from-sand-200 via-sand-100 to-sand-200',
        'bg-[length:200%_100%]',
        variant === 'text' && 'h-4 rounded',
        variant === 'circular' && 'rounded-full',
        variant === 'rectangular' && 'rounded-editorial',
        className
      )}
      style={style}
    />
  );
}

export function CompanyCardSkeleton() {
  return (
    <div className="bg-cream-50 border border-sand-200 rounded-editorial p-6 shadow-card">
      <div className="flex items-start gap-4">
        <Skeleton variant="rectangular" width={64} height={64} className="rounded-editorial" />
        <div className="flex-1">
          <Skeleton width="70%" height={24} className="mb-2" />
          <Skeleton width="50%" height={16} className="mb-3" />
          <div className="flex gap-2">
            <Skeleton width={60} height={24} className="rounded-full" />
            <Skeleton width={80} height={24} className="rounded-full" />
          </div>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-sand-200">
        <div className="flex justify-between items-center">
          <Skeleton width={100} height={20} />
          <Skeleton width={80} height={28} className="rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function ReviewCardSkeleton() {
  return (
    <div className="bg-cream-50 border border-sand-200 rounded-editorial p-6 shadow-card">
      <div className="flex items-start gap-4 mb-4">
        <Skeleton variant="circular" width={48} height={48} />
        <div className="flex-1">
          <Skeleton width="40%" height={20} className="mb-2" />
          <Skeleton width="30%" height={16} />
        </div>
        <Skeleton width={100} height={24} className="rounded-full" />
      </div>
      <Skeleton width="60%" height={24} className="mb-3" />
      <Skeleton width="100%" height={16} className="mb-2" />
      <Skeleton width="100%" height={16} className="mb-2" />
      <Skeleton width="80%" height={16} className="mb-4" />
      <div className="flex gap-4">
        <Skeleton width={80} height={32} className="rounded-editorial" />
        <Skeleton width={80} height={32} className="rounded-editorial" />
      </div>
    </div>
  );
}
