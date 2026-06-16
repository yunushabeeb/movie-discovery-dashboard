import { createContext } from 'react';

export interface LayoutContextValue {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  filtersOpen: boolean;
  setFiltersOpen: (open: boolean) => void;
  toggleFilters: () => void;
}

export const LayoutContext = createContext<LayoutContextValue | null>(null);
