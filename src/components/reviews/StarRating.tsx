import { useState } from 'react';
import { clsx } from 'clsx';
import { motion } from 'motion/react';

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  label?: string;
}

const sizes = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

export function StarRating({
  value,
  onChange,
  readonly = false,
  size = 'md',
  showValue = false,
  label,
}: StarRatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const displayValue = hoverValue ?? value;

  const handleClick = (rating: number) => {
    if (!readonly && onChange) {
      onChange(rating);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <span className="text-sm font-medium text-ink-600">{label}</span>
      )}
      <div className="flex items-center gap-1">
        <div
          className={clsx(
            'flex items-center gap-0.5',
            !readonly && 'cursor-pointer'
          )}
          onMouseLeave={() => setHoverValue(null)}
        >
          {[1, 2, 3, 4, 5].map((rating) => {
            const isFilled = rating <= displayValue;
            const isHalf = rating - 0.5 === displayValue;

            return (
              <motion.button
                key={rating}
                type="button"
                disabled={readonly}
                onClick={() => handleClick(rating)}
                onMouseEnter={() => !readonly && setHoverValue(rating)}
                whileHover={!readonly ? { scale: 1.15 } : undefined}
                whileTap={!readonly ? { scale: 0.95 } : undefined}
                className={clsx(
                  sizes[size],
                  'transition-colors duration-150',
                  'focus:outline-none focus:ring-2 focus:ring-terracotta-400 focus:ring-offset-1 rounded-sm',
                  readonly && 'pointer-events-none'
                )}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill={isFilled ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className={clsx(
                    isFilled ? 'text-terracotta-500' : 'text-sand-300',
                    !readonly && hoverValue && rating <= hoverValue && 'text-terracotta-400'
                  )}
                >
                  {isHalf ? (
                    <>
                      <defs>
                        <linearGradient id={`half-${rating}`}>
                          <stop offset="50%" stopColor="currentColor" />
                          <stop offset="50%" stopColor="transparent" />
                        </linearGradient>
                      </defs>
                      <path
                        fill={`url(#half-${rating})`}
                        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                      />
                    </>
                  ) : (
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  )}
                </svg>
              </motion.button>
            );
          })}
        </div>

        {showValue && (
          <span className={clsx(
            'font-semibold text-ink-700 ml-2',
            size === 'sm' && 'text-sm',
            size === 'md' && 'text-base',
            size === 'lg' && 'text-lg'
          )}>
            {value.toFixed(1)}
          </span>
        )}
      </div>
    </div>
  );
}

interface StarRatingInputProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
  error?: string;
}

export function StarRatingInput({ value, onChange, label, error }: StarRatingInputProps) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-sand-100 last:border-0">
      <span className="text-sm font-medium text-ink-700">{label}</span>
      <div className="flex flex-col items-end">
        <StarRating value={value} onChange={onChange} size="md" />
        {error && <span className="text-xs text-status-avoid mt-1">{error}</span>}
      </div>
    </div>
  );
}
