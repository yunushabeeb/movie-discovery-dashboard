/** Home dashboard — composes two TMDB list endpoints into discovery sections. */
import { PageLoader } from '@/components/ui/PageLoader';
import { ErrorState } from '@/components/ui/ErrorState';
import { EmptyState } from '@/components/ui/EmptyState';
import { MovieSection } from '@/components/movies/MovieSection';
import { useMovieList } from '@/hooks/useMovies';

export function HomePage() {
  const nowPlaying = useMovieList('now_playing');
  const popular = useMovieList('popular');

  const isLoading = nowPlaying.isLoading || popular.isLoading;
  const isError = nowPlaying.isError || popular.isError;
  const error = nowPlaying.error ?? popular.error;

  if (isLoading) {
    return <PageLoader label="Loading movies..." />;
  }

  if (isError) {
    return (
      <ErrorState
        message={error?.message}
        onRetry={() => {
          void nowPlaying.refetch();
          void popular.refetch();
        }}
      />
    );
  }

  const nowPlayingMovies = nowPlaying.data?.results ?? [];
  const popularMovies = popular.data?.results ?? [];

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary">
          Discover Movies
        </h1>
        <p className="text-text-secondary">
          Find and explore your next favorite movie.
        </p>
      </header>

      {nowPlayingMovies.length > 0 ? (
        <MovieSection
          title="Now Playing"
          movies={nowPlayingMovies}
          viewAllHref="/upcoming"
          layout="row"
        />
      ) : (
        <EmptyState title="No movies currently playing" />
      )}

      {popularMovies.length > 0 ? (
        <MovieSection
          title="Popular Movies"
          movies={popularMovies.slice(0, 10)}
          viewAllHref="/popular"
          layout="grid"
        />
      ) : (
        <EmptyState title="No popular movies available" />
      )}
    </div>
  );
}
