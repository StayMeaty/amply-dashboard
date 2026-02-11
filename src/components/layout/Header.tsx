import * as React from 'react';
import { Sun, Moon, Monitor, Bell, ChevronDown } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { cn, getInitials } from '@/lib/utils';
import { useUIStore } from '@/stores/ui';
import { useAuthStore } from '@/stores/auth';
import { Button } from '@/components/ui/Button';
import type { Theme } from '@/lib/theme';

interface HeaderProps {
  title: string;
  action?: React.ReactNode;
}

export function Header({ title, action }: HeaderProps) {
  const { theme, setTheme } = useUIStore();
  const { user, organisation } = useAuthStore();

  const themeOptions: { value: Theme; label: string; icon: React.ReactNode }[] = [
    { value: 'light', label: 'Light', icon: <Sun size={14} /> },
    { value: 'dark', label: 'Dark', icon: <Moon size={14} /> },
    { value: 'system', label: 'System', icon: <Monitor size={14} /> },
  ];

  return (
    <header className="h-16 bg-[var(--bg-base)] border-b border-[var(--border-default)] flex items-center justify-between px-6">
      {/* Left - Title */}
      <div className="flex items-center gap-4">
        <h1 className="text-heading text-[var(--text-primary)]">{title}</h1>
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-3">
        {action}

        {/* Theme Switcher */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button variant="ghost" size="icon" aria-label="Toggle theme">
              {theme === 'dark' ? (
                <Moon size={18} />
              ) : theme === 'light' ? (
                <Sun size={18} />
              ) : (
                <Monitor size={18} />
              )}
            </Button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className={cn(
                'glass-panel-elevated rounded-lg p-1 min-w-[140px]',
                'animate-in fade-in-0 zoom-in-95'
              )}
              sideOffset={4}
              align="end"
            >
              {themeOptions.map((option) => (
                <DropdownMenu.Item
                  key={option.value}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer',
                    'text-sm text-[var(--text-secondary)]',
                    'outline-none transition-colors',
                    'hover:bg-[var(--surface-secondary)] hover:text-[var(--text-primary)]',
                    theme === option.value && 'text-amply-teal'
                  )}
                  onClick={() => setTheme(option.value)}
                >
                  {option.icon}
                  <span>{option.label}</span>
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>

        {/* Notifications */}
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell size={18} />
        </Button>

        {/* User Menu */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              className={cn(
                'flex items-center gap-2 px-2 py-1 rounded-md',
                'hover:bg-[var(--surface-secondary)] transition-colors'
              )}
            >
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center',
                  'bg-amply-teal text-white text-xs font-semibold'
                )}
              >
                {user ? getInitials(user.name) : 'U'}
              </div>
              <ChevronDown size={14} className="text-[var(--text-muted)]" />
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className={cn(
                'glass-panel-elevated rounded-lg p-1 min-w-[200px]',
                'animate-in fade-in-0 zoom-in-95'
              )}
              sideOffset={4}
              align="end"
            >
              {/* User Info */}
              <div className="px-3 py-2 border-b border-[var(--border-default)]">
                <p className="text-sm font-medium text-[var(--text-primary)]">
                  {user?.name || 'User'}
                </p>
                <p className="text-xs text-[var(--text-muted)]">
                  {organisation?.name || 'Organisation'}
                </p>
              </div>

              <DropdownMenu.Item
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer',
                  'text-sm text-[var(--text-secondary)]',
                  'outline-none transition-colors',
                  'hover:bg-[var(--surface-secondary)] hover:text-[var(--text-primary)]'
                )}
              >
                Account Settings
              </DropdownMenu.Item>

              <DropdownMenu.Separator className="h-px bg-[var(--border-default)] my-1" />

              <DropdownMenu.Item
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer',
                  'text-sm text-error',
                  'outline-none transition-colors',
                  'hover:bg-error-light'
                )}
              >
                Sign Out
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </header>
  );
}
