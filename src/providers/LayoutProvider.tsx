/** Persists sidebar collapse preference across sessions. */
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useLocation } from 'react-router-dom';
import { LayoutContext } from '@/context/LayoutContext';

const SIDEBAR_STORAGE_KEY = 'moviehub-sidebar-collapsed';

function loadSidebarCollapsed(): boolean {
  try {
    return localStorage.getItem(SIDEBAR_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

export function LayoutProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(loadSidebarCollapsed);
  // Open filters by default when landing directly on the search route.
  const [filtersOpen, setFiltersOpen] = useState(
    () => location.pathname === '/search',
  );

  useEffect(() => {
    localStorage.setItem(SIDEBAR_STORAGE_KEY, String(sidebarCollapsed));
  }, [sidebarCollapsed]);

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed((current) => !current);
  }, []);

  const toggleFilters = useCallback(() => {
    setFiltersOpen((current) => !current);
  }, []);

  const value = useMemo(
    () => ({
      sidebarCollapsed,
      toggleSidebar,
      filtersOpen,
      setFiltersOpen,
      toggleFilters,
    }),
    [sidebarCollapsed, toggleSidebar, filtersOpen, toggleFilters],
  );

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
}
