/**
 * TMDB HTTP client — single entry point for all movie API requests.
 * Interceptors normalize errors and guard against a missing API key at runtime.
 */
import axios, { type AxiosError } from 'axios';
import type { ApiError } from '@/types/movie.types';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const tmdbClient = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
  headers: {
    Accept: 'application/json',
  },
  timeout: 15000,
});

// Fail fast with a clear message instead of letting TMDB return a cryptic 401.
tmdbClient.interceptors.request.use((config) => {
  if (!API_KEY) {
    return Promise.reject(
      new Error(
        'TMDB API key is missing. Add VITE_TMDB_API_KEY to your .env file.',
      ),
    );
  }
  return config;
});

tmdbClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    const message =
      error.response?.data?.status_message ??
      error.message ??
      'An unexpected error occurred';

    return Promise.reject(new Error(message));
  },
);
