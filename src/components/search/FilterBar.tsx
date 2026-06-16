import { RATING_OPTIONS, SORT_OPTIONS, YEAR_OPTIONS } from '@/utils/constants';
import { Select } from '@/components/ui/Select';
import type { Genre } from '@/types/movie.types';
import type { SearchFilterState } from '@/hooks/useSearchFilters';

interface FilterBarProps {
  filters: SearchFilterState;
  genres: Genre[];
  onChange: (updates: Partial<SearchFilterState>) => void;
  onClear: () => void;
  hasActiveFilters: boolean;
}

export function FilterBar({
  filters,
  genres,
  onChange,
  onClear,
  hasActiveFilters,
}: FilterBarProps) {
  return (
    <div
      id="search-filters"
      className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-4 sm:flex-row sm:items-center"
    >
      <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Select
          label="Genre"
          value={filters.genre}
          onChange={(event) => onChange({ genre: event.target.value })}
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={String(genre.id)}>
              {genre.name}
            </option>
          ))}
        </Select>

        <Select
          label="Year"
          value={filters.year}
          onChange={(event) => onChange({ year: event.target.value })}
        >
          <option value="">All Years</option>
          {YEAR_OPTIONS.map((year) => (
            <option key={year.value} value={year.value}>
              {year.label}
            </option>
          ))}
        </Select>

        <Select
          label="Rating"
          value={filters.rating}
          onChange={(event) => onChange({ rating: event.target.value })}
        >
          {RATING_OPTIONS.map((option) => (
            <option key={option.value || 'all'} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>

        <Select
          label="Sort By"
          value={filters.sortBy}
          onChange={(event) =>
            onChange({
              sortBy: event.target.value as SearchFilterState['sortBy'],
            })
          }
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </div>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={onClear}
          className="inline-flex h-10 shrink-0 items-center self-center text-sm font-medium text-primary-600 transition-colors hover:text-primary-700 sm:self-auto"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}
