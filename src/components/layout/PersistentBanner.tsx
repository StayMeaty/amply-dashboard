import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore, useIsOrgAdmin, useOrganizationReviewStatus } from '@/stores/auth';

type BannerVariant = 'warning' | 'info' | 'error';

interface Banner {
  id: string;
  variant: BannerVariant;
  messageKey: string;
  actionKey?: string;
  actionHref?: string;
}

export function PersistentBanner() {
  const { t } = useTranslation();
  const isOrgAdmin = useIsOrgAdmin();
  const reviewStatus = useOrganizationReviewStatus();
  const organization = useAuthStore((s) => s.organization);

  const banners: Banner[] = [];

  // Organization pending approval
  if (isOrgAdmin && reviewStatus === 'pending') {
    banners.push({
      id: 'org-pending',
      variant: 'warning',
      messageKey: 'banners.orgPending',
    });
  }

  // Organization info requested
  if (isOrgAdmin && reviewStatus === 'info_requested') {
    banners.push({
      id: 'org-info-requested',
      variant: 'warning',
      messageKey: 'banners.orgInfoRequested',
      actionKey: 'banners.viewRequest',
      actionHref: '/organization/settings',
    });
  }

  // Organization not public
  if (isOrgAdmin && reviewStatus === 'approved' && organization && !organization.is_public) {
    banners.push({
      id: 'org-not-public',
      variant: 'info',
      messageKey: 'banners.orgNotPublic',
      actionKey: 'banners.enableVisibility',
      actionHref: '/organization/settings',
    });
  }

  if (banners.length === 0) return null;

  const variantStyles: Record<BannerVariant, string> = {
    warning:
      'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200',
    info: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200',
    error:
      'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200',
  };

  const variantIcons: Record<BannerVariant, typeof AlertTriangle> = {
    warning: AlertTriangle,
    info: Info,
    error: AlertTriangle,
  };

  return (
    <div className="space-y-2 mb-4">
      {banners.map((banner) => {
        const Icon = variantIcons[banner.variant];
        return (
          <div
            key={banner.id}
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-lg border',
              variantStyles[banner.variant]
            )}
          >
            <Icon size={18} className="flex-shrink-0" />
            <p className="flex-1 text-sm">{t(banner.messageKey)}</p>
            {banner.actionKey && banner.actionHref && (
              <Link
                to={banner.actionHref}
                className="text-sm font-medium underline hover:no-underline"
              >
                {t(banner.actionKey)}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}
