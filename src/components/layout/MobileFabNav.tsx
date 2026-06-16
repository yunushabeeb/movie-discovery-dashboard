import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutGrid, X } from 'lucide-react';
import { activeNavClass, inactiveNavClass, navItems } from './navConfig';

export function MobileFabNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 md:hidden">
      <button
        type="button"
        className={`pointer-events-auto fixed inset-0 bg-black/25 backdrop-blur-[1px] transition-opacity duration-150 ease-out ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setOpen(false)}
        aria-label="Close navigation"
        tabIndex={open ? 0 : -1}
      />

      <nav
        aria-label="Mobile navigation"
        aria-hidden={!open}
        className={`pointer-events-auto absolute inset-x-4 bottom-[5.5rem] transition-[transform,opacity] duration-150 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          open
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-3 opacity-0'
        }`}
      >
        <div className="flex items-stretch justify-between gap-1 rounded-2xl border border-border bg-surface p-1.5 shadow-xl shadow-black/10">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              className={({ isActive }) =>
                `flex flex-1 flex-col items-center gap-1 rounded-xl px-1 py-2.5 text-center transition-colors duration-100 ${
                  isActive ? activeNavClass : inactiveNavClass
                }`
              }
            >
              <Icon className="h-5 w-5 shrink-0" aria-hidden />
              <span className="text-[10px] font-medium leading-tight">{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="pointer-events-auto fixed bottom-6 right-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary-600 text-white shadow-lg shadow-primary-600/30 transition-[background-color,box-shadow,transform] duration-150 hover:bg-primary-700 hover:shadow-xl active:scale-95"
        style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}
        aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={open}
      >
        <span
          className={`absolute transition-[transform,opacity] duration-150 ease-out ${
            open ? 'scale-75 opacity-0' : 'scale-100 opacity-100'
          }`}
        >
          <LayoutGrid className="h-6 w-6" aria-hidden />
        </span>
        <span
          className={`absolute transition-[transform,opacity] duration-150 ease-out ${
            open ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
          }`}
        >
          <X className="h-6 w-6" aria-hidden />
        </span>
      </button>
    </div>
  );
}
