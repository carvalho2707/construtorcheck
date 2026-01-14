import type { RatingsBreakdown, CompanyStatus } from '@/types';

export function calculateOverallRating(ratings: RatingsBreakdown): number {
  const values = Object.values(ratings);
  const sum = values.reduce((acc, val) => acc + val, 0);
  return Number((sum / values.length).toFixed(2));
}

export function calculateCompanyStatus(avgRating: number): CompanyStatus {
  if (avgRating >= 4.0) return 'recomendado';
  if (avgRating >= 2.5) return 'neutro';
  if (avgRating >= 1.5) return 'com-problemas';
  return 'evitar';
}

export function calculateUpdatedRatings(
  currentBreakdown: RatingsBreakdown,
  currentCount: number,
  newRatings: RatingsBreakdown
): RatingsBreakdown {
  const keys = Object.keys(currentBreakdown) as (keyof RatingsBreakdown)[];
  const updated: Partial<RatingsBreakdown> = {};

  for (const key of keys) {
    const currentTotal = currentBreakdown[key] * currentCount;
    const newTotal = currentTotal + newRatings[key];
    updated[key] = Number((newTotal / (currentCount + 1)).toFixed(2));
  }

  return updated as RatingsBreakdown;
}

export function calculateUpdatedAverage(
  currentAvg: number,
  currentCount: number,
  newRating: number
): number {
  const currentTotal = currentAvg * currentCount;
  const newTotal = currentTotal + newRating;
  return Number((newTotal / (currentCount + 1)).toFixed(2));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours === 0) {
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      if (diffMinutes < 5) return 'Agora mesmo';
      return `Há ${diffMinutes} minutos`;
    }
    return `Há ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
  }

  if (diffDays === 1) return 'Ontem';
  if (diffDays < 7) return `Há ${diffDays} dias`;
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `Há ${weeks} semana${weeks > 1 ? 's' : ''}`;
  }
  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `Há ${months} ${months === 1 ? 'mês' : 'meses'}`;
  }

  const years = Math.floor(diffDays / 365);
  return `Há ${years} ano${years > 1 ? 's' : ''}`;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}
