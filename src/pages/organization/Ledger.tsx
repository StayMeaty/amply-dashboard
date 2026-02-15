import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, ArrowDownLeft, RefreshCw, Sparkles } from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { GlassCard } from '@/components/glass/GlassCard';
import { DataTable, type Column } from '@/components/data/DataTable';
import { useOrganizationLedger } from '@/api/hooks/useOrganization';
import { formatCurrency, formatDate } from '@/lib/utils';
import type { LedgerEntry } from '@/api/types';

const entryTypeIcon: Record<string, typeof ArrowUpRight> = {
  donation_received: ArrowDownLeft,
  refund_issued: ArrowUpRight,
  adjustment: RefreshCw,
  genesis: Sparkles,
};

const entryTypeColor: Record<string, string> = {
  donation_received: 'text-green-500',
  refund_issued: 'text-red-500',
  adjustment: 'text-amber-500',
  genesis: 'text-blue-500',
};

export function OrganizationLedger() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);

  const { data, isLoading } = useOrganizationLedger({ page, pageSize: 50 });

  const columns: Column<LedgerEntry>[] = [
    {
      key: 'seq',
      header: '#',
      cell: (item) => (
        <span className="text-[var(--text-muted)] font-mono text-xs">
          {item.sequence_number}
        </span>
      ),
      className: 'w-16',
    },
    {
      key: 'type',
      header: t('org.ledger.type'),
      cell: (item) => {
        const Icon = entryTypeIcon[item.entry_type] || RefreshCw;
        const color = entryTypeColor[item.entry_type] || 'text-[var(--text-muted)]';
        return (
          <div className="flex items-center gap-2">
            <Icon size={16} className={color} />
            <span>{t(`org.ledger.types.${item.entry_type}`)}</span>
          </div>
        );
      },
    },
    {
      key: 'amount',
      header: t('org.ledger.amount'),
      cell: (item) => {
        const isNegative = ['refund_issued'].includes(item.entry_type);
        return (
          <span className={isNegative ? 'text-red-500' : 'text-green-500'}>
            {isNegative ? '-' : '+'}
            {formatCurrency(Math.abs(item.amount) / 100, item.currency)}
          </span>
        );
      },
      className: 'text-right font-mono',
    },
    {
      key: 'fund',
      header: t('org.ledger.fund'),
      cell: (item) => item.fund_name,
    },
    {
      key: 'description',
      header: t('org.ledger.description'),
      cell: (item) => (
        <span className="text-[var(--text-muted)]">
          {item.description || '-'}
        </span>
      ),
    },
    {
      key: 'date',
      header: t('org.ledger.date'),
      cell: (item) => formatDate(new Date(item.created_at)),
    },
  ];

  return (
    <PageContainer title={t('org.ledger.title')}>
      <GlassCard padding="none">
        <DataTable
          columns={columns}
          data={data?.items ?? []}
          isLoading={isLoading}
          emptyMessage={t('org.ledger.empty')}
          page={page}
          pageSize={50}
          total={data?.total ?? 0}
          onPageChange={setPage}
        />
      </GlassCard>
    </PageContainer>
  );
}
