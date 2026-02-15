import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PageContainer } from '@/components/layout/PageContainer';
import { GlassCard } from '@/components/glass/GlassCard';
import { DataTable, type Column } from '@/components/data/DataTable';
import { Badge } from '@/components/data/Badge';
import { useOrganizationDonations } from '@/api/hooks/useOrganization';
import { formatCurrency, formatDate } from '@/lib/utils';
import type { DonationListItem } from '@/api/types';

const statusVariant: Record<string, 'default' | 'success' | 'warning' | 'error'> = {
  completed: 'success',
  pending: 'warning',
  processing: 'warning',
  failed: 'error',
  refunded: 'default',
};

export function OrganizationDonations() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string | undefined>();

  const { data, isLoading } = useOrganizationDonations({
    page,
    pageSize: 20,
    status: statusFilter,
  });

  const columns: Column<DonationListItem>[] = [
    {
      key: 'donor',
      header: t('org.donations.donor'),
      cell: (item) => (
        <div>
          <p className="font-medium">
            {item.donor_display_preference === 'private'
              ? t('org.donations.anonymous')
              : `${item.donor_first_name} ${item.donor_last_name}`}
          </p>
          <p className="text-xs text-[var(--text-muted)]">{item.donor_email}</p>
        </div>
      ),
    },
    {
      key: 'amount',
      header: t('org.donations.amount'),
      cell: (item) => (
        <div>
          <p className="font-semibold text-amply-teal">
            {formatCurrency(item.net_amount / 100, item.currency)}
          </p>
          {item.fee_amount > 0 && (
            <p className="text-xs text-[var(--text-muted)]">
              {t('org.donations.fee')}: {formatCurrency(item.fee_amount / 100, item.currency)}
            </p>
          )}
        </div>
      ),
      className: 'text-right',
    },
    {
      key: 'fund',
      header: t('org.donations.fund'),
      cell: (item) => item.fund_name || '-',
    },
    {
      key: 'status',
      header: t('org.donations.status'),
      cell: (item) => (
        <Badge variant={statusVariant[item.status] || 'default'}>
          {t(`org.donations.statuses.${item.status}`)}
        </Badge>
      ),
    },
    {
      key: 'date',
      header: t('org.donations.date'),
      cell: (item) =>
        item.completed_at
          ? formatDate(new Date(item.completed_at))
          : formatDate(new Date(item.created_at)),
    },
  ];

  const filterStatuses = ['all', 'completed', 'pending', 'refunded'];

  return (
    <PageContainer title={t('org.donations.title')}>
      {/* Filters */}
      <div className="flex gap-2 mb-4">
        {filterStatuses.map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status === 'all' ? undefined : status)}
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
              (status === 'all' && !statusFilter) || statusFilter === status
                ? 'bg-amply-teal text-white'
                : 'bg-[var(--surface-secondary)] text-[var(--text-secondary)] hover:bg-[var(--surface-primary)]'
            }`}
          >
            {t(`org.donations.filters.${status}`)}
          </button>
        ))}
      </div>

      <GlassCard padding="none">
        <DataTable
          columns={columns}
          data={data?.items ?? []}
          isLoading={isLoading}
          emptyMessage={t('org.donations.empty')}
          page={page}
          pageSize={20}
          total={data?.total ?? 0}
          onPageChange={setPage}
        />
      </GlassCard>
    </PageContainer>
  );
}
