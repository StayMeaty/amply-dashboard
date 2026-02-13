import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Organization } from '@/api/types';

interface AuthState {
  token: string | null;
  user: User | null;
  organization: Organization | null;
  isLoading: boolean;

  // Actions
  setAuth: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      organization: null,
      isLoading: true,

      setAuth: (token, user) =>
        set({
          token,
          user,
          organization: user.organization,
          isLoading: false,
        }),

      logout: () =>
        set({
          token: null,
          user: null,
          organization: null,
          isLoading: false,
        }),

      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),

      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: 'amply-auth',
      partialize: (state) => ({
        token: state.token,
      }),
    }
  )
);

// Selectors
export const useIsAuthenticated = () => useAuthStore((s) => !!s.token && !!s.user);
export const useIsOrgAdmin = () => useAuthStore((s) => s.user?.account_type === 'organization_admin');
export const useContributorType = () => useAuthStore((s) => s.user?.contributor_type);
export const useOrganizationReviewStatus = () => useAuthStore((s) => s.organization?.review_status);

// Re-export types for convenience
export type { User, Organization };
