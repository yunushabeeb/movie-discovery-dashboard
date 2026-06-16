import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Filter, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useDebounce } from '@/utils/debounce';
import { useLayout } from '@/hooks/useLayout';

interface HeaderProps {
  className?: string;
}

function SearchField() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { setFiltersOpen } = useLayout();

  const urlQuery = searchParams.get('q') ?? '';
  const [isFocused, setIsFocused] = useState(false);
  const [draft, setDraft] = useState(urlQuery);
  const debouncedDraft = useDebounce(draft);

  // While focused, show local draft so URL updates don't steal input focus.
  // When blurred, show the URL value (handles back/forward navigation).
  const displayValue = isFocused ? draft : urlQuery;

  // Sync debounced input to URL without full navigation — keeps the input mounted.
  useEffect(() => {
    if (location.pathname !== '/search') return;

    const trimmed = debouncedDraft.trim();
    const current = searchParams.get('q') ?? '';
    if (trimmed === current) return;

    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (trimmed) next.set('q', trimmed);
        else next.delete('q');
        return next;
      },
      { replace: true },
    );
  }, [debouncedDraft, location.pathname, searchParams, setSearchParams]);

  const handleFocus = () => {
    setIsFocused(true);
    setDraft(urlQuery);
    setFiltersOpen(true);

    if (location.pathname !== '/search') {
      const params = searchParams.toString();
      navigate(params ? `/search?${params}` : '/search');
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed) return;

    setFiltersOpen(true);
    setDraft(trimmed);

    if (location.pathname !== '/search') {
      const params = new URLSearchParams(searchParams);
      params.set('q', trimmed);
      navigate(`/search?${params.toString()}`);
      return;
    }

    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('q', trimmed);
      return next;
    });
  };

  const handleClear = () => {
    setDraft('');
    setFiltersOpen(true);

    if (location.pathname === '/search') {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.delete('q');
        return next;
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex-1" role="search">
      <Search
        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
        aria-hidden
      />
      <input
        type="search"
        value={displayValue}
        onChange={(event) => setDraft(event.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Search movies..."
        className="h-11 w-full rounded-xl border border-border bg-surface-muted pl-10 pr-10 text-sm text-text-primary placeholder:text-text-muted transition-all duration-200 focus:border-primary-500 focus:bg-surface focus:outline-none focus:ring-2 focus:ring-primary-500/20"
        aria-label="Search movies"
      />
      {displayValue && (
        <button
          type="button"
          // Prevent blur before click so the clear action doesn't fight focus state.
          onMouseDown={(event) => event.preventDefault()}
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-text-muted transition-colors hover:bg-surface hover:text-text-primary"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </form>
  );
}

export function Header({ className = '' }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { filtersOpen, toggleFilters, setFiltersOpen } = useLayout();

  const handleFiltersClick = () => {
    if (location.pathname !== '/search') {
      setFiltersOpen(true);
      navigate('/search');
      return;
    }
    toggleFilters();
  };

  return (
    <header
      className={`shrink-0 border-b border-border bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/80 ${className}`}
    >
      <div className="flex items-center gap-3 px-4 py-4 sm:px-6">
        <SearchField />

        <Button
          variant="primary"
          className="h-11 shrink-0 gap-2 px-4 transition-all duration-200"
          onClick={handleFiltersClick}
          aria-expanded={location.pathname === '/search' ? filtersOpen : false}
          aria-controls="search-filters"
        >
          <Filter className="h-4 w-4" aria-hidden />
          <span className="hidden sm:inline">Filters</span>
        </Button>
      </div>
    </header>
  );
}
