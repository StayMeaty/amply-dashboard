import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'coral' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = 'primary', size = 'md', asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(
          // Base styles
          'inline-flex items-center justify-center gap-2 font-medium',
          'rounded-md transition-colors duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amply-teal focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',

          // Variants
          {
            // Primary - Amply Teal
            primary:
              'bg-amply-teal text-white hover:bg-amply-dark active:bg-amply-dark',

            // Secondary - Glass style
            secondary: [
              'bg-[var(--surface-secondary)] text-[var(--text-primary)]',
              'border border-[var(--border-default)]',
              'hover:bg-[var(--surface-primary)] hover:border-[var(--border-glass)]',
              'backdrop-blur-sm',
            ],

            // Coral - CTA emphasis
            coral:
              'bg-amply-coral text-white hover:bg-[#e86f3e] active:bg-[#d66035]',

            // Ghost - Transparent
            ghost:
              'text-amply-teal hover:bg-amply-teal/10 active:bg-amply-teal/15',

            // Danger
            danger:
              'bg-error text-white hover:bg-red-700 active:bg-red-800',
          }[variant],

          // Sizes
          {
            sm: 'h-8 px-3 text-xs',
            md: 'h-9 px-4 text-sm',
            lg: 'h-11 px-6 text-base',
            icon: 'h-9 w-9 p-0',
          }[size],

          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };
