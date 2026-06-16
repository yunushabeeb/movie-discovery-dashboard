import { Film } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  message?: string;
  className?: string;
}

export function EmptyState({
  title = 'No movies found',
  message = 'Try adjusting your search or filters to find what you are looking for.',
  className = '',
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 rounded-xl border border-border bg-surface px-6 py-16 text-center ${className}`}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-muted">
        <Film className="h-7 w-7 text-text-muted" aria-hidden />
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
        <p className="max-w-md text-sm text-text-secondary">{message}</p>
      </div>
    </div>
  );
}
