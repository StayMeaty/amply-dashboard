import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Base styles
          'flex h-9 w-full rounded-md px-3 py-2',
          'text-sm font-normal',
          'bg-[var(--surface-secondary)] backdrop-blur-sm',
          'border border-[var(--border-default)]',
          'text-[var(--text-primary)]',
          'placeholder:text-[var(--text-muted)]',

          // Focus state
          'focus-visible:outline-none',
          'focus-visible:border-amply-teal',
          'focus-visible:ring-2 focus-visible:ring-amply-teal/10',

          // Transitions
          'transition-colors duration-150',

          // Disabled state
          'disabled:cursor-not-allowed disabled:opacity-50 disabled:backdrop-blur-none',

          // Error state
          error && [
            'border-error',
            'focus-visible:border-error',
            'focus-visible:ring-error/10',
          ],

          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          // Base styles
          'flex min-h-[80px] w-full rounded-md px-3 py-2',
          'text-sm font-normal',
          'bg-[var(--surface-secondary)] backdrop-blur-sm',
          'border border-[var(--border-default)]',
          'text-[var(--text-primary)]',
          'placeholder:text-[var(--text-muted)]',

          // Focus state
          'focus-visible:outline-none',
          'focus-visible:border-amply-teal',
          'focus-visible:ring-2 focus-visible:ring-amply-teal/10',

          // Transitions
          'transition-colors duration-150',

          // Disabled state
          'disabled:cursor-not-allowed disabled:opacity-50',

          // Error state
          error && [
            'border-error',
            'focus-visible:border-error',
            'focus-visible:ring-error/10',
          ],

          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          'text-sm font-medium text-[var(--text-primary)]',
          'leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
          className
        )}
        {...props}
      />
    );
  }
);

Label.displayName = 'Label';

export interface FormMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
  error?: boolean;
}

const FormMessage = React.forwardRef<HTMLParagraphElement, FormMessageProps>(
  ({ className, error, children, ...props }, ref) => {
    if (!children) return null;

    return (
      <p
        ref={ref}
        className={cn(
          'text-xs mt-1.5',
          error ? 'text-error' : 'text-[var(--text-muted)]',
          className
        )}
        {...props}
      >
        {children}
      </p>
    );
  }
);

FormMessage.displayName = 'FormMessage';

export { Input, Textarea, Label, FormMessage };
