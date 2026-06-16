/**
 * URL-driven filter state — search params are the source of truth so filters
 * are shareable via link and survive page refreshes.
 */
import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { SortOption } from '@/types/movie.types';

export interface SearchFilterState {
  query: string;
  genre: string;
  year: string;
  rating: string;
  sortBy: SortOption;
}

const DEFAULT_FILTERS: SearchFilterState = {
  query: '',
  genre: '',
  year: '',
  rating: '',
  sortBy: 'popularity.desc',
};

export function useSearchFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo<SearchFilterState>(() => {
    return {
      query: searchParams.get('q') ?? '',
      genre: searchParams.get('genre') ?? '',
      year: searchParams.get('year') ?? '',
      rating: searchParams.get('rating') ?? '',
      sortBy: (searchParams.get('sort') as SortOption) ?? 'popularity.desc',
    };
  }, [searchParams]);

  const setFilters = useCallback(
    (updates: Partial<SearchFilterState>) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);

        const apply = (key: string, value: string, defaultValue = '') => {
          if (!value || value === defaultValue) {
            next.delete(key);
          } else {
            next.set(key, value);
          }
        };

        if ('query' in updates) apply('q', updates.query ?? '');
        if ('genre' in updates) apply('genre', updates.genre ?? '');
        if ('year' in updates) apply('year', updates.year ?? '');
        if ('rating' in updates) apply('rating', updates.rating ?? '');
        if ('sortBy' in updates) apply('sort', updates.sortBy ?? 'popularity.desc');

        return next;
      });
    },
    [setSearchParams],
  );

  // Preserve the search query when clearing genre/year/rating filters.
  const clearFilters = useCallback(() => {
    setSearchParams((prev) => {
      const query = prev.get('q');
      return query ? new URLSearchParams({ q: query }) : new URLSearchParams();
    });
  }, [setSearchParams]);

  const hasActiveFilters = useMemo(() => {
    return Boolean(filters.genre || filters.year || filters.rating);
  }, [filters]);

  const isDefaultSort = filters.sortBy === DEFAULT_FILTERS.sortBy;

  return {
    filters,
    setFilters,
    clearFilters,
    hasActiveFilters,
    isDefaultSort,
  };
}
