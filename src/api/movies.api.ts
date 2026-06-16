import { tmdbClient } from './client';
import type {
  DiscoverFilters,
  GenreListResponse,
  MovieCredits,
  MovieDetails,
  MovieListType,
  PaginatedResponse,
  Movie,
} from '@/types/movie.types';

export async function getMoviesByList(
  listType: MovieListType,
  page = 1,
): Promise<PaginatedResponse<Movie>> {
  const { data } = await tmdbClient.get<PaginatedResponse<Movie>>(
    `/movie/${listType}`,
    { params: { page } },
  );
  return data;
}

export async function getMovieDetails(id: number): Promise<MovieDetails> {
  const { data } = await tmdbClient.get<MovieDetails>(`/movie/${id}`, {
    params: {
      append_to_response: 'credits',
    },
  });
  return data;
}

export async function getMovieCredits(id: number): Promise<MovieCredits> {
  const { data } = await tmdbClient.get<MovieCredits>(`/movie/${id}/credits`);
  return data;
}

export async function getSimilarMovies(
  id: number,
  page = 1,
): Promise<PaginatedResponse<Movie>> {
  const { data } = await tmdbClient.get<PaginatedResponse<Movie>>(
    `/movie/${id}/similar`,
    { params: { page } },
  );
  return data;
}

export async function searchMovies(
  query: string,
  page = 1,
): Promise<PaginatedResponse<Movie>> {
  const { data } = await tmdbClient.get<PaginatedResponse<Movie>>(
    '/search/movie',
    {
      params: { query, page, include_adult: false },
    },
  );
  return data;
}

export async function discoverMovies(
  filters: DiscoverFilters,
): Promise<PaginatedResponse<Movie>> {
  const params: Record<string, string | number | boolean> = {
    page: filters.page ?? 1,
    include_adult: false,
    sort_by: filters.sortBy ?? 'popularity.desc',
  };

  if (filters.genre) {
    params.with_genres = filters.genre;
  }

  if (filters.year) {
    params.primary_release_year = filters.year;
  }

  if (filters.rating) {
    params['vote_average.gte'] = filters.rating;
  }

  const { data } = await tmdbClient.get<PaginatedResponse<Movie>>(
    '/discover/movie',
    { params },
  );
  return data;
}

export async function getGenres(): Promise<GenreListResponse> {
  const { data } = await tmdbClient.get<GenreListResponse>('/genre/movie/list');
  return data;
}
