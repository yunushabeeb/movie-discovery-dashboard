import { Outlet, useLocation } from 'react-router-dom';
import { Clapperboard } from 'lucide-react';
import { Header } from './Header';
import { MobileFabNav } from './MobileFabNav';
import { Sidebar } from './Sidebar';
import { useSidebarOffset } from '@/hooks/useLayout';

function isMovieDetailPage(pathname: string): boolean {
  return /^\/movie\/[^/]+$/.test(pathname);
}

export function AppLayout() {
  const location = useLocation();
  const sidebarOffset = useSidebarOffset();
  const isDetailPage = isMovieDetailPage(location.pathname);

  return (
    <div className="min-h-dvh bg-surface-muted">
      <Sidebar />
      <MobileFabNav key={location.pathname} />

      <div
        className={`flex min-h-dvh flex-col transition-[padding] duration-200 ease-out ${sidebarOffset}`}
      >
        <div className="sticky top-0 z-30 shrink-0 bg-surface/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-surface/80 md:shadow-none">
          <div className="flex items-center gap-3 border-b border-border px-4 py-3 md:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600">
              <Clapperboard className="h-4 w-4 text-white" aria-hidden />
            </div>
            <span className="text-base font-bold text-text-primary">MovieHub</span>
          </div>

          {!isDetailPage && <Header className="md:border-b" />}
        </div>

        <main className="flex-1 px-4 py-5 pb-24 sm:px-6 sm:py-6 md:pb-6">
          <div className="animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
