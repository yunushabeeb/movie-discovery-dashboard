/**
 * Search & discover page — uses TMDB search when a query is present,
 * otherwise falls back to discover/movie for filter-only browsing.
 */
import { useMemo } from 'react';
import { PageLoader } from '@/components/ui/PageLoader';
import { ErrorState } from '@/components/ui/ErrorState';
import { EmptyState } from '@/components/ui/EmptyState';
import { MovieGrid } from '@/components/movies/MovieGrid';
import { FilterBar } from '@/components/search/FilterBar';
import { CollapsiblePanel } from '@/components/ui/CollapsiblePanel';
import { useDiscoverMovies, useGenres, useSearchMovies } from '@/hooks/useMovies';
import { useSearchFilters } from '@/hooks/useSearchFilters';
import { useLayout } from '@/hooks/useLayout';
import { pluralize } from '@/utils/format';

export function SearchPage() {
  const { filtersOpen } = useLayout();
  const { filters, setFilters, clearFilters, hasActiveFilters } =
    useSearchFilters();
  const genresQuery = useGenres();

  const trimmedQuery = filters.query.trim();
  const isSearching = trimmedQuery.length >= 2;
  const hasFilters = hasActiveFilters || filters.sortBy !== 'popularity.desc';

  const searchQuery = useSearchMovies(trimmedQuery);
  const discoverQuery = useDiscoverMovies({
    genre: filters.genre,
    year: filters.year,
    rating: filters.rating,
    sortBy: filters.sortBy,
  });

  const activeQuery = isSearching ? searchQuery : discoverQuery;

  // TMDB search results only include genre_ids, so genre/year/rating filters
  // are applied client-side when a text search is active.
  const filteredMovies = useMemo(() => {
    const movies = activeQuery.data?.results ?? [];

    if (!isSearching) return movies;

    return movies.filter((movie) => {
      if (filters.genre && !movie.genre_ids.includes(Number(filters.genre))) {
        return false;
      }
      if (filters.year && !movie.release_date.startsWith(filters.year)) {
        return false;
      }
      if (filters.rating && movie.vote_average < Number(filters.rating)) {
        return false;
      }
      return true;
    });
  }, [activeQuery.data?.results, filters, isSearching]);

  // Search endpoint doesn't accept sort params; sort client-side when searching.
  const sortedMovies = useMemo(() => {
    if (!isSearching || filters.sortBy === 'popularity.desc') {
      return filteredMovies;
    }

    const sorted = [...filteredMovies];
    const [field, direction] = filters.sortBy.split('.') as [
      'popularity' | 'vote_average' | 'release_date',
      'asc' | 'desc',
    ];

    sorted.sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];
      const comparison =
        typeof aValue === 'string'
          ? aValue.localeCompare(String(bValue))
          : Number(aValue) - Number(bValue);
      return direction === 'asc' ? comparison : -comparison;
    });

    return sorted;
  }, [filteredMovies, filters.sortBy, isSearching]);

  const showInitialState = !isSearching && !hasFilters;
  const showMinQueryHint =
    trimmedQuery.length > 0 && trimmedQuery.length < 2;

  return (
    <div className="space-y-6">
      <header>
        {isSearching ? (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-2xl font-bold text-text-primary">
              Search Results for &ldquo;{trimmedQuery}&rdquo;
            </h1>
            {!activeQuery.isLoading && !activeQuery.isError && (
              <p className="text-sm text-text-secondary">
                {pluralize(sortedMovies.length, 'result')} found
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-text-primary">
              Search &amp; Discover
            </h1>
            <p className="text-sm text-text-secondary">
              Search for movies or browse with filters below.
            </p>
          </div>
        )}
      </header>

      <CollapsiblePanel open={filtersOpen}>
        <FilterBar
          filters={filters}
          genres={genresQuery.data?.genres ?? []}
          onChange={setFilters}
          onClear={clearFilters}
          hasActiveFilters={hasActiveFilters}
        />
      </CollapsiblePanel>

      {showMinQueryHint && (
        <p className="animate-fade-in text-sm text-text-secondary">
          Type at least 2 characters to search.
        </p>
      )}

      {showInitialState && (
        <EmptyState
          title="Start exploring"
          message="Enter a movie title in the search bar or apply filters to discover movies."
        />
      )}

      {!showInitialState && !showMinQueryHint && activeQuery.isLoading && (
        <PageLoader label="Searching movies..." />
      )}

      {!showInitialState && activeQuery.isError && (
        <ErrorState
          message={activeQuery.error?.message}
          onRetry={() => void activeQuery.refetch()}
        />
      )}

      {!showInitialState &&
        !showMinQueryHint &&
        !activeQuery.isLoading &&
        !activeQuery.isError &&
        sortedMovies.length === 0 && (
          <EmptyState
            title="No movies found"
            message={
              isSearching
                ? 'No results match your search and filters. Try different keywords or clear some filters.'
                : 'No movies match your current filters. Try adjusting or clearing them.'
            }
          />
        )}

      {!showInitialState &&
        !showMinQueryHint &&
        !activeQuery.isLoading &&
        !activeQuery.isError &&
        sortedMovies.length > 0 && (
          <div className="animate-fade-in">
            <MovieGrid movies={sortedMovies} />
          </div>
        )}
    </div>
  );
}
