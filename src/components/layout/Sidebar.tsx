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
  Code,
  Palette,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Gift,
  User,
  Plug,
  ShoppingCart,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/stores/ui';
import { useIsOrgAdmin, useContributorType } from '@/stores/auth';

interface NavItem {
  labelKey: string;
  href: string;
  icon: ReactNode;
}

interface NavSection {
  titleKey: string;
  items: NavItem[];
  condition?: boolean;
}

export function Sidebar() {
  const { t } = useTranslation();
  const { sidebarCollapsed, toggleSidebar } = useUIStore();
  const isOrgAdmin = useIsOrgAdmin();
  const contributorType = useContributorType();

  const sections: NavSection[] = [
    // ORGANIZATION section - only for org admins
    {
      titleKey: 'nav.sections.organization',
      condition: isOrgAdmin,
      items: [
        { labelKey: 'nav.overview', href: '/organization', icon: <LayoutDashboard size={18} /> },
        { labelKey: 'nav.donations', href: '/organization/donations', icon: <Heart size={18} /> },
        { labelKey: 'nav.ledger', href: '/organization/ledger', icon: <BookOpen size={18} /> },
        { labelKey: 'nav.funds', href: '/organization/funds', icon: <Wallet size={18} /> },
        { labelKey: 'nav.payouts', href: '/organization/payouts', icon: <CreditCard size={18} /> },
        { labelKey: 'nav.orgSettings', href: '/organization/settings', icon: <Settings size={18} /> },
      ],
    },
    // OUTREACH section - for everyone
    {
      titleKey: 'nav.sections.outreach',
      items: [
        { labelKey: 'nav.campaigns', href: '/campaigns', icon: <Megaphone size={18} /> },
        { labelKey: 'nav.widgets', href: '/widgets', icon: <Code size={18} /> },
        { labelKey: 'nav.integrations', href: '/integrations', icon: <Plug size={18} /> },
        // Business-only items
        ...(contributorType === 'business'
          ? [{ labelKey: 'nav.checkout', href: '/checkout', icon: <ShoppingCart size={18} /> }]
          : []),
      ],
    },
    // ACCOUNT section - for everyone
    {
      titleKey: 'nav.sections.account',
      items: [
        { labelKey: 'nav.myGiving', href: '/giving', icon: <Gift size={18} /> },
        { labelKey: 'nav.profile', href: '/profile', icon: <User size={18} /> },
        { labelKey: 'nav.settings', href: '/settings', icon: <Settings size={18} /> },
      ],
    },
  ];

  const bottomItems: NavItem[] = [
    { labelKey: 'nav.demo', href: '/demo', icon: <Palette size={18} /> },
  ];

  const visibleSections = sections.filter((section) => section.condition !== false);

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
      <div
        className="h-16 flex items-center justify-center px-3 border-b"
        style={{ borderColor: 'var(--sidebar-border)' }}
      >
        <img
          src={sidebarCollapsed ? '/logo-icon.svg' : '/logo.svg'}
          alt="Amply"
          className={cn('h-7 transition-all duration-200', sidebarCollapsed ? 'w-7' : 'w-auto')}
          style={{ filter: 'var(--logo-filter)' }}
        />
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 py-4 px-2 overflow-y-auto">
        {visibleSections.map((section, sectionIndex) => (
          <div key={section.titleKey} className={cn(sectionIndex > 0 && 'mt-6')}>
            {!sidebarCollapsed && (
              <p className="px-3 mb-2 text-xs font-medium uppercase tracking-wider text-[var(--sidebar-text-muted)]">
                {t(section.titleKey)}
              </p>
            )}
            <div className="space-y-1">
              {section.items.map((item) => (
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
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom Navigation */}
      <div className="py-4 px-2 space-y-1 border-t" style={{ borderColor: 'var(--sidebar-border)' }}>
        {bottomItems.map((item) => (
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
