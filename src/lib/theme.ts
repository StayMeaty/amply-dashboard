export type Theme = 'light' | 'dark' | 'system';

const THEME_KEY = 'amply-theme';

/**
 * Get the system color scheme preference
 */
export function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

/**
 * Get the stored theme preference
 */
export function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'system';
  return (localStorage.getItem(THEME_KEY) as Theme) || 'system';
}

/**
 * Store the theme preference
 */
export function storeTheme(theme: Theme): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(THEME_KEY, theme);
}

/**
 * Resolve the effective theme (system resolves to light or dark)
 */
export function resolveTheme(theme: Theme): 'light' | 'dark' {
  if (theme === 'system') {
    return getSystemTheme();
  }
  return theme;
}

/**
 * Apply theme to the document
 */
export function applyTheme(theme: Theme): void {
  if (typeof document === 'undefined') return;

  const resolved = resolveTheme(theme);
  document.documentElement.setAttribute('data-theme', resolved);
}

/**
 * Initialize theme from stored preference or system
 */
export function initializeTheme(): Theme {
  const stored = getStoredTheme();
  applyTheme(stored);

  // Initialize background mode from localStorage (zustand persist)
  if (typeof document !== 'undefined') {
    try {
      const uiState = JSON.parse(localStorage.getItem('amply-ui') || '{}');
      const bgMode = uiState?.state?.backgroundMode || 'wallpaper';
      document.documentElement.setAttribute('data-bg-mode', bgMode);
    } catch {
      document.documentElement.setAttribute('data-bg-mode', 'wallpaper');
    }
  }

  return stored;
}

/**
 * Listen for system theme changes
 */
export function watchSystemTheme(callback: (theme: 'light' | 'dark') => void): () => void {
  if (typeof window === 'undefined') return () => {};

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  const handler = (e: MediaQueryListEvent) => {
    callback(e.matches ? 'dark' : 'light');
  };

  mediaQuery.addEventListener('change', handler);
  return () => mediaQuery.removeEventListener('change', handler);
}
