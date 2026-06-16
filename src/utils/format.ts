import { POSTER_SIZES, TMDB_IMAGE_BASE } from './constants';

export function getPosterUrl(
  path: string | null,
  size: keyof typeof POSTER_SIZES = 'medium',
): string | null {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE}/${POSTER_SIZES[size]}${path}`;
}

export function formatYear(releaseDate: string): string {
  if (!releaseDate) return 'N/A';
  return releaseDate.slice(0, 4);
}

export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

export function formatRuntime(minutes: number | null): string {
  if (!minutes) return 'N/A';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}m`;
  return `${hours}h ${mins}m`;
}

export function formatCurrency(amount: number): string {
  if (!amount) return 'N/A';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: string): string {
  if (!date) return 'N/A';
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

export function formatVoteCount(count: number): string {
  return new Intl.NumberFormat('en-US').format(count);
}

export function getDirector(crew: { name: string; job: string }[]): string {
  return crew.find((member) => member.job === 'Director')?.name ?? 'N/A';
}

export function getTopCast(
  cast: { name: string }[],
  limit = 5,
): string {
  if (!cast.length) return 'N/A';
  return cast
    .slice(0, limit)
    .map((member) => member.name)
    .join(', ');
}

export function pluralize(count: number, singular: string, plural?: string): string {
  const word = count === 1 ? singular : (plural ?? `${singular}s`);
  return `${count} ${word}`;
}
