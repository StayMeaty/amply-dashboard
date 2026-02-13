import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Save } from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { GlassCard, CardHeader } from '@/components/glass/GlassCard';
import { Button } from '@/components/ui/Button';
import { Input, Textarea, Label, FormMessage } from '@/components/ui/Input';
import { Badge } from '@/components/data/Badge';
import { useOrganization } from '@/api/hooks/useOrganization';
import type { OrganizationUpdate } from '@/api/types';

export function OrganizationSettings() {
  const { t } = useTranslation();
  const { organization, isLoading, update, isUpdating, updateError } =
    useOrganization();

  const [form, setForm] = useState<OrganizationUpdate>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (organization) {
      setForm({
        display_name: organization.display_name || '',
        description: organization.description || '',
        mission_statement: organization.mission_statement || '',
        website_url: organization.website_url || '',
        contact_email: organization.contact_email || '',
        address_line_1: organization.address_line_1 || '',
        address_line_2: organization.address_line_2 || '',
        city: organization.city || '',
        state_province_region: organization.state_province_region || '',
        postal_code: organization.postal_code || '',
      });
    }
  }, [organization]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await update(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      // Error handled by hook
    }
  };

  const updateField = (field: keyof OrganizationUpdate, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  if (isLoading) {
    return (
      <PageContainer title={t('org.settings.title')}>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amply-teal" />
        </div>
      </PageContainer>
    );
  }

  if (!organization) {
    return (
      <PageContainer title={t('org.settings.title')}>
        <GlassCard className="text-center py-12">
          <p className="text-[var(--text-muted)]">{t('org.settings.noOrg')}</p>
        </GlassCard>
      </PageContainer>
    );
  }

  return (
    <PageContainer title={t('org.settings.title')}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Status Banner */}
        <GlassCard variant="secondary" padding="md">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-[var(--text-primary)]">
                {organization.name}
              </h3>
              <p className="text-sm text-[var(--text-muted)]">
                {t('org.settings.slug')}: {organization.slug}
              </p>
            </div>
            <div className="flex gap-2">
              <Badge
                variant={
                  organization.verification_status === 'verified'
                    ? 'success'
                    : 'warning'
                }
              >
                {t(`org.settings.verification.${organization.verification_status}`)}
              </Badge>
              {organization.can_receive_donations ? (
                <Badge variant="success">{t('org.settings.canReceive')}</Badge>
              ) : (
                <Badge variant="error">{t('org.settings.cannotReceive')}</Badge>
              )}
            </div>
          </div>
        </GlassCard>

        {/* Basic Info */}
        <GlassCard>
          <CardHeader
            title={t('org.settings.basicInfo')}
            description={t('org.settings.basicInfoDesc')}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <Label className="mb-2 block">{t('org.settings.displayName')}</Label>
              <Input
                value={form.display_name || ''}
                onChange={(e) => updateField('display_name', e.target.value)}
                placeholder={organization.name}
              />
            </div>
            <div>
              <Label className="mb-2 block">{t('org.settings.contactEmail')}</Label>
              <Input
                type="email"
                value={form.contact_email || ''}
                onChange={(e) => updateField('contact_email', e.target.value)}
              />
            </div>
            <div>
              <Label className="mb-2 block">{t('org.settings.website')}</Label>
              <Input
                type="url"
                value={form.website_url || ''}
                onChange={(e) => updateField('website_url', e.target.value)}
                placeholder="https://"
              />
            </div>
          </div>
          <div className="mt-4">
            <Label className="mb-2 block">{t('org.settings.description')}</Label>
            <Textarea
              value={form.description || ''}
              onChange={(e) => updateField('description', e.target.value)}
              rows={3}
            />
          </div>
          <div className="mt-4">
            <Label className="mb-2 block">{t('org.settings.missionStatement')}</Label>
            <Textarea
              value={form.mission_statement || ''}
              onChange={(e) => updateField('mission_statement', e.target.value)}
              rows={2}
            />
          </div>
        </GlassCard>

        {/* Address */}
        <GlassCard>
          <CardHeader
            title={t('org.settings.address')}
            description={t('org.settings.addressDesc')}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="md:col-span-2">
              <Label className="mb-2 block">{t('org.settings.addressLine1')}</Label>
              <Input
                value={form.address_line_1 || ''}
                onChange={(e) => updateField('address_line_1', e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <Label className="mb-2 block">{t('org.settings.addressLine2')}</Label>
              <Input
                value={form.address_line_2 || ''}
                onChange={(e) => updateField('address_line_2', e.target.value)}
              />
            </div>
            <div>
              <Label className="mb-2 block">{t('org.settings.city')}</Label>
              <Input
                value={form.city || ''}
                onChange={(e) => updateField('city', e.target.value)}
              />
            </div>
            <div>
              <Label className="mb-2 block">{t('org.settings.stateRegion')}</Label>
              <Input
                value={form.state_province_region || ''}
                onChange={(e) => updateField('state_province_region', e.target.value)}
              />
            </div>
            <div>
              <Label className="mb-2 block">{t('org.settings.postalCode')}</Label>
              <Input
                value={form.postal_code || ''}
                onChange={(e) => updateField('postal_code', e.target.value)}
              />
            </div>
          </div>
        </GlassCard>

        {/* Save Button */}
        <div className="flex items-center gap-4">
          <Button type="submit" variant="primary" disabled={isUpdating}>
            <Save size={16} className="mr-2" />
            {isUpdating ? t('common.loading') : t('common.save')}
          </Button>
          {saved && (
            <span className="text-sm text-success">{t('org.settings.saved')}</span>
          )}
          {updateError && (
            <FormMessage error>
              {updateError instanceof Error ? updateError.message : t('common.error')}
            </FormMessage>
          )}
        </div>
      </form>
    </PageContainer>
  );
}
