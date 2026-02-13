const API_BASE = import.meta.env.VITE_API_URL || 'https://api.amply-impact.org/v1';

export const endpoints = {
  auth: {
    login: `${API_BASE}/auth/login`,
    register: `${API_BASE}/auth/register`,
    logout: `${API_BASE}/auth/logout`,
    me: `${API_BASE}/auth/me`,
    verifyEmail: `${API_BASE}/auth/verify-email`,
    requestPasswordReset: `${API_BASE}/auth/request-password-reset`,
    resetPassword: `${API_BASE}/auth/reset-password`,
  },
  organizations: {
    list: `${API_BASE}/organizations`,
    get: (id: string) => `${API_BASE}/organizations/${id}`,
    create: `${API_BASE}/organizations`,
    update: (id: string) => `${API_BASE}/organizations/${id}`,
    // Dashboard endpoints (for current user's organization)
    mine: `${API_BASE}/organizations/mine`,
    summary: `${API_BASE}/organizations/mine/summary`,
    donations: `${API_BASE}/organizations/mine/donations`,
    ledger: `${API_BASE}/organizations/mine/ledger`,
    funds: `${API_BASE}/organizations/mine/funds`,
    fund: (fundId: string) => `${API_BASE}/organizations/mine/funds/${fundId}`,
  },
  donations: {
    list: `${API_BASE}/donations`,
    get: (id: string) => `${API_BASE}/donations/${id}`,
    create: `${API_BASE}/donations`,
  },
  ledger: {
    entries: (orgId: string) => `${API_BASE}/organizations/${orgId}/ledger`,
    export: (orgId: string) => `${API_BASE}/organizations/${orgId}/ledger/export`,
  },
  funds: {
    list: (orgId: string) => `${API_BASE}/organizations/${orgId}/funds`,
    get: (orgId: string, fundId: string) => `${API_BASE}/organizations/${orgId}/funds/${fundId}`,
    create: (orgId: string) => `${API_BASE}/organizations/${orgId}/funds`,
  },
  campaigns: {
    mine: `${API_BASE}/campaigns/mine`,
    get: (id: string) => `${API_BASE}/campaigns/mine/${id}`,
  },
  giving: {
    history: `${API_BASE}/giving/history`,
    summary: `${API_BASE}/giving/summary`,
  },
  widgets: {
    mine: `${API_BASE}/widgets/mine`,
    get: (id: string) => `${API_BASE}/widgets/mine/${id}`,
  },
} as const;
