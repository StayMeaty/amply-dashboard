import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  type Theme,
  applyTheme,
  resolveTheme,
  getStoredTheme,
  watchSystemTheme,
} from '@/lib/theme';

interface UIState {
  // Theme
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;

  // Sidebar
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;

  // Mobile menu
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      // Theme
      theme: 'system',
      resolvedTheme: 'light',
      setTheme: (theme) => {
        applyTheme(theme);
        set({
          theme,
          resolvedTheme: resolveTheme(theme),
        });
      },

      // Sidebar
      sidebarCollapsed: false,
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

      // Mobile menu
      mobileMenuOpen: false,
      setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
    }),
    {
      name: 'amply-ui',
      partialize: (state) => ({
        theme: state.theme,
        sidebarCollapsed: state.sidebarCollapsed,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Apply theme on rehydrate
          const theme = state.theme || getStoredTheme();
          applyTheme(theme);
          state.resolvedTheme = resolveTheme(theme);
        }
      },
    }
  )
);

// Initialize system theme watcher
if (typeof window !== 'undefined') {
  watchSystemTheme((systemTheme) => {
    const state = useUIStore.getState();
    if (state.theme === 'system') {
      applyTheme('system');
      useUIStore.setState({ resolvedTheme: systemTheme });
    }
  });
}
