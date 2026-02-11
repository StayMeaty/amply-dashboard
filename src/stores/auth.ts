import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
}

export interface Organisation {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  organisation: Organisation | null;
  organisations: Organisation[];

  // Actions
  login: (token: string, user: User, organisation: Organisation) => void;
  logout: () => void;
  setOrganisations: (organisations: Organisation[]) => void;
  switchOrganisation: (organisation: Organisation) => void;
  updateUser: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      organisation: null,
      organisations: [],

      login: (token, user, organisation) =>
        set({
          token,
          user,
          organisation,
          organisations: [organisation],
        }),

      logout: () =>
        set({
          token: null,
          user: null,
          organisation: null,
          organisations: [],
        }),

      setOrganisations: (organisations) => set({ organisations }),

      switchOrganisation: (organisation) => set({ organisation }),

      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),
    }),
    {
      name: 'amply-auth',
      partialize: (state) => ({
        token: state.token,
        // Don't persist sensitive user data
      }),
    }
  )
);
