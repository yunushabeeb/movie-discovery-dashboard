import { Loader2 } from 'lucide-react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
}

const sizeClasses = {
  sm: 'h-5 w-5',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
};

export function Spinner({
  size = 'md',
  label = 'Loading...',
  className = '',
}: SpinnerProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${className}`}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <Loader2 className={`animate-spin text-primary-600 ${sizeClasses[size]}`} />
      <span className="text-sm text-text-secondary">{label}</span>
    </div>
  );
}
