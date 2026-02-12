import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  type Theme,
  applyTheme,
  resolveTheme,
  getStoredTheme,
  watchSystemTheme,
} from '@/lib/theme';

export type BackgroundMode = 'gradient' | 'wallpaper';

interface UIState {
  // Theme
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;

  // Background mode
  backgroundMode: BackgroundMode;
  setBackgroundMode: (mode: BackgroundMode) => void;
  toggleBackgroundMode: () => void;

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

      // Background mode
      backgroundMode: 'wallpaper',
      setBackgroundMode: (mode) => {
        document.documentElement.setAttribute('data-bg-mode', mode);
        set({ backgroundMode: mode });
      },
      toggleBackgroundMode: () => {
        set((state) => {
          const newMode = state.backgroundMode === 'gradient' ? 'wallpaper' : 'gradient';
          document.documentElement.setAttribute('data-bg-mode', newMode);
          return { backgroundMode: newMode };
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
        backgroundMode: state.backgroundMode,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Apply theme on rehydrate
          const theme = state.theme || getStoredTheme();
          applyTheme(theme);
          state.resolvedTheme = resolveTheme(theme);
          // Apply background mode on rehydrate
          document.documentElement.setAttribute('data-bg-mode', state.backgroundMode || 'wallpaper');
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
