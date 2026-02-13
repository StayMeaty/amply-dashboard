import { useTranslation } from 'react-i18next';
import { Input, Label } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface ContactSlideProps {
  phoneNumber: string;
  languagePreference: string;
  onChange: (field: 'phoneNumber' | 'languagePreference', value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const languages = [
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
];

export function ContactSlide({
  phoneNumber,
  languagePreference,
  onChange,
  onNext,
  onBack,
}: ContactSlideProps) {
  const { t } = useTranslation();

  return (
    <div>
      <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
        {t('register.contact.title')}
      </h2>
      <p className="text-sm text-[var(--text-muted)] mb-6">
        {t('register.contact.subtitle')}
      </p>

      <div className="space-y-4">
        <div>
          <Label htmlFor="phone" className="mb-2 block">
            {t('register.contact.phone')}
          </Label>
          <Input
            id="phone"
            type="tel"
            value={phoneNumber}
            onChange={(e) => onChange('phoneNumber', e.target.value)}
            placeholder="+1 555 123 4567"
            autoComplete="tel"
          />
          <p className="text-xs text-[var(--text-muted)] mt-1">
            {t('register.contact.phoneHint')}
          </p>
        </div>

        <div>
          <Label className="mb-2 block">{t('register.contact.language')}</Label>
          <div className="flex gap-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => onChange('languagePreference', lang.code)}
                className={cn(
                  'flex-1 py-2 px-4 rounded-md border text-sm font-medium transition-colors',
                  languagePreference === lang.code
                    ? 'border-amply-teal bg-amply-teal/10 text-amply-teal'
                    : 'border-[var(--border-default)] bg-[var(--surface-secondary)] text-[var(--text-secondary)] hover:border-[var(--text-muted)]'
                )}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-8">
        <Button variant="secondary" onClick={onBack}>
          {t('common.back')}
        </Button>
        <Button variant="primary" onClick={onNext} className="flex-1">
          {t('common.continue')}
        </Button>
      </div>
    </div>
  );
}
