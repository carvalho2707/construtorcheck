import { clsx } from 'clsx';
import type { CompanyStatus } from '@/types';
import { STATUS_CONFIG } from '@/utils/constants';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-sand-200 text-ink-600 border-sand-300',
  success: 'bg-status-recommended/10 text-status-recommended border-status-recommended/20',
  warning: 'bg-status-problems/10 text-status-problems border-status-problems/20',
  danger: 'bg-status-avoid/10 text-status-avoid border-status-avoid/20',
  info: 'bg-olive-100 text-olive-700 border-olive-200',
};

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
};

export function Badge({ children, variant = 'default', size = 'sm', className }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center font-medium rounded-full border',
        variantStyles[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}

interface StatusBadgeProps {
  status: CompanyStatus;
  size?: 'sm' | 'md';
  showIcon?: boolean;
  className?: string;
}

export function StatusBadge({ status, size = 'md', showIcon = true, className }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];

  const getIcon = () => {
    switch (status) {
      case 'recomendado':
        return (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'neutro':
        return (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" d="M5 12h14" />
          </svg>
        );
      case 'com-problemas':
        return (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'evitar':
        return (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
    }
  };

  const statusStyles: Record<CompanyStatus, string> = {
    'recomendado': 'bg-status-recommended/10 text-status-recommended border-status-recommended/30',
    'neutro': 'bg-status-neutral/10 text-status-neutral border-status-neutral/30',
    'com-problemas': 'bg-status-problems/10 text-status-problems border-status-problems/30',
    'evitar': 'bg-status-avoid/10 text-status-avoid border-status-avoid/30',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 font-semibold rounded-full border',
        statusStyles[status],
        size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm',
        className
      )}
      title={config.description}
    >
      {showIcon && getIcon()}
      {config.label}
    </span>
  );
}
