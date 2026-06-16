import { Film } from 'lucide-react';
import { getPosterUrl } from '@/utils/format';

interface PosterImageProps {
  path: string | null;
  alt: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const sizeMap = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;

export function PosterImage({
  path,
  alt,
  size = 'medium',
  className = '',
}: PosterImageProps) {
  const src = getPosterUrl(path, sizeMap[size]);

  if (!src) {
    return (
      <div
        className={`flex items-center justify-center bg-slate-200 text-text-muted ${className}`}
        aria-label={`No poster available for ${alt}`}
      >
        <Film className="h-10 w-10 opacity-40" aria-hidden />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`bg-slate-200 object-cover ${className}`}
    />
  );
}
