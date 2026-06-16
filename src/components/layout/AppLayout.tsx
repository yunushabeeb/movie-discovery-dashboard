import { Outlet, useLocation } from 'react-router-dom';
import { Clapperboard } from 'lucide-react';
import { Header } from './Header';
import { MobileNav, Sidebar } from './Sidebar';

export function AppLayout() {
  const location = useLocation();
  const isSearchPage = location.pathname === '/search';

  return (
    <div className="flex min-h-dvh bg-surface-muted">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-3 border-b border-border bg-surface px-4 py-3 lg:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600">
            <Clapperboard className="h-4 w-4 text-white" aria-hidden />
          </div>
          <span className="text-base font-bold text-text-primary">MovieHub</span>
        </div>
        <MobileNav />
        <Header showFiltersButton={isSearchPage} />
        <main className="flex-1 px-4 py-5 sm:px-6 sm:py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
