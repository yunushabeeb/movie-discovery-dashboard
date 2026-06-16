/** Shared nav items and active styles — used by sidebar and mobile FAB nav. */
import {
  Calendar,
  Home,
  Star,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  end?: boolean;
}

export const navItems: NavItem[] = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/popular', label: 'Popular', icon: Star },
  { to: '/top-rated', label: 'Top Rated', icon: TrendingUp },
  { to: '/upcoming', label: 'Upcoming', icon: Calendar },
];

export const activeNavClass =
  'bg-primary-600 text-white shadow-sm shadow-primary-600/25';
export const inactiveNavClass =
  'text-text-secondary hover:bg-surface-muted hover:text-text-primary';
