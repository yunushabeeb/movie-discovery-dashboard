export const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

export const POSTER_SIZES = {
  small: 'w185',
  medium: 'w342',
  large: 'w500',
  original: 'original',
} as const;

export const BACKDROP_SIZES = {
  small: 'w780',
  large: 'w1280',
  original: 'original',
} as const;

export const MOVIE_LIST_LABELS = {
  now_playing: 'Now Playing',
  popular: 'Popular Movies',
  top_rated: 'Top Rated',
  upcoming: 'Upcoming',
} as const;

export const SORT_OPTIONS = [
  { value: 'popularity.desc', label: 'Popularity' },
  { value: 'vote_average.desc', label: 'Rating (High to Low)' },
  { value: 'release_date.desc', label: 'Release Date (Newest)' },
  { value: 'release_date.asc', label: 'Release Date (Oldest)' },
] as const;

export const RATING_OPTIONS = [
  { value: '', label: 'All Ratings' },
  { value: '9', label: '9+ Excellent' },
  { value: '8', label: '8+ Great' },
  { value: '7', label: '7+ Good' },
  { value: '6', label: '6+ Fair' },
  { value: '5', label: '5+ Average' },
] as const;

export const CURRENT_YEAR = new Date().getFullYear();

export const YEAR_OPTIONS = Array.from({ length: 30 }, (_, index) => {
  const year = CURRENT_YEAR - index;
  return { value: String(year), label: String(year) };
});

export const DEBOUNCE_MS = 400;

export const STALE_TIME = 1000 * 60 * 5;

export const FAVORITES_STORAGE_KEY = 'moviehub-favorites';
