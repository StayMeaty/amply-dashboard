import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageContainer } from '@/components/layout/PageContainer';
import { Dashboard } from '@/pages/Dashboard';
import { Demo } from '@/pages/Demo';
import { Settings } from '@/pages/Settings';
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
          {/* Dashboard routes */}
          <Route element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="donations" element={<PlaceholderPage title="Donations" />} />
            <Route path="campaigns" element={<PlaceholderPage title="Campaigns" />} />
            <Route path="funds" element={<PlaceholderPage title="Funds" />} />
            <Route path="payouts" element={<PlaceholderPage title="Payouts" />} />
            <Route path="settings" element={<Settings />} />
            <Route path="api-keys" element={<PlaceholderPage title="API Keys" />} />
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
