import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SlideContainerProps {
  currentSlide: number;
  totalSlides: number;
  children: ReactNode;
}

export function SlideContainer({ currentSlide, totalSlides, children }: SlideContainerProps) {
  return (
    <div className="w-full">
      {/* Progress indicator */}
      <div className="flex gap-1 mb-8">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'h-1 flex-1 rounded-full transition-colors',
              i < currentSlide
                ? 'bg-amply-teal'
                : i === currentSlide
                  ? 'bg-amply-coral'
                  : 'bg-[var(--border-default)]'
            )}
          />
        ))}
      </div>

      {/* Slide content */}
      <div className="min-h-[320px]">{children}</div>
    </div>
  );
}
