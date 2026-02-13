import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Plus, Megaphone, Calendar, Target } from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { GlassCard, CardHeader } from '@/components/glass/GlassCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/data/Badge';
import { useCampaigns } from '@/api/hooks/useCampaigns';
import { formatCurrency } from '@/lib/utils';
import type { Campaign, CampaignStatus } from '@/api/types';

const statusColors: Record<CampaignStatus, 'info' | 'success' | 'warning' | 'error' | 'default'> = {
  draft: 'default',
  active: 'success',
  paused: 'warning',
  completed: 'info',
  cancelled: 'error',
};

export function Campaigns() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const { data, isLoading } = useCampaigns({ status: statusFilter });

  const campaigns = data?.items ?? [];

  return (
    <PageContainer
      title={t('campaigns.title')}
      action={
        <Button variant="primary" onClick={() => navigate('/campaigns/new')}>
          <Plus size={16} className="mr-2" />
          {t('campaigns.create')}
        </Button>
      }
    >
      {/* Status Filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <Button
          variant={statusFilter === undefined ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setStatusFilter(undefined)}
        >
          {t('campaigns.filters.all')}
        </Button>
        {(['draft', 'active', 'paused', 'completed'] as const).map((status) => (
          <Button
            key={status}
            variant={statusFilter === status ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setStatusFilter(status)}
          >
            {t(`campaigns.statuses.${status}`)}
          </Button>
        ))}
      </div>

      {/* Campaigns List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amply-teal" />
        </div>
      ) : campaigns.length === 0 ? (
        <GlassCard className="text-center py-12">
          <Megaphone size={48} className="mx-auto mb-4 text-[var(--text-muted)]" />
          <p className="text-[var(--text-muted)] mb-4">{t('campaigns.empty')}</p>
          <Button variant="primary" onClick={() => navigate('/campaigns/new')}>
            {t('campaigns.createFirst')}
          </Button>
        </GlassCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      )}
    </PageContainer>
  );
}

function CampaignCard({ campaign }: { campaign: Campaign }) {
  const { t } = useTranslation();

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return null;
    return new Date(dateStr).toLocaleDateString();
  };

  return (
    <GlassCard>
      {/* Cover Image */}
      {campaign.cover_image_url && (
        <div className="h-32 -mx-4 -mt-4 mb-4 rounded-t-xl overflow-hidden">
          <img
            src={campaign.cover_image_url}
            alt={campaign.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-[var(--text-primary)] truncate">
            {campaign.title}
          </h3>
          <Badge
            variant={statusColors[campaign.status as CampaignStatus]}
            className="mt-1"
          >
            {t(`campaigns.statuses.${campaign.status}`)}
          </Badge>
        </div>
      </div>

      {/* Description */}
      {campaign.short_description && (
        <p className="text-sm text-[var(--text-muted)] mb-4 line-clamp-2">
          {campaign.short_description}
        </p>
      )}

      {/* Progress */}
      {campaign.goal_amount > 0 && (
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-[var(--text-muted)] flex items-center gap-1">
              <Target size={14} />
              {t('campaigns.goal')}
            </span>
            <span className="text-[var(--text-secondary)]">
              {formatCurrency(campaign.goal_amount / 100, campaign.currency)}
            </span>
          </div>
          <div className="h-2 bg-[var(--surface-secondary)] rounded-full overflow-hidden">
            <div
              className="h-full bg-amply-teal rounded-full transition-all"
              style={{ width: `${Math.min(campaign.progress_percent, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-[var(--text-muted)]">
            <span>
              {formatCurrency(campaign.current_amount / 100, campaign.currency)} {t('campaigns.raised')}
            </span>
            <span>{campaign.progress_percent.toFixed(0)}%</span>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="flex items-center justify-between text-sm border-t border-[var(--border-subtle)] pt-3">
        <span className="text-[var(--text-muted)]">
          {campaign.donation_count} {t('campaigns.donations')}
        </span>
        {campaign.ends_at && (
          <span className="text-[var(--text-muted)] flex items-center gap-1">
            <Calendar size={14} />
            {formatDate(campaign.ends_at)}
          </span>
        )}
      </div>
    </GlassCard>
  );
}
