import { useTranslation } from 'react-i18next';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { FormMessage } from '@/components/ui/Input';
import { cn } from '@/lib/utils';
import type { DonorDisplayPreference } from '@/api/types';

interface PreferencesSlideProps {
  defaultDonationVisibility: DonorDisplayPreference;
  marketingConsent: boolean;
  onChange: (
    field: 'defaultDonationVisibility' | 'marketingConsent',
    value: DonorDisplayPreference | boolean
  ) => void;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
  error: Error | null;
}

const visibilityOptions: {
  value: DonorDisplayPreference;
  icon: typeof Eye;
  labelKey: string;
  descKey: string;
}[] = [
  {
    value: 'public_full',
    icon: Eye,
    labelKey: 'register.preferences.publicFull',
    descKey: 'register.preferences.publicFullDesc',
  },
  {
    value: 'public_anonymous',
    icon: EyeOff,
    labelKey: 'register.preferences.publicAnonymous',
    descKey: 'register.preferences.publicAnonymousDesc',
  },
  {
    value: 'private',
    icon: Lock,
    labelKey: 'register.preferences.private',
    descKey: 'register.preferences.privateDesc',
  },
];

export function PreferencesSlide({
  defaultDonationVisibility,
  marketingConsent,
  onChange,
  onSubmit,
  onBack,
  isSubmitting,
  error,
}: PreferencesSlideProps) {
  const { t } = useTranslation();

  return (
    <div>
      <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
        {t('register.preferences.title')}
      </h2>
      <p className="text-sm text-[var(--text-muted)] mb-6">
        {t('register.preferences.subtitle')}
      </p>

      <div className="space-y-6">
        <div>
          <p className="text-sm font-medium text-[var(--text-primary)] mb-3">
            {t('register.preferences.visibility')}
          </p>
          <div className="space-y-2">
            {visibilityOptions.map(({ value, icon: Icon, labelKey, descKey }) => (
              <button
                key={value}
                type="button"
                onClick={() => onChange('defaultDonationVisibility', value)}
                className={cn(
                  'w-full flex items-center gap-3 p-3 rounded-lg border transition-all text-left',
                  defaultDonationVisibility === value
                    ? 'border-amply-teal bg-amply-teal/10'
                    : 'border-[var(--border-default)] bg-[var(--surface-secondary)] hover:border-[var(--text-muted)]'
                )}
              >
                <Icon
                  size={18}
                  className={
                    defaultDonationVisibility === value
                      ? 'text-amply-teal'
                      : 'text-[var(--text-muted)]'
                  }
                />
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">{t(labelKey)}</p>
                  <p className="text-xs text-[var(--text-muted)]">{t(descKey)}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={marketingConsent}
              onChange={(e) => onChange('marketingConsent', e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-[var(--border-default)] text-amply-teal focus:ring-amply-teal"
            />
            <span className="text-sm text-[var(--text-secondary)]">
              {t('register.preferences.marketing')}
            </span>
          </label>
        </div>
      </div>

      {error && (
        <FormMessage error className="mt-4">
          {error.message}
        </FormMessage>
      )}

      <div className="flex gap-3 mt-8">
        <Button variant="secondary" onClick={onBack} disabled={isSubmitting}>
          {t('common.back')}
        </Button>
        <Button variant="coral" onClick={onSubmit} disabled={isSubmitting} className="flex-1">
          {isSubmitting ? t('common.loading') : t('register.preferences.createAccount')}
        </Button>
      </div>
    </div>
  );
}
