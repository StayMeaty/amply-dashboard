import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageContainer } from '@/components/layout/PageContainer';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Dashboard } from '@/pages/Dashboard';
import { Demo } from '@/pages/Demo';
import { Settings } from '@/pages/Settings';
import { Login } from '@/pages/Login';
import { Register } from '@/pages/Register';
import { OrganizationOverview } from '@/pages/organization/Overview';
import { OrganizationDonations } from '@/pages/organization/Donations';
import { OrganizationLedger } from '@/pages/organization/Ledger';
import { OrganizationFunds } from '@/pages/organization/Funds';
import { OrganizationSettings } from '@/pages/organization/OrgSettings';
import { Campaigns } from '@/pages/Campaigns';
import { CampaignForm } from '@/pages/CampaignForm';
import { MyGiving } from '@/pages/MyGiving';
import { WidgetsList } from '@/pages/widgets/WidgetsList';
import { WidgetForm } from '@/pages/widgets/WidgetForm';
import { useEffect } from 'react';
import { initializeTheme } from '@/lib/theme';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minute
      retry: 1,
    },
  },
});

function App() {
  // Initialize theme on mount
  useEffect(() => {
    initializeTheme();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/dashboard">
        <Routes>
          {/* Auth routes (outside layout, no protection) */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* Protected dashboard routes */}
          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            {/* Home/Dashboard */}
            <Route index element={<Dashboard />} />

            {/* Organization routes (org admin only) */}
            <Route path="organization">
              <Route index element={<OrganizationOverview />} />
              <Route path="donations" element={<OrganizationDonations />} />
              <Route path="ledger" element={<OrganizationLedger />} />
              <Route path="funds" element={<OrganizationFunds />} />
              <Route path="payouts" element={<PlaceholderPage title="Payouts" />} />
              <Route path="settings" element={<OrganizationSettings />} />
            </Route>

            {/* Outreach routes (all users) */}
            <Route path="campaigns" element={<Campaigns />} />
            <Route path="campaigns/new" element={<CampaignForm />} />
            <Route path="campaigns/:campaignId/edit" element={<CampaignForm />} />
            <Route path="widgets" element={<WidgetsList />} />
            <Route path="widgets/new" element={<WidgetForm />} />
            <Route path="widgets/:widgetId/edit" element={<WidgetForm />} />
            <Route path="integrations" element={<PlaceholderPage title="Integrations" />} />
            <Route path="checkout" element={<PlaceholderPage title="Checkout" />} />

            {/* Account routes (all users) */}
            <Route path="giving" element={<MyGiving />} />
            <Route path="profile" element={<PlaceholderPage title="Profile" />} />
            <Route path="settings" element={<Settings />} />

            {/* Misc */}
            <Route path="demo" element={<Demo />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

// Temporary placeholder for pages not yet implemented
function PlaceholderPage({ title }: { title: string }) {
  const { t } = useTranslation();
  return (
    <PageContainer title={title}>
      <div className="flex-1 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-lg text-[var(--text-secondary)]">{title}</p>
          <p className="text-sm text-[var(--text-muted)] mt-1">{t('common.comingSoon')}</p>
        </div>
      </div>
    </PageContainer>
  );
}

export default App;
