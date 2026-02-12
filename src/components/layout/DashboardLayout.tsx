import { Outlet } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Sidebar } from './Sidebar';
import { useUIStore } from '@/stores/ui';

export function DashboardLayout() {
  const { sidebarCollapsed } = useUIStore();

  return (
    <div className="min-h-screen">
      <Sidebar />

      <div
        className={cn(
          'transition-[margin-left] duration-200 ease-out min-h-screen',
          sidebarCollapsed ? 'ml-[calc(64px+24px)]' : 'ml-[calc(240px+24px)]'
        )}
      >
        <Outlet />
      </div>
    </div>
  );
}
