import * as React from 'react';
import { cn } from '@/lib/utils';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      className,
      variant = 'primary',
      padding = 'md',
      header,
      footer,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          'rounded-lg overflow-hidden',

          // Variants
          {
            primary: 'glass-panel',
            secondary: 'glass-panel-secondary',
            elevated: 'glass-panel-elevated',
          }[variant],

          className
        )}
        {...props}
      >
        {header && (
          <div className="px-5 py-4 border-b border-[var(--border-default)] flex items-center justify-between">
            {header}
          </div>
        )}

        <div
          className={cn({
            'p-0': padding === 'none',
            'p-3': padding === 'sm',
            'p-5': padding === 'md',
            'p-6': padding === 'lg',
          })}
        >
          {children}
        </div>

        {footer && (
          <div className="px-5 py-4 border-t border-[var(--border-default)] bg-[var(--bg-subtle)]/30">
            {footer}
          </div>
        )}
      </div>
    );
  }
);

GlassCard.displayName = 'GlassCard';

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, title, description, action, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-start justify-between gap-4', className)}
        {...props}
      >
        <div>
          <h3 className="text-sm font-semibold text-[var(--text-primary)]">
            {title}
          </h3>
          {description && (
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              {description}
            </p>
          )}
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

export { GlassCard, CardHeader };
