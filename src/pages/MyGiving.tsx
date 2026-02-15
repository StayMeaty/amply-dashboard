import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Heart, Building2, Receipt, Calendar } from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { GlassCard, CardHeader } from '@/components/glass/GlassCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/data/Badge';
import { useGivingHistory, useGivingSummary } from '@/api/hooks/useGiving';
import { formatCurrency } from '@/lib/utils';
import type { GivingHistoryItem } from '@/api/types';

const statusColors: Record<string, 'info' | 'success' | 'warning' | 'error' | 'default'> = {
  completed: 'success',
  pending: 'warning',
  processing: 'info',
  failed: 'error',
  refunded: 'default',
};

export function MyGiving() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);

  const { data: historyData, isLoading: historyLoading } = useGivingHistory({
    page,
    status: statusFilter,
  });
  const { data: summary, isLoading: summaryLoading } = useGivingSummary();

  const donations = historyData?.items ?? [];
  const hasMore = historyData?.has_more ?? false;

  return (
    <PageContainer title={t('giving.title')}>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <GlassCard>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amply-teal/10">
              <Heart size={24} className="text-amply-teal" />
            </div>
            <div>
              <p className="text-sm text-[var(--text-muted)]">{t('giving.totalDonated')}</p>
              <p className="text-xl font-semibold text-[var(--text-primary)]">
                {summaryLoading ? '...' : formatCurrency((summary?.total_donated ?? 0) / 100, summary?.currency ?? 'EUR')}
              </p>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amply-coral/10">
              <Receipt size={24} className="text-amply-coral" />
            </div>
            <div>
              <p className="text-sm text-[var(--text-muted)]">{t('giving.totalDonations')}</p>
              <p className="text-xl font-semibold text-[var(--text-primary)]">
                {summaryLoading ? '...' : summary?.total_donations ?? 0}
              </p>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/10">
              <Building2 size={24} className="text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-[var(--text-muted)]">{t('giving.organizationsSupported')}</p>
              <p className="text-xl font-semibold text-[var(--text-primary)]">
                {summaryLoading ? '...' : summary?.total_organizations ?? 0}
              </p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* History Section */}
      <GlassCard>
        <CardHeader title={t('giving.history')} />

        {/* Status Filters */}
        <div className="flex gap-2 mb-4 flex-wrap">
          <Button
            variant={statusFilter === undefined ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => { setStatusFilter(undefined); setPage(1); }}
          >
            {t('giving.filters.all')}
          </Button>
          {(['completed', 'pending', 'refunded'] as const).map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => { setStatusFilter(status); setPage(1); }}
            >
              {t(`giving.statuses.${status}`)}
            </Button>
          ))}
        </div>

        {/* Donations List */}
        {historyLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amply-teal" />
          </div>
        ) : donations.length === 0 ? (
          <div className="text-center py-12">
            <Heart size={48} className="mx-auto mb-4 text-[var(--text-muted)]" />
            <p className="text-[var(--text-muted)]">{t('giving.empty')}</p>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {donations.map((donation) => (
                <DonationRow key={donation.id} donation={donation} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-6">
              <Button
                variant="secondary"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                {t('common.back')}
              </Button>
              <Button
                variant="secondary"
                size="sm"
                disabled={!hasMore}
                onClick={() => setPage(page + 1)}
              >
                {t('common.continue')}
              </Button>
            </div>
          </>
        )}
      </GlassCard>
    </PageContainer>
  );
}

function DonationRow({ donation }: { donation: GivingHistoryItem }) {
  const { t } = useTranslation();

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--surface-secondary)] hover:bg-[var(--surface-hover)] transition-colors">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium text-[var(--text-primary)] truncate">
            {donation.organization_name}
          </span>
          <Badge variant={statusColors[donation.status] ?? 'default'}>
            {t(`giving.statuses.${donation.status}`)}
          </Badge>
        </div>
        <div className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
          {donation.fund_name && <span>{donation.fund_name}</span>}
          {donation.campaign_title && <span>{donation.campaign_title}</span>}
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {formatDate(donation.created_at)}
          </span>
        </div>
      </div>

      <div className="text-right">
        <p className="font-semibold text-[var(--text-primary)]">
          {formatCurrency(donation.amount / 100, donation.currency)}
        </p>
        {donation.receipt_number && (
          <p className="text-xs text-[var(--text-muted)]">
            {t('giving.receipt')}: {donation.receipt_number}
          </p>
        )}
      </div>
    </div>
  );
}
