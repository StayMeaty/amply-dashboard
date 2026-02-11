import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Dashboard } from '@/pages/Dashboard';
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
            <Route path="settings" element={<PlaceholderPage title="Settings" />} />
            <Route path="api-keys" element={<PlaceholderPage title="API Keys" />} />
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
  return (
    <div className="flex flex-col h-full">
      <header className="h-16 bg-[var(--bg-base)] border-b border-[var(--border-default)] flex items-center px-6">
        <h1 className="text-heading text-[var(--text-primary)]">{title}</h1>
      </header>
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-[var(--text-secondary)]">{title} page</p>
          <p className="text-sm text-[var(--text-muted)] mt-1">Coming soon</p>
        </div>
      </main>
    </div>
  );
}

export default App;
