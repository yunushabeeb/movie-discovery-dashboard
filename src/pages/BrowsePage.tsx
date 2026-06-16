/** Reusable browse view for popular, top-rated, and upcoming routes. */
import { PageLoader } from '@/components/ui/PageLoader';
import { ErrorState } from '@/components/ui/ErrorState';
import { EmptyState } from '@/components/ui/EmptyState';
import { MovieGrid } from '@/components/movies/MovieGrid';
import { useMovieList } from '@/hooks/useMovies';
import type { MovieListType } from '@/types/movie.types';
import { MOVIE_LIST_LABELS } from '@/utils/constants';

interface BrowsePageProps {
  listType: MovieListType;
  description: string;
}

export function BrowsePage({ listType, description }: BrowsePageProps) {
  const { data, isLoading, isError, error, refetch } = useMovieList(listType);
  const title = MOVIE_LIST_LABELS[listType];

  if (isLoading) {
    return <PageLoader label={`Loading ${title.toLowerCase()}...`} />;
  }

  if (isError) {
    return (
      <ErrorState message={error?.message} onRetry={() => void refetch()} />
    );
  }

  const movies = data?.results ?? [];

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary">
          {title}
        </h1>
        <p className="text-text-secondary">{description}</p>
      </header>

      {movies.length > 0 ? (
        <MovieGrid movies={movies} />
      ) : (
        <EmptyState title={`No ${title.toLowerCase()} found`} />
      )}
    </div>
  );
}
