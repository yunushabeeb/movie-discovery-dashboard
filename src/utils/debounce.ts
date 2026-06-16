/** Debounce hook and utility — used by search input to limit TMDB API calls. */
import { useEffect, useState } from 'react';
import { DEBOUNCE_MS } from './constants';

export function useDebounce<T>(value: T, delay = DEBOUNCE_MS): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      window.clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function debounce<T extends (...args: Parameters<T>) => void>(
  fn: T,
  delay = DEBOUNCE_MS,
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
