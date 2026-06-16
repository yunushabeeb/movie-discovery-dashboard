import { Link } from 'react-router-dom';
import { PosterImage } from '@/components/ui/PosterImage';
import { RatingBadge } from '@/components/ui/RatingBadge';
import type { Movie } from '@/types/movie.types';
import { formatYear } from '@/utils/format';

interface MovieCardProps {
  movie: Movie;
  variant?: 'grid' | 'row';
}

export function MovieCard({ movie, variant = 'grid' }: MovieCardProps) {
  const isRow = variant === 'row';

  return (
    <Link
      to={`/movie/${movie.id}`}
      className={`group block transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
        isRow ? 'w-40 shrink-0 sm:w-44' : ''
      }`}
    >
      <article className="space-y-2.5">
        <div
          className={`relative overflow-hidden rounded-xl bg-slate-200 shadow-sm transition-shadow duration-200 group-hover:shadow-md ${
            isRow ? 'aspect-[2/3]' : 'aspect-[2/3] w-full'
          }`}
        >
          <PosterImage
            path={movie.poster_path}
            alt={`${movie.title} poster`}
            size={isRow ? 'medium' : 'medium'}
            className="h-full w-full transition-transform duration-200 group-hover:scale-105"
          />
          <RatingBadge
            rating={movie.vote_average}
            className="absolute right-2 top-2"
          />
        </div>
        <div className="space-y-0.5">
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-text-primary group-hover:text-primary-600">
            {movie.title}
          </h3>
          <p className="text-xs text-text-secondary">
            {formatYear(movie.release_date)}
          </p>
        </div>
      </article>
    </Link>
  );
}
