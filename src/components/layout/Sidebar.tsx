import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
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
  label: string;
  href: string;
  icon: ReactNode;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/', icon: <LayoutDashboard size={18} /> },
  { label: 'Donations', href: '/donations', icon: <Heart size={18} /> },
  { label: 'Campaigns', href: '/campaigns', icon: <Megaphone size={18} /> },
  { label: 'Funds', href: '/funds', icon: <Wallet size={18} /> },
  { label: 'Payouts', href: '/payouts', icon: <CreditCard size={18} /> },
];

const bottomNavItems: NavItem[] = [
  { label: 'Demo', href: '/demo', icon: <Palette size={18} /> },
  { label: 'Settings', href: '/settings', icon: <Settings size={18} /> },
  { label: 'API Keys', href: '/api-keys', icon: <Key size={18} /> },
];

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useUIStore();

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen',
        'bg-neutral-900 text-white',
        'flex flex-col',
        'transition-[width] duration-200 ease-out',
        sidebarCollapsed ? 'w-16' : 'w-60'
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-white/10">
        <span
          className={cn(
            'font-black text-xl tracking-tight transition-opacity',
            sidebarCollapsed && 'opacity-0 w-0 overflow-hidden'
          )}
        >
          Amply
        </span>
        {sidebarCollapsed && (
          <span className="font-black text-xl">A</span>
        )}
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
                  : 'text-neutral-400 hover:text-white hover:bg-white/5',
                sidebarCollapsed && 'justify-center px-2'
              )
            }
            title={sidebarCollapsed ? item.label : undefined}
          >
            <span className="flex-shrink-0 opacity-80">{item.icon}</span>
            {!sidebarCollapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Navigation */}
      <div className="py-4 px-2 space-y-1 border-t border-white/10">
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
                  : 'text-neutral-400 hover:text-white hover:bg-white/5',
                sidebarCollapsed && 'justify-center px-2'
              )
            }
            title={sidebarCollapsed ? item.label : undefined}
          >
            <span className="flex-shrink-0 opacity-80">{item.icon}</span>
            {!sidebarCollapsed && <span>{item.label}</span>}
          </NavLink>
        ))}

        {/* Collapse Toggle */}
        <button
          onClick={toggleSidebar}
          className={cn(
            'flex items-center gap-3 px-3 py-2 rounded-md w-full',
            'text-sm font-normal transition-colors duration-150',
            'text-neutral-400 hover:text-white hover:bg-white/5',
            sidebarCollapsed && 'justify-center px-2'
          )}
        >
          {sidebarCollapsed ? (
            <ChevronRight size={18} />
          ) : (
            <>
              <ChevronLeft size={18} />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
