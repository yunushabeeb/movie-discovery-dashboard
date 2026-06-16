import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Filter, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useDebounce } from '@/utils/debounce';

interface SearchFieldProps {
  initialQuery: string;
  searchParams: URLSearchParams;
}

function SearchField({ initialQuery, searchParams }: SearchFieldProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebounce(query);

  useEffect(() => {
    const trimmed = debouncedQuery.trim();
    if (!trimmed || location.pathname !== '/search') return;

    const current = searchParams.get('q') ?? '';
    if (trimmed === current) return;

    const params = new URLSearchParams(searchParams);
    params.set('q', trimmed);
    navigate(`/search?${params.toString()}`);
  }, [debouncedQuery, location.pathname, navigate, searchParams]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    const params = new URLSearchParams(searchParams);
    params.set('q', trimmed);
    navigate(`/search?${params.toString()}`);
  };

  const handleClear = () => {
    setQuery('');
    if (location.pathname === '/search') {
      const params = new URLSearchParams(searchParams);
      params.delete('q');
      const next = params.toString();
      navigate(next ? `/search?${next}` : '/search');
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
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search movies..."
        className="h-11 w-full rounded-xl border border-border bg-surface-muted pl-10 pr-10 text-sm text-text-primary placeholder:text-text-muted transition-colors focus:border-primary-500 focus:bg-surface focus:outline-none focus:ring-2 focus:ring-primary-500/20"
        aria-label="Search movies"
      />
      {query && (
        <button
          type="button"
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

interface HeaderProps {
  showFiltersButton?: boolean;
}

export function Header({ showFiltersButton = false }: HeaderProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryFromUrl = searchParams.get('q') ?? '';

  const goToSearch = () => {
    navigate('/search');
  };

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
      <div className="flex items-center gap-3 px-4 py-4 sm:px-6">
        <div onFocus={goToSearch} className="flex flex-1">
          <SearchField
            key={`${queryFromUrl}-${searchParams.toString()}`}
            initialQuery={queryFromUrl}
            searchParams={searchParams}
          />
        </div>

        {showFiltersButton && (
          <Button
            variant="primary"
            className="shrink-0 gap-2"
            onClick={() => {
              const filters = document.getElementById('search-filters');
              filters?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
          >
            <Filter className="h-4 w-4" aria-hidden />
            <span className="hidden sm:inline">Filters</span>
          </Button>
        )}
      </div>
    </header>
  );
}
