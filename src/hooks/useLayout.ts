import { useContext } from 'react';
import { LayoutContext } from '@/context/LayoutContext';

export function useLayout() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within LayoutProvider');
  }
  return context;
}

/** Tailwind padding classes that offset main content for the fixed sidebar width. */
export function useSidebarOffset() {
  const { sidebarCollapsed } = useLayout();
  return sidebarCollapsed ? 'md:pl-[4.5rem]' : 'md:pl-60';
}
