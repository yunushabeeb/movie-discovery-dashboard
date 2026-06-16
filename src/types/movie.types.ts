/**
 * TMDB API response types — mirrors the v3 movie endpoints used in movies.api.ts.
 * Kept separate from API layer so types can be imported by components without Axios.
 */
export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  popularity: number;
  adult: boolean;
  original_language: string;
}

export interface MovieDetails extends Movie {
  genres: Genre[];
  runtime: number | null;
  budget: number;
  revenue: number;
  status: string;
  tagline: string;
  homepage: string;
  imdb_id: string | null;
  production_companies: ProductionCompany[];
  spoken_languages: SpokenLanguage[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
}

export interface MovieCredits {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface GenreListResponse {
  genres: Genre[];
}

export type MovieListType =
  | 'now_playing'
  | 'popular'
  | 'top_rated'
  | 'upcoming';

export type SortOption =
  | 'popularity.desc'
  | 'popularity.asc'
  | 'vote_average.desc'
  | 'vote_average.asc'
  | 'release_date.desc'
  | 'release_date.asc';

export interface DiscoverFilters {
  query?: string;
  genre?: string;
  year?: string;
  rating?: string;
  sortBy?: SortOption;
  page?: number;
}

export interface ApiError {
  status_code?: number;
  status_message?: string;
  success?: boolean;
}
