import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  LayoutDashboard,
  Heart,
  Megaphone,
  Wallet,
  CreditCard,
  Settings,
  Key,
  Palette,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/stores/ui';

interface NavItem {
  labelKey: string;
  href: string;
  icon: ReactNode;
}

const navItems: NavItem[] = [
  { labelKey: 'nav.dashboard', href: '/', icon: <LayoutDashboard size={18} /> },
  { labelKey: 'nav.donations', href: '/donations', icon: <Heart size={18} /> },
  { labelKey: 'nav.campaigns', href: '/campaigns', icon: <Megaphone size={18} /> },
  { labelKey: 'nav.funds', href: '/funds', icon: <Wallet size={18} /> },
  { labelKey: 'nav.payouts', href: '/payouts', icon: <CreditCard size={18} /> },
];

const bottomNavItems: NavItem[] = [
  { labelKey: 'nav.demo', href: '/demo', icon: <Palette size={18} /> },
  { labelKey: 'nav.settings', href: '/settings', icon: <Settings size={18} /> },
  { labelKey: 'nav.apiKeys', href: '/api-keys', icon: <Key size={18} /> },
];

export function Sidebar() {
  const { t } = useTranslation();
  const { sidebarCollapsed, toggleSidebar } = useUIStore();

  return (
    <aside
      className={cn(
        'fixed left-3 top-3 z-40 rounded-xl',
        'flex flex-col',
        'backdrop-blur-xl',
        'border border-[var(--sidebar-border)]',
        'shadow-lg',
        'transition-[width] duration-200 ease-out',
        sidebarCollapsed ? 'w-16' : 'w-60'
      )}
      style={{
        height: 'calc(100vh - 24px)',
        background: 'var(--sidebar-bg)',
        color: 'var(--sidebar-text)',
      }}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-center px-3 border-b" style={{ borderColor: 'var(--sidebar-border)' }}>
        <img
          src={sidebarCollapsed ? '/dashboard/logo-icon.svg' : '/dashboard/logo.svg'}
          alt="Amply"
          className={cn(
            'h-7 transition-all duration-200',
            sidebarCollapsed ? 'w-7' : 'w-auto'
          )}
          style={{ filter: 'var(--logo-filter)' }}
        />
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2 rounded-md',
                'text-sm font-normal transition-colors duration-150',
                isActive
                  ? 'bg-amply-teal text-white'
                  : 'text-[var(--sidebar-text-muted)] hover:text-[var(--sidebar-text)] hover:bg-[var(--sidebar-hover)]',
                sidebarCollapsed && 'justify-center px-2'
              )
            }
            title={sidebarCollapsed ? t(item.labelKey) : undefined}
          >
            <span className="flex-shrink-0 opacity-80">{item.icon}</span>
            {!sidebarCollapsed && <span>{t(item.labelKey)}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Navigation */}
      <div className="py-4 px-2 space-y-1 border-t" style={{ borderColor: 'var(--sidebar-border)' }}>
        {bottomNavItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2 rounded-md',
                'text-sm font-normal transition-colors duration-150',
                isActive
                  ? 'bg-amply-teal text-white'
                  : 'text-[var(--sidebar-text-muted)] hover:text-[var(--sidebar-text)] hover:bg-[var(--sidebar-hover)]',
                sidebarCollapsed && 'justify-center px-2'
              )
            }
            title={sidebarCollapsed ? t(item.labelKey) : undefined}
          >
            <span className="flex-shrink-0 opacity-80">{item.icon}</span>
            {!sidebarCollapsed && <span>{t(item.labelKey)}</span>}
          </NavLink>
        ))}

        {/* Collapse Toggle */}
        <button
          onClick={toggleSidebar}
          className={cn(
            'flex items-center gap-3 px-3 py-2 rounded-md w-full',
            'text-sm font-normal transition-colors duration-150',
            'text-[var(--sidebar-text-muted)] hover:text-[var(--sidebar-text)] hover:bg-[var(--sidebar-hover)]',
            sidebarCollapsed && 'justify-center px-2'
          )}
        >
          {sidebarCollapsed ? (
            <ChevronRight size={18} />
          ) : (
            <>
              <ChevronLeft size={18} />
              <span>{t('nav.collapse')}</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
