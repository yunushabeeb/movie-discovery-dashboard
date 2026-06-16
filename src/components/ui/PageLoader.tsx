import { Spinner } from './Spinner';

interface PageLoaderProps {
  label?: string;
}

export function PageLoader({ label = 'Loading...' }: PageLoaderProps) {
  return (
    <div className="flex min-h-[calc(100dvh-10rem)] items-center justify-center animate-fade-in">
      <Spinner label={label} />
    </div>
  );
}
