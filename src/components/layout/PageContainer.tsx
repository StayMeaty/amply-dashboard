import * as React from 'react';
import { cn } from '@/lib/utils';
import { Header } from './Header';

interface PageContainerProps {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({
  title,
  action,
  children,
  className,
}: PageContainerProps) {
  return (
    <div className="flex flex-col h-full">
      <Header action={action} />

      <main
        className={cn(
          'flex-1 overflow-y-auto p-6',
          className
        )}
      >
        <div className="max-w-7xl mx-auto">
          {/* Page Title */}
          <h1 className="text-display text-[var(--text-primary)] mb-6">{title}</h1>
          {children}
        </div>
      </main>
    </div>
  );
}
