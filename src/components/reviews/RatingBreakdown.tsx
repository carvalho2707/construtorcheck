import { useMemo } from 'react';
import { motion } from 'motion/react';
import { clsx } from 'clsx';
import type { RatingsBreakdown } from '@/types';
import { RATING_CATEGORIES } from '@/utils/constants';

interface RatingBreakdownProps {
  ratings: RatingsBreakdown;
  variant?: 'bars' | 'radar';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export function RatingBreakdown({
  ratings,
  variant = 'bars',
  size = 'md',
  animated = true,
}: RatingBreakdownProps) {
  if (variant === 'radar') {
    return <RadarChart ratings={ratings} size={size} animated={animated} />;
  }

  return <BarChart ratings={ratings} size={size} animated={animated} />;
}

interface BarChartProps {
  ratings: RatingsBreakdown;
  size: 'sm' | 'md' | 'lg';
  animated: boolean;
}

function BarChart({ ratings, size, animated }: BarChartProps) {
  const barHeights = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-2.5',
  };

  return (
    <div className="space-y-3">
      {RATING_CATEGORIES.map((category, index) => {
        const value = ratings[category.id as keyof RatingsBreakdown];
        const percentage = (value / 5) * 100;

        return (
          <div key={category.id} className="flex items-center gap-3">
            <span className={clsx(
              'text-ink-600 font-medium',
              size === 'sm' ? 'text-xs w-20' : 'text-sm w-28',
              'truncate'
            )}>
              {size === 'sm' ? category.shortLabel : category.label}
            </span>

            <div className={clsx(
              'flex-1 bg-sand-200 rounded-full overflow-hidden',
              barHeights[size]
            )}>
              <motion.div
                initial={animated ? { width: 0 } : undefined}
                animate={{ width: `${percentage}%` }}
                transition={{
                  duration: 0.6,
                  delay: animated ? index * 0.1 : 0,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className={clsx(
                  'h-full rounded-full',
                  value >= 4 && 'bg-status-recommended',
                  value >= 2.5 && value < 4 && 'bg-terracotta-400',
                  value < 2.5 && 'bg-status-problems'
                )}
              />
            </div>

            <span className={clsx(
              'font-semibold text-ink-700 tabular-nums',
              size === 'sm' ? 'text-xs w-6' : 'text-sm w-8'
            )}>
              {value.toFixed(1)}
            </span>
          </div>
        );
      })}
    </div>
  );
}

interface RadarChartProps {
  ratings: RatingsBreakdown;
  size: 'sm' | 'md' | 'lg';
  animated: boolean;
}

function RadarChart({ ratings, size, animated }: RadarChartProps) {
  const dimensions = {
    sm: 180,
    md: 240,
    lg: 320,
  };

  const dimension = dimensions[size];
  const center = dimension / 2;
  const maxRadius = (dimension / 2) - 30;

  const categories = RATING_CATEGORIES;
  const angleStep = (2 * Math.PI) / categories.length;

  // Calculate points for the polygon
  const points = useMemo(() => {
    return categories.map((category, i) => {
      const value = ratings[category.id as keyof RatingsBreakdown];
      const angle = i * angleStep - Math.PI / 2; // Start from top
      const radius = (value / 5) * maxRadius;
      return {
        x: center + radius * Math.cos(angle),
        y: center + radius * Math.sin(angle),
        label: category.shortLabel,
        value,
        labelX: center + (maxRadius + 20) * Math.cos(angle),
        labelY: center + (maxRadius + 20) * Math.sin(angle),
      };
    });
  }, [ratings, categories, angleStep, center, maxRadius]);

  const polygonPoints = points.map(p => `${p.x},${p.y}`).join(' ');

  // Grid lines
  const gridLevels = [1, 2, 3, 4, 5];

  return (
    <div className="flex justify-center">
      <svg
        width={dimension}
        height={dimension}
        viewBox={`0 0 ${dimension} ${dimension}`}
        className="overflow-visible"
      >
        {/* Background grid */}
        {gridLevels.map((level) => {
          const radius = (level / 5) * maxRadius;
          const gridPoints = categories.map((_, i) => {
            const angle = i * angleStep - Math.PI / 2;
            return `${center + radius * Math.cos(angle)},${center + radius * Math.sin(angle)}`;
          }).join(' ');

          return (
            <polygon
              key={level}
              points={gridPoints}
              fill="none"
              stroke={level === 5 ? '#D6D3D1' : '#E7E5E4'}
              strokeWidth={level === 5 ? 1.5 : 1}
              strokeDasharray={level === 5 ? 'none' : '4 4'}
            />
          );
        })}

        {/* Axis lines */}
        {categories.map((_, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const endX = center + maxRadius * Math.cos(angle);
          const endY = center + maxRadius * Math.sin(angle);

          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={endX}
              y2={endY}
              stroke="#E7E5E4"
              strokeWidth={1}
            />
          );
        })}

        {/* Data polygon */}
        <motion.polygon
          points={polygonPoints}
          initial={animated ? { opacity: 0, scale: 0.5 } : undefined}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          fill="rgba(196, 93, 58, 0.2)"
          stroke="#C45D3A"
          strokeWidth={2}
          style={{ transformOrigin: `${center}px ${center}px` }}
        />

        {/* Data points */}
        {points.map((point, i) => (
          <motion.circle
            key={i}
            cx={point.x}
            cy={point.y}
            r={4}
            fill="#C45D3A"
            stroke="#FAF7F2"
            strokeWidth={2}
            initial={animated ? { opacity: 0, scale: 0 } : undefined}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: animated ? 0.5 + i * 0.05 : 0 }}
          />
        ))}

        {/* Labels */}
        {points.map((point, i) => {
          const isTop = i === 0;
          const isBottom = i === 3;
          const isLeft = i === 4 || i === 5;

          return (
            <text
              key={i}
              x={point.labelX}
              y={point.labelY}
              textAnchor={isLeft ? 'end' : i === 1 || i === 2 ? 'start' : 'middle'}
              dominantBaseline={isTop ? 'auto' : isBottom ? 'hanging' : 'middle'}
              className="fill-ink-600 text-xs font-medium"
              style={{ fontSize: size === 'sm' ? '10px' : '12px' }}
            >
              {point.label}
            </text>
          );
        })}

        {/* Center score */}
        <text
          x={center}
          y={center - 8}
          textAnchor="middle"
          className="fill-terracotta-600 font-display font-bold"
          style={{ fontSize: size === 'sm' ? '20px' : '28px' }}
        >
          {(Object.values(ratings).reduce((a, b) => a + b, 0) / 6).toFixed(1)}
        </text>
        <text
          x={center}
          y={center + 12}
          textAnchor="middle"
          className="fill-ink-400 text-xs"
        >
          média
        </text>
      </svg>
    </div>
  );
}
