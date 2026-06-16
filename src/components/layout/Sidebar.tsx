import { NavLink } from 'react-router-dom';
import {
  Calendar,
  Clapperboard,
  Home,
  Sparkles,
  Star,
  TrendingUp,
} from 'lucide-react';

const navItems = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/popular', label: 'Popular', icon: TrendingUp },
  { to: '/top-rated', label: 'Top Rated', icon: Star },
  { to: '/upcoming', label: 'Upcoming', icon: Calendar },
] as const;

export function Sidebar() {
  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-surface lg:flex">
      <div className="flex items-center gap-2.5 border-b border-border px-6 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600">
          <Clapperboard className="h-5 w-5 text-white" aria-hidden />
        </div>
        <span className="text-lg font-bold text-text-primary">MovieHub</span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-4" aria-label="Main navigation">
        {navItems.map(({ to, label, icon: Icon, ...rest }) => (
          <NavLink
            key={to}
            to={to}
            end={'end' in rest ? rest.end : false}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-text-secondary hover:bg-surface-muted hover:text-text-primary'
              }`
            }
          >
            <Icon className="h-5 w-5 shrink-0" aria-hidden />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-border p-4">
        <div className="flex items-center gap-2 rounded-lg bg-primary-50 px-3 py-2.5 text-xs text-primary-700">
          <Sparkles className="h-4 w-4 shrink-0" aria-hidden />
          <span>Powered by TMDB API</span>
        </div>
      </div>
    </aside>
  );
}

export function MobileNav() {
  return (
    <nav
      className="flex gap-1 overflow-x-auto border-b border-border bg-surface px-3 py-2 lg:hidden"
      aria-label="Mobile navigation"
    >
      {navItems.map(({ to, label, icon: Icon, ...rest }) => (
        <NavLink
          key={to}
          to={to}
          end={'end' in rest ? rest.end : false}
          className={({ isActive }) =>
            `flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
              isActive
                ? 'bg-primary-50 text-primary-700'
                : 'text-text-secondary hover:bg-surface-muted'
            }`
          }
        >
          <Icon className="h-4 w-4" aria-hidden />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
