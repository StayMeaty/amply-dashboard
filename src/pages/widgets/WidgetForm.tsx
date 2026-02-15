import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { GlassCard, CardHeader } from '@/components/glass/GlassCard';
import { Button } from '@/components/ui/Button';
import { Input, Label, Textarea } from '@/components/ui/Input';
import { useWidget, useWidgetMutations } from '@/api/hooks/useWidgets';
import { useOrganizationFunds } from '@/api/hooks/useOrganization';
import { useCampaigns } from '@/api/hooks/useCampaigns';
import type { WidgetCreate, WidgetUpdate, WidgetType, WidgetTheme } from '@/api/types';

const widgetTypes: WidgetType[] = [
  'donation_button',
  'donation_form',
  'progress_bar',
  'leaderboard',
  'recent_donations',
];

const themes: WidgetTheme[] = ['auto', 'light', 'dark'];

export function WidgetForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { widgetId } = useParams<{ widgetId: string }>();
  const isEdit = !!widgetId;

  const { data: existingWidget, isLoading: widgetLoading } = useWidget(widgetId || '');
  const { create, isCreating, update, isUpdating } = useWidgetMutations();
  const { funds } = useOrganizationFunds();
  const { data: campaignData } = useCampaigns();

  const [form, setForm] = useState<WidgetCreate>({
    name: '',
    type: 'donation_button',
    theme: 'auto',
    show_goal: true,
    show_donors: true,
    show_recent: true,
  });
  const [error, setError] = useState<string | null>(null);
  const [presetAmountsInput, setPresetAmountsInput] = useState('');

  // Load existing widget data for edit mode
  useEffect(() => {
    if (existingWidget) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Sync form state from server data on initial load
      setForm({
        name: existingWidget.name,
        type: existingWidget.type as WidgetType,
        theme: existingWidget.theme as WidgetTheme,
        fund_id: existingWidget.fund_id || undefined,
        campaign_id: existingWidget.campaign_id || undefined,
        primary_color: existingWidget.primary_color || undefined,
        button_text: existingWidget.button_text || undefined,
        show_goal: existingWidget.show_goal,
        show_donors: existingWidget.show_donors,
        show_recent: existingWidget.show_recent,
        custom_css: existingWidget.custom_css || undefined,
      });
      // Convert cents back to display values
      if (existingWidget.preset_amounts?.length) {
        setPresetAmountsInput(existingWidget.preset_amounts.map((v) => v / 100).join(', '));
      }
    }
  }, [existingWidget]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.name?.trim()) {
      setError(t('widgets.form.nameRequired'));
      return;
    }

    try {
      // Parse preset amounts
      const presetAmounts = presetAmountsInput
        .split(',')
        .map((v) => parseInt(v.trim()) * 100)
        .filter((v) => !isNaN(v) && v > 0);

      if (isEdit && widgetId) {
        const updateData: WidgetUpdate = {
          name: form.name,
          theme: form.theme,
          fund_id: form.fund_id || undefined,
          campaign_id: form.campaign_id || undefined,
          primary_color: form.primary_color || undefined,
          button_text: form.button_text || undefined,
          show_goal: form.show_goal,
          show_donors: form.show_donors,
          show_recent: form.show_recent,
          preset_amounts: presetAmounts.length > 0 ? presetAmounts : undefined,
          custom_css: form.custom_css || undefined,
        };
        await update({ id: widgetId, data: updateData });
      } else {
        await create({
          ...form,
          preset_amounts: presetAmounts.length > 0 ? presetAmounts : undefined,
        });
      }
      navigate('/widgets');
    } catch (err) {
      setError(err instanceof Error ? err.message : t('widgets.form.error'));
    }
  };

  if (isEdit && widgetLoading) {
    return (
      <PageContainer title={t('widgets.editWidget')}>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amply-teal" />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      title={isEdit ? t('widgets.editWidget') : t('widgets.createNew')}
      action={
        <Button variant="secondary" onClick={() => navigate('/widgets')}>
          <ArrowLeft size={16} className="mr-2" />
          {t('common.back')}
        </Button>
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-2 max-w-4xl">
          {/* Basic Info */}
          <GlassCard>
            <CardHeader title={t('widgets.form.basicInfo')} />

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
                {error}
              </div>
            )}

            <div className="space-y-4 mt-4">
              <div>
                <Label className="mb-2 block">{t('widgets.form.name')} *</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder={t('widgets.form.namePlaceholder')}
                  required
                />
              </div>

              <div>
                <Label className="mb-2 block">{t('widgets.form.type')}</Label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value as WidgetType })}
                  className="w-full px-3 py-2 rounded-lg bg-[var(--surface-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-amply-teal"
                >
                  {widgetTypes.map((type) => (
                    <option key={type} value={type}>
                      {t(`widgets.types.${type}`)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label className="mb-2 block">{t('widgets.form.theme')}</Label>
                <select
                  value={form.theme}
                  onChange={(e) => setForm({ ...form, theme: e.target.value as WidgetTheme })}
                  className="w-full px-3 py-2 rounded-lg bg-[var(--surface-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-amply-teal"
                >
                  {themes.map((theme) => (
                    <option key={theme} value={theme}>
                      {t(`widgets.themes.${theme}`)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label className="mb-2 block">{t('widgets.form.buttonText')}</Label>
                <Input
                  value={form.button_text || ''}
                  onChange={(e) => setForm({ ...form, button_text: e.target.value })}
                  placeholder="Donate Now"
                />
              </div>
            </div>
          </GlassCard>

          {/* Targeting */}
          <GlassCard>
            <CardHeader title={t('widgets.form.targeting')} />

            <div className="space-y-4 mt-4">
              {funds.length > 0 && (
                <div>
                  <Label className="mb-2 block">{t('widgets.form.fund')}</Label>
                  <select
                    value={form.fund_id || ''}
                    onChange={(e) => setForm({ ...form, fund_id: e.target.value || undefined })}
                    className="w-full px-3 py-2 rounded-lg bg-[var(--surface-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-amply-teal"
                  >
                    <option value="">{t('widgets.form.allFunds')}</option>
                    {funds.map((fund) => (
                      <option key={fund.id} value={fund.id}>
                        {fund.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {campaignData?.items && campaignData.items.length > 0 && (
                <div>
                  <Label className="mb-2 block">{t('widgets.form.campaign')}</Label>
                  <select
                    value={form.campaign_id || ''}
                    onChange={(e) => setForm({ ...form, campaign_id: e.target.value || undefined })}
                    className="w-full px-3 py-2 rounded-lg bg-[var(--surface-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-amply-teal"
                  >
                    <option value="">{t('widgets.form.noCampaign')}</option>
                    {campaignData.items.map((campaign) => (
                      <option key={campaign.id} value={campaign.id}>
                        {campaign.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="space-y-2 pt-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.show_goal}
                    onChange={(e) => setForm({ ...form, show_goal: e.target.checked })}
                    className="w-4 h-4 rounded border-[var(--border-subtle)] bg-[var(--surface-secondary)] text-amply-teal focus:ring-amply-teal"
                  />
                  <span className="text-sm">{t('widgets.form.showGoal')}</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.show_donors}
                    onChange={(e) => setForm({ ...form, show_donors: e.target.checked })}
                    className="w-4 h-4 rounded border-[var(--border-subtle)] bg-[var(--surface-secondary)] text-amply-teal focus:ring-amply-teal"
                  />
                  <span className="text-sm">{t('widgets.form.showDonors')}</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.show_recent}
                    onChange={(e) => setForm({ ...form, show_recent: e.target.checked })}
                    className="w-4 h-4 rounded border-[var(--border-subtle)] bg-[var(--surface-secondary)] text-amply-teal focus:ring-amply-teal"
                  />
                  <span className="text-sm">{t('widgets.form.showRecent')}</span>
                </label>
              </div>
            </div>
          </GlassCard>

          {/* Customization */}
          <GlassCard className="lg:col-span-2">
            <CardHeader title={t('widgets.form.customization')} />

            <div className="grid gap-4 sm:grid-cols-2 mt-4">
              <div>
                <Label className="mb-2 block">{t('widgets.form.primaryColor')}</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={form.primary_color || '#05668D'}
                    onChange={(e) => setForm({ ...form, primary_color: e.target.value })}
                    className="h-10 w-16 p-1"
                  />
                  <Input
                    value={form.primary_color || '#05668D'}
                    onChange={(e) => setForm({ ...form, primary_color: e.target.value })}
                    placeholder="#05668D"
                    className="flex-1"
                  />
                </div>
              </div>

              <div>
                <Label className="mb-2 block">{t('widgets.form.presetAmounts')}</Label>
                <Input
                  value={presetAmountsInput}
                  onChange={(e) => setPresetAmountsInput(e.target.value)}
                  placeholder="10, 25, 50, 100"
                />
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  {t('widgets.form.presetAmountsHelp')}
                </p>
              </div>

              <div className="sm:col-span-2">
                <Label className="mb-2 block">{t('widgets.form.customCss')}</Label>
                <Textarea
                  value={form.custom_css || ''}
                  onChange={(e) => setForm({ ...form, custom_css: e.target.value })}
                  placeholder=".amply-widget { /* custom styles */ }"
                  rows={4}
                  className="font-mono text-sm"
                />
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <Button type="button" variant="secondary" onClick={() => navigate('/widgets')}>
            {t('common.cancel')}
          </Button>
          <Button type="submit" variant="primary" disabled={isCreating || isUpdating || !form.name}>
            {(isCreating || isUpdating) ? t('common.loading') : isEdit ? t('common.save') : t('widgets.form.create')}
          </Button>
        </div>
      </form>
    </PageContainer>
  );
}
