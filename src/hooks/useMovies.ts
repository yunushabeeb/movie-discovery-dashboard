import { useQuery } from '@tanstack/react-query';
import {
  discoverMovies,
  getGenres,
  getMovieCredits,
  getMovieDetails,
  getMoviesByList,
  getSimilarMovies,
  searchMovies,
} from '@/api/movies.api';
import { movieKeys } from '@/api/queryKeys';
import type { DiscoverFilters, MovieListType } from '@/types/movie.types';

export function useMovieList(listType: MovieListType, page = 1) {
  return useQuery({
    queryKey: movieKeys.list(`${listType}-${page}`),
    queryFn: () => getMoviesByList(listType, page),
  });
}

export function useMovieDetails(id: number) {
  return useQuery({
    queryKey: movieKeys.detail(id),
    queryFn: () => getMovieDetails(id),
    enabled: Number.isFinite(id) && id > 0,
  });
}

export function useMovieCredits(id: number) {
  return useQuery({
    queryKey: movieKeys.credits(id),
    queryFn: () => getMovieCredits(id),
    enabled: Number.isFinite(id) && id > 0,
  });
}

export function useSimilarMovies(id: number) {
  return useQuery({
    queryKey: movieKeys.similar(id),
    queryFn: () => getSimilarMovies(id),
    enabled: Number.isFinite(id) && id > 0,
  });
}

export function useGenres() {
  return useQuery({
    queryKey: movieKeys.genres(),
    queryFn: getGenres,
    staleTime: 1000 * 60 * 60,
  });
}

export function useSearchMovies(query: string, page = 1) {
  const trimmed = query.trim();

  return useQuery({
    queryKey: movieKeys.search(`${trimmed}-${page}`),
    queryFn: () => searchMovies(trimmed, page),
    enabled: trimmed.length >= 2,
  });
}

export function useDiscoverMovies(filters: DiscoverFilters) {
  const key = JSON.stringify(filters);

  return useQuery({
    queryKey: movieKeys.discover(key),
    queryFn: () => discoverMovies(filters),
    enabled:
      !filters.query ||
      filters.query.trim().length === 0 ||
      filters.query.trim().length >= 2,
  });
}
