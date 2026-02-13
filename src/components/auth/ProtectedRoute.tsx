import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore, useIsAuthenticated, useIsOrgAdmin } from '@/stores/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireOrgAdmin?: boolean;
  requireApproved?: boolean;
}

export function ProtectedRoute({
  children,
  requireAuth = true,
  requireOrgAdmin = false,
  requireApproved = false,
}: ProtectedRouteProps) {
  const location = useLocation();
  const isAuthenticated = useIsAuthenticated();
  const isOrgAdmin = useIsOrgAdmin();
  const organization = useAuthStore((s) => s.organization);
  const isLoading = useAuthStore((s) => s.isLoading);

  // Still loading auth state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amply-teal" />
      </div>
    );
  }

  // Not authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Requires org admin but user isn't one
  if (requireOrgAdmin && !isOrgAdmin) {
    return <Navigate to="/" replace />;
  }

  // Requires approved org but org isn't approved
  if (requireApproved && organization?.review_status !== 'approved') {
    return <Navigate to="/organization" replace />;
  }

  return <>{children}</>;
}
