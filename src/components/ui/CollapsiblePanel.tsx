import type { ReactNode } from 'react';

interface CollapsiblePanelProps {
  open: boolean;
  children: ReactNode;
  className?: string;
}

export function CollapsiblePanel({
  open,
  children,
  className = '',
}: CollapsiblePanelProps) {
  return (
    <div
      className={`grid transition-[grid-template-rows,opacity] duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] ${
        open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
      } ${className}`}
      aria-hidden={!open}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}
