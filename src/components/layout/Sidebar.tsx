/** Desktop sidebar — collapsible; hidden below md where MobileFabNav takes over. */
import { NavLink } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  Sparkles,
} from 'lucide-react';
import { useLayout } from '@/hooks/useLayout';
import { activeNavClass, inactiveNavClass, navItems } from './navConfig';

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useLayout();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 hidden flex-col border-r border-border bg-surface transition-[width] duration-200 ease-out md:flex ${
        sidebarCollapsed ? 'w-[4.5rem]' : 'w-60'
      }`}
    >
      <div
        className={`flex h-[4.5rem] shrink-0 items-center border-b border-border ${
          sidebarCollapsed ? 'justify-center px-3' : 'justify-between px-5'
        }`}
      >
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-600">
            <Clapperboard className="h-5 w-5 text-white" aria-hidden />
          </div>
          <span
            className={`whitespace-nowrap text-lg font-bold text-text-primary transition-opacity duration-200 ${
              sidebarCollapsed ? 'w-0 opacity-0' : 'opacity-100'
            }`}
          >
            MovieHub
          </span>
        </div>

        {!sidebarCollapsed && (
          <button
            type="button"
            onClick={toggleSidebar}
            className="rounded-lg p-1.5 text-text-muted transition-colors hover:bg-surface-muted hover:text-text-primary"
            aria-label="Collapse sidebar"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
          </button>
        )}
      </div>

      {sidebarCollapsed && (
        <div className="flex justify-center border-b border-border py-2">
          <button
            type="button"
            onClick={toggleSidebar}
            className="rounded-lg p-1.5 text-text-muted transition-colors hover:bg-surface-muted hover:text-text-primary"
            aria-label="Expand sidebar"
          >
            <ChevronRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
      )}

      <nav
        className="flex flex-1 flex-col gap-1 overflow-y-auto p-3"
        aria-label="Main navigation"
      >
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            title={sidebarCollapsed ? label : undefined}
            className={({ isActive }) =>
              `flex items-center rounded-lg py-2.5 text-sm font-medium transition-all duration-200 ${
                sidebarCollapsed ? 'justify-center px-0' : 'gap-3 px-3'
              } ${isActive ? activeNavClass : inactiveNavClass}`
            }
          >
            <Icon className="h-5 w-5 shrink-0" aria-hidden />
            <span
              className={`whitespace-nowrap transition-opacity duration-200 ${
                sidebarCollapsed ? 'sr-only' : 'opacity-100'
              }`}
            >
              {label}
            </span>
          </NavLink>
        ))}
      </nav>

      <div className="shrink-0 border-t border-border p-3">
        <div
          className={`flex items-center rounded-lg bg-primary-50 text-xs text-primary-700 transition-all duration-200 ${
            sidebarCollapsed
              ? 'justify-center px-2 py-2.5'
              : 'gap-2 px-3 py-2.5'
          }`}
          title={sidebarCollapsed ? 'Powered by TMDB API' : undefined}
        >
          <Sparkles className="h-4 w-4 shrink-0" aria-hidden />
          <span
            className={`whitespace-nowrap transition-opacity duration-200 ${
              sidebarCollapsed ? 'sr-only' : 'opacity-100'
            }`}
          >
            Powered by TMDB API
          </span>
        </div>
      </div>
    </aside>
  );
}
