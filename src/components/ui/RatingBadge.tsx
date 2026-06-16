import { Star } from 'lucide-react';
import { formatRating } from '@/utils/format';

interface RatingBadgeProps {
  rating: number;
  className?: string;
}

export function RatingBadge({ rating, className = '' }: RatingBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md bg-black/70 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm ${className}`}
    >
      <Star className="h-3 w-3 fill-amber-400 text-amber-400" aria-hidden />
      {formatRating(rating)}
    </span>
  );
}
