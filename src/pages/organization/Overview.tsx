import { useTranslation } from 'react-i18next';
import { Heart, Wallet, TrendingUp, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { GlassCard, CardHeader } from '@/components/glass/GlassCard';
import { Badge } from '@/components/data/Badge';
import { Button } from '@/components/ui/Button';
import { useOrganizationSummary } from '@/api/hooks/useOrganization';
import { formatCurrency, formatRelativeDate } from '@/lib/utils';

export function OrganizationOverview() {
  const { t } = useTranslation();
  const { data: summary, isLoading, error } = useOrganizationSummary();

  if (isLoading) {
    return (
      <PageContainer title={t('org.overview.title')}>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amply-teal" />
        </div>
      </PageContainer>
    );
  }

  if (error || !summary) {
    return (
      <PageContainer title={t('org.overview.title')}>
        <GlassCard className="text-center py-12">
          <p className="text-[var(--text-muted)]">{t('org.overview.noData')}</p>
        </GlassCard>
      </PageContainer>
    );
  }

  const stats = [
    {
      label: t('org.overview.totalDonations'),
      value: formatCurrency(summary.total_amount / 100, summary.currency),
      subtext: `${summary.total_donations} ${t('org.overview.donations')}`,
      icon: Heart,
      color: 'text-amply-coral',
    },
    {
      label: t('org.overview.thisMonth'),
      value: formatCurrency(summary.this_month_amount / 100, summary.currency),
      subtext: `${summary.this_month_count} ${t('org.overview.donations')}`,
      icon: TrendingUp,
      color: 'text-amply-teal',
    },
    {
      label: t('org.overview.pending'),
      value: formatCurrency(summary.pending_amount / 100, summary.currency),
      subtext: t('org.overview.awaitingProcessing'),
      icon: Clock,
      color: 'text-amber-500',
    },
    {
      label: t('org.overview.funds'),
      value: summary.funds.length.toString(),
      subtext: t('org.overview.activeFunds'),
      icon: Wallet,
      color: 'text-blue-500',
    },
  ];

  return (
    <PageContainer title={t('org.overview.title')}>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <GlassCard key={stat.label} padding="md">
            <div className="flex items-start gap-3">
              <div
                className={`p-2 rounded-lg bg-[var(--surface-secondary)] ${stat.color}`}
              >
                <stat.icon size={20} />
              </div>
              <div>
                <p className="text-sm text-[var(--text-muted)]">{stat.label}</p>
                <p className="text-xl font-semibold text-[var(--text-primary)]">
                  {stat.value}
                </p>
                <p className="text-xs text-[var(--text-muted)]">{stat.subtext}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Donations */}
        <GlassCard padding="none">
          <div className="px-5 py-4 border-b border-[var(--border-default)] flex items-center justify-between">
            <CardHeader title={t('org.overview.recentDonations')} />
            <Link to="/organization/donations">
              <Button variant="ghost" size="sm">
                {t('common.viewAll')}
              </Button>
            </Link>
          </div>
          <div className="divide-y divide-[var(--border-default)]">
            {summary.recent_donations.length === 0 ? (
              <p className="p-5 text-sm text-[var(--text-muted)]">
                {t('org.overview.noDonationsYet')}
              </p>
            ) : (
              summary.recent_donations.map((donation) => (
                <div
                  key={donation.id}
                  className="flex items-center justify-between px-5 py-3 hover:bg-[var(--surface-secondary)] transition-colors"
                >
                  <div>
                    <p className="font-medium text-[var(--text-primary)]">
                      {donation.donor_name}
                    </p>
                    <p className="text-sm text-[var(--text-muted)]">
                      {donation.completed_at
                        ? formatRelativeDate(new Date(donation.completed_at))
                        : '-'}
                    </p>
                  </div>
                  <p className="font-semibold text-amply-teal">
                    {formatCurrency(donation.amount / 100, donation.currency)}
                  </p>
                </div>
              ))
            )}
          </div>
        </GlassCard>

        {/* Funds */}
        <GlassCard padding="none">
          <div className="px-5 py-4 border-b border-[var(--border-default)] flex items-center justify-between">
            <CardHeader title={t('org.overview.yourFunds')} />
            <Link to="/organization/funds">
              <Button variant="ghost" size="sm">
                {t('common.manage')}
              </Button>
            </Link>
          </div>
          <div className="divide-y divide-[var(--border-default)]">
            {summary.funds.length === 0 ? (
              <p className="p-5 text-sm text-[var(--text-muted)]">
                {t('org.overview.noFundsYet')}
              </p>
            ) : (
              summary.funds.map((fund) => (
                <div
                  key={fund.id}
                  className="flex items-center justify-between px-5 py-3 hover:bg-[var(--surface-secondary)] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-[var(--text-primary)]">
                      {fund.name}
                    </p>
                    {fund.is_default && (
                      <Badge variant="info">{t('org.funds.default')}</Badge>
                    )}
                  </div>
                  <p className="font-semibold text-[var(--text-primary)]">
                    {formatCurrency(fund.balance / 100, fund.currency)}
                  </p>
                </div>
              ))
            )}
          </div>
        </GlassCard>
      </div>
    </PageContainer>
  );
}
