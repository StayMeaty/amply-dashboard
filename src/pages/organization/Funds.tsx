import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Edit2, Wallet } from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { GlassCard, CardHeader } from '@/components/glass/GlassCard';
import { Button } from '@/components/ui/Button';
import { Input, Label } from '@/components/ui/Input';
import { Badge } from '@/components/data/Badge';
import { useOrganizationFunds } from '@/api/hooks/useOrganization';
import { formatCurrency } from '@/lib/utils';
import type { Fund, FundCreate } from '@/api/types';

export function OrganizationFunds() {
  const { t } = useTranslation();
  const { funds, isLoading, create, isCreating } = useOrganizationFunds();
  const [showCreate, setShowCreate] = useState(false);
  const [newFund, setNewFund] = useState<Partial<FundCreate>>({ name: '' });

  const handleCreate = async () => {
    if (!newFund.name) return;
    try {
      await create({ name: newFund.name, description: newFund.description });
      setNewFund({ name: '' });
      setShowCreate(false);
    } catch {
      // Error handling done by hook
    }
  };

  return (
    <PageContainer
      title={t('org.funds.title')}
      action={
        <Button variant="primary" onClick={() => setShowCreate(true)}>
          <Plus size={16} className="mr-2" />
          {t('org.funds.create')}
        </Button>
      }
    >
      {/* Create Fund Form */}
      {showCreate && (
        <GlassCard className="mb-6">
          <CardHeader title={t('org.funds.createNew')} />
          <div className="space-y-4 mt-4">
            <div>
              <Label className="mb-2 block">{t('org.funds.name')}</Label>
              <Input
                value={newFund.name}
                onChange={(e) => setNewFund({ ...newFund, name: e.target.value })}
                placeholder={t('org.funds.namePlaceholder')}
              />
            </div>
            <div>
              <Label className="mb-2 block">{t('org.funds.description')}</Label>
              <Input
                value={newFund.description || ''}
                onChange={(e) =>
                  setNewFund({ ...newFund, description: e.target.value })
                }
                placeholder={t('org.funds.descriptionPlaceholder')}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => setShowCreate(false)}>
                {t('common.cancel')}
              </Button>
              <Button
                variant="primary"
                onClick={handleCreate}
                disabled={!newFund.name || isCreating}
              >
                {isCreating ? t('common.loading') : t('org.funds.create')}
              </Button>
            </div>
          </div>
        </GlassCard>
      )}

      {/* Funds List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amply-teal" />
        </div>
      ) : funds.length === 0 ? (
        <GlassCard className="text-center py-12">
          <Wallet size={48} className="mx-auto mb-4 text-[var(--text-muted)]" />
          <p className="text-[var(--text-muted)] mb-4">{t('org.funds.empty')}</p>
          <Button variant="primary" onClick={() => setShowCreate(true)}>
            {t('org.funds.createFirst')}
          </Button>
        </GlassCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {funds.map((fund) => (
            <FundCard key={fund.id} fund={fund} />
          ))}
        </div>
      )}
    </PageContainer>
  );
}

function FundCard({ fund }: { fund: Fund }) {
  const { t } = useTranslation();
  const progress = fund.goal_amount
    ? Math.min((fund.current_amount / fund.goal_amount) * 100, 100)
    : null;

  return (
    <GlassCard>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-[var(--text-primary)]">{fund.name}</h3>
          {fund.is_default && (
            <Badge variant="info">{t('org.funds.default')}</Badge>
          )}
          {!fund.is_active && (
            <Badge variant="warning">{t('org.funds.inactive')}</Badge>
          )}
        </div>
        <Button variant="ghost" size="icon">
          <Edit2 size={16} />
        </Button>
      </div>

      {fund.description && (
        <p className="text-sm text-[var(--text-muted)] mb-4">{fund.description}</p>
      )}

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-[var(--text-muted)]">{t('org.funds.balance')}</span>
          <span className="font-semibold text-[var(--text-primary)]">
            {formatCurrency(fund.current_amount / 100, fund.currency)}
          </span>
        </div>

        {fund.goal_amount && progress !== null && (
          <>
            <div className="flex justify-between text-sm">
              <span className="text-[var(--text-muted)]">{t('org.funds.goal')}</span>
              <span className="text-[var(--text-secondary)]">
                {formatCurrency(fund.goal_amount / 100, fund.currency)}
              </span>
            </div>
            <div className="h-2 bg-[var(--surface-secondary)] rounded-full overflow-hidden">
              <div
                className="h-full bg-amply-teal rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-[var(--text-muted)] text-right">
              {progress.toFixed(0)}% {t('org.funds.ofGoal')}
            </p>
          </>
        )}
      </div>
    </GlassCard>
  );
}
