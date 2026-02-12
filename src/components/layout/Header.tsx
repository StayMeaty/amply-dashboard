import * as React from 'react';
import { Bell, ChevronDown } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Tooltip from '@radix-ui/react-tooltip';
import { useTranslation } from 'react-i18next';
import { cn, getInitials } from '@/lib/utils';
import { useAuthStore } from '@/stores/auth';
import { Button } from '@/components/ui/Button';

const tooltipContentClass = cn(
  'px-3 py-1.5 text-xs font-medium rounded-md',
  'bg-[var(--text-primary)] text-[var(--text-inverse)]',
  'animate-in fade-in-0 zoom-in-95',
  'shadow-md'
);

interface HeaderProps {
  action?: React.ReactNode;
}

export function Header({ action }: HeaderProps) {
  const { t } = useTranslation();
  const { user, organisation } = useAuthStore();

  return (
    <Tooltip.Provider delayDuration={300}>
      <header
        className="sticky top-3 z-30 ml-auto mr-3 h-12 w-fit rounded-xl backdrop-blur-xl border border-[var(--sidebar-border)] shadow-lg flex items-center px-3"
        style={{ background: 'var(--sidebar-bg)' }}
      >
        <div className="flex items-center gap-2">
          {action}

          {/* Notifications */}
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <Button variant="ghost" size="icon" aria-label={t('header.notifications')}>
                <Bell size={18} />
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content className={tooltipContentClass} sideOffset={8}>
                {t('header.notifications')}
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>

          {/* User Menu */}
          <DropdownMenu.Root>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
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
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content className={tooltipContentClass} sideOffset={8}>
                  {t('header.account')}
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>

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
                  {t('header.accountSettings')}
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
                  {t('header.signOut')}
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </header>
    </Tooltip.Provider>
  );
}
