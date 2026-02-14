import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { GlassCard, CardHeader } from '@/components/glass/GlassCard';
import { Button } from '@/components/ui/Button';
import { Input, Label, Textarea } from '@/components/ui/Input';
import { useCampaign, useCampaignMutations } from '@/api/hooks/useCampaigns';
import { useOrganizationFunds } from '@/api/hooks/useOrganization';
import type { CampaignCreate, CampaignUpdate, CampaignType } from '@/api/types';

const campaignTypes: CampaignType[] = ['project', 'fundraiser', 'emergency', 'recurring'];

export function CampaignForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { campaignId } = useParams<{ campaignId: string }>();
  const isEdit = !!campaignId;

  const { data: existingCampaign, isLoading: campaignLoading } = useCampaign(campaignId || '');
  const { funds } = useOrganizationFunds();
  const { create, update, isCreating, isUpdating } = useCampaignMutations();

  const [form, setForm] = useState<Partial<CampaignCreate>>({
    title: '',
    type: 'project',
    short_description: '',
    story: '',
    goal_amount: 0,
    currency: 'EUR',
    is_public: true,
  });
  const [error, setError] = useState<string | null>(null);

  // Load existing campaign data for edit mode
  useEffect(() => {
    if (existingCampaign) {
      setForm({
        title: existingCampaign.title,
        type: existingCampaign.type as CampaignType,
        short_description: existingCampaign.short_description || '',
        story: existingCampaign.story || '',
        goal_amount: existingCampaign.goal_amount,
        currency: existingCampaign.currency,
        cover_image_url: existingCampaign.cover_image_url || '',
        video_url: existingCampaign.video_url || '',
        starts_at: existingCampaign.starts_at || '',
        ends_at: existingCampaign.ends_at || '',
        is_public: existingCampaign.is_public,
        fund_id: existingCampaign.fund_id || undefined,
      });
    }
  }, [existingCampaign]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.title?.trim()) {
      setError('Title is required');
      return;
    }

    // Validate date range
    if (form.starts_at && form.ends_at) {
      const start = new Date(form.starts_at);
      const end = new Date(form.ends_at);
      if (start >= end) {
        setError('Start date must be before end date');
        return;
      }
    }

    try {
      if (isEdit && campaignId) {
        const updateData: CampaignUpdate = {
          title: form.title,
          short_description: form.short_description || undefined,
          story: form.story || undefined,
          goal_amount: form.goal_amount,
          cover_image_url: form.cover_image_url || undefined,
          video_url: form.video_url || undefined,
          starts_at: form.starts_at || undefined,
          ends_at: form.ends_at || undefined,
          is_public: form.is_public,
        };
        await update({ id: campaignId, data: updateData });
      } else {
        const createData: CampaignCreate = {
          title: form.title!,
          type: form.type as CampaignType,
          short_description: form.short_description || undefined,
          story: form.story || undefined,
          goal_amount: form.goal_amount || 0,
          currency: form.currency || 'EUR',
          cover_image_url: form.cover_image_url || undefined,
          video_url: form.video_url || undefined,
          starts_at: form.starts_at || undefined,
          ends_at: form.ends_at || undefined,
          is_public: form.is_public ?? true,
          fund_id: form.fund_id || undefined,
        };
        await create(createData);
      }
      navigate('/campaigns');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save campaign');
    }
  };

  const isLoading = isCreating || isUpdating;

  const handleCancel = async () => {
    if (!campaignId) return;
    if (!confirm(t('campaigns.form.confirmCancel'))) return;
    try {
      await update({ id: campaignId, data: { status: 'cancelled' } });
      navigate('/campaigns');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to cancel campaign');
    }
  };

  if (isEdit && campaignLoading) {
    return (
      <PageContainer title={t('campaigns.form.loading')}>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amply-teal" />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      title={isEdit ? t('campaigns.form.editTitle') : t('campaigns.form.createTitle')}
      action={
        <Button variant="secondary" onClick={() => navigate('/campaigns')}>
          <ArrowLeft size={16} className="mr-2" />
          {t('common.back')}
        </Button>
      }
    >
      <form onSubmit={handleSubmit}>
        <GlassCard className="max-w-2xl">
          <CardHeader title={t('campaigns.form.details')} />

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
              {error}
            </div>
          )}

          <div className="space-y-4 mt-4">
            {/* Title */}
            <div>
              <Label className="mb-2 block">{t('campaigns.form.title')} *</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder={t('campaigns.form.titlePlaceholder')}
                required
              />
            </div>

            {/* Type (only for create) */}
            {!isEdit && (
              <div>
                <Label className="mb-2 block">{t('campaigns.form.type')}</Label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value as CampaignType })}
                  className="w-full px-3 py-2 rounded-lg bg-[var(--surface-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-amply-teal"
                >
                  {campaignTypes.map((type) => (
                    <option key={type} value={type}>
                      {t(`campaigns.types.${type}`)}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Short Description */}
            <div>
              <Label className="mb-2 block">{t('campaigns.form.description')}</Label>
              <Textarea
                value={form.short_description}
                onChange={(e) => setForm({ ...form, short_description: e.target.value })}
                placeholder={t('campaigns.form.descriptionPlaceholder')}
                rows={3}
                maxLength={500}
              />
              <p className="text-xs text-[var(--text-muted)] mt-1">
                {form.short_description?.length || 0}/500
              </p>
            </div>

            {/* Story */}
            <div>
              <Label className="mb-2 block">{t('campaigns.form.story')}</Label>
              <Textarea
                value={form.story}
                onChange={(e) => setForm({ ...form, story: e.target.value })}
                placeholder={t('campaigns.form.storyPlaceholder')}
                rows={6}
              />
            </div>

            {/* Goal Amount */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="mb-2 block">{t('campaigns.form.goalAmount')}</Label>
                <Input
                  type="number"
                  min="0"
                  step="100"
                  value={(form.goal_amount || 0) / 100}
                  onChange={(e) => setForm({ ...form, goal_amount: Math.round(parseFloat(e.target.value) * 100) || 0 })}
                  placeholder="1000"
                />
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  {t('campaigns.form.amountInCurrency', { currency: form.currency || 'EUR' })}
                </p>
              </div>
              <div>
                <Label className="mb-2 block">{t('campaigns.form.currency')}</Label>
                <select
                  value={form.currency}
                  onChange={(e) => setForm({ ...form, currency: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[var(--surface-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-amply-teal"
                >
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                  <option value="GBP">GBP</option>
                  <option value="CHF">CHF</option>
                </select>
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="mb-2 block">{t('campaigns.form.startDate')}</Label>
                <Input
                  type="datetime-local"
                  value={form.starts_at?.slice(0, 16) || ''}
                  onChange={(e) => setForm({ ...form, starts_at: e.target.value ? new Date(e.target.value).toISOString() : undefined })}
                />
              </div>
              <div>
                <Label className="mb-2 block">{t('campaigns.form.endDate')}</Label>
                <Input
                  type="datetime-local"
                  value={form.ends_at?.slice(0, 16) || ''}
                  onChange={(e) => setForm({ ...form, ends_at: e.target.value ? new Date(e.target.value).toISOString() : undefined })}
                />
              </div>
            </div>

            {/* Media */}
            <div>
              <Label className="mb-2 block">{t('campaigns.form.coverImage')}</Label>
              <Input
                type="url"
                value={form.cover_image_url || ''}
                onChange={(e) => setForm({ ...form, cover_image_url: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <Label className="mb-2 block">{t('campaigns.form.videoUrl')}</Label>
              <Input
                type="url"
                value={form.video_url || ''}
                onChange={(e) => setForm({ ...form, video_url: e.target.value })}
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>

            {/* Fund (only for create) */}
            {!isEdit && funds.length > 0 && (
              <div>
                <Label className="mb-2 block">{t('campaigns.form.fund')}</Label>
                <select
                  value={form.fund_id || ''}
                  onChange={(e) => setForm({ ...form, fund_id: e.target.value || undefined })}
                  className="w-full px-3 py-2 rounded-lg bg-[var(--surface-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-amply-teal"
                >
                  <option value="">{t('campaigns.form.selectFund')}</option>
                  {funds.map((fund) => (
                    <option key={fund.id} value={fund.id}>
                      {fund.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Public */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="is_public"
                checked={form.is_public}
                onChange={(e) => setForm({ ...form, is_public: e.target.checked })}
                className="w-4 h-4 rounded border-[var(--border-subtle)] bg-[var(--surface-secondary)] text-amply-teal focus:ring-amply-teal"
              />
              <Label htmlFor="is_public">{t('campaigns.form.isPublic')}</Label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6 pt-4 border-t border-[var(--border-subtle)]">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/campaigns')}
            >
              {t('common.cancel')}
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isLoading}
            >
              {isLoading ? t('common.loading') : isEdit ? t('common.save') : t('campaigns.create')}
            </Button>
            {isEdit && existingCampaign?.status !== 'cancelled' && (
              <Button
                type="button"
                variant="ghost"
                onClick={handleCancel}
                disabled={isUpdating}
                className="ml-auto text-red-500 hover:text-red-400 hover:bg-red-500/10"
              >
                {t('campaigns.form.cancelCampaign')}
              </Button>
            )}
          </div>
        </GlassCard>
      </form>
    </PageContainer>
  );
}
