import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { MovieCard } from './MovieCard';
import type { Movie } from '@/types/movie.types';

interface MovieRowProps {
  movies: Movie[];
}

export function MovieRow({ movies }: MovieRowProps) {
  return (
    <div className="scrollbar-hide -mx-1 flex gap-4 overflow-x-auto px-1 pb-2">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} variant="row" />
      ))}
    </div>
  );
}

interface MovieSectionProps {
  title: string;
  movies: Movie[];
  viewAllHref?: string;
  layout?: 'row' | 'grid';
}

export function MovieSection({
  title,
  movies,
  viewAllHref,
  layout = 'row',
}: MovieSectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-text-primary">{title}</h2>
        {viewAllHref && (
          <Link
            to={viewAllHref}
            className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 transition-colors hover:text-primary-700"
          >
            View all
            <ChevronRight className="h-4 w-4" aria-hidden />
          </Link>
        )}
      </div>
      {layout === 'row' ? (
        <MovieRow movies={movies} />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  );
}
