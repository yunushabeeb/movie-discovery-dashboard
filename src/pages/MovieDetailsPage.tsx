import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Heart, Star } from 'lucide-react';
import { Spinner } from '@/components/ui/Spinner';
import { ErrorState } from '@/components/ui/ErrorState';
import { PosterImage } from '@/components/ui/PosterImage';
import { Button } from '@/components/ui/Button';
import { MovieSection } from '@/components/movies/MovieSection';
import {
  useMovieCredits,
  useMovieDetails,
  useSimilarMovies,
} from '@/hooks/useMovies';
import { useFavorites } from '@/hooks/useFavorites';
import {
  formatCurrency,
  formatDate,
  formatRating,
  formatRuntime,
  formatVoteCount,
  formatYear,
  getDirector,
  getTopCast,
} from '@/utils/format';

export function MovieDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const movieId = Number(id);

  const detailsQuery = useMovieDetails(movieId);
  const creditsQuery = useMovieCredits(movieId);
  const similarQuery = useSimilarMovies(movieId);
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!Number.isFinite(movieId) || movieId <= 0) {
    return (
      <ErrorState
        title="Invalid movie"
        message="The movie ID in the URL is not valid."
      />
    );
  }

  if (detailsQuery.isLoading) {
    return <Spinner className="py-24" label="Loading movie details..." />;
  }

  if (detailsQuery.isError || !detailsQuery.data) {
    return (
      <ErrorState
        message={detailsQuery.error?.message}
        onRetry={() => void detailsQuery.refetch()}
      />
    );
  }

  const movie = detailsQuery.data;
  const credits = creditsQuery.data;
  const similarMovies = similarQuery.data?.results ?? [];
  const favorite = isFavorite(movie.id);

  const metadata = [
    { label: 'Release Date', value: formatDate(movie.release_date) },
    { label: 'Director', value: credits ? getDirector(credits.crew) : 'N/A' },
    {
      label: 'Cast',
      value: credits ? getTopCast(credits.cast) : 'N/A',
    },
    {
      label: 'Language',
      value:
        movie.spoken_languages?.[0]?.english_name ??
        movie.original_language.toUpperCase(),
    },
    { label: 'Budget', value: formatCurrency(movie.budget) },
    { label: 'Revenue', value: formatCurrency(movie.revenue) },
  ];

  return (
    <div className="space-y-10">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Back
      </button>

      <section className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <PosterImage
          path={movie.poster_path}
          alt={`${movie.title} poster`}
          size="large"
          className="mx-auto w-full max-w-[280px] rounded-2xl shadow-lg lg:mx-0"
        />

        <div className="space-y-6">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              {movie.title}
            </h1>
            <p className="text-sm text-text-secondary">
              {formatYear(movie.release_date)} &bull;{' '}
              {formatRuntime(movie.runtime)} &bull;{' '}
              {movie.adult ? 'R' : 'PG-13'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 px-3 py-1.5 text-sm font-semibold text-amber-700">
              <Star className="h-4 w-4 fill-amber-500 text-amber-500" aria-hidden />
              {formatRating(movie.vote_average)}
            </span>
            <span className="text-sm text-text-secondary">
              {formatVoteCount(movie.vote_count)} votes
            </span>
            <Button
              variant={favorite ? 'secondary' : 'primary'}
              onClick={() => toggleFavorite(movie.id)}
              className="gap-2"
              aria-pressed={favorite}
            >
              <Heart
                className={`h-4 w-4 ${favorite ? 'fill-current' : ''}`}
                aria-hidden
              />
              {favorite ? 'In Favorites' : 'Add to Favorites'}
            </Button>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-text-primary">Overview</h2>
            <p className="leading-relaxed text-text-secondary">
              {movie.overview || 'No overview available for this movie.'}
            </p>
          </div>

          {movie.genres.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-text-primary">Genres</h2>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="rounded-full border border-border bg-surface px-3 py-1 text-sm text-text-secondary"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          <dl className="grid gap-4 sm:grid-cols-2">
            {metadata.map((item) => (
              <div key={item.label} className="space-y-1">
                <dt className="text-sm font-medium text-text-primary">
                  {item.label}
                </dt>
                <dd className="text-sm text-text-secondary">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {similarQuery.isLoading ? (
        <Spinner className="py-12" label="Loading similar movies..." />
      ) : similarMovies.length > 0 ? (
        <MovieSection
          title="Similar Movies"
          movies={similarMovies.slice(0, 12)}
          layout="row"
        />
      ) : null}
    </div>
  );
}
