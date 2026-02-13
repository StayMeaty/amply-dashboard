import { useTranslation } from 'react-i18next';
import { Input, Label } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface NameSlideProps {
  firstName: string;
  lastName: string;
  displayName: string;
  onChange: (field: 'firstName' | 'lastName' | 'displayName', value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function NameSlide({
  firstName,
  lastName,
  displayName,
  onChange,
  onNext,
  onBack,
}: NameSlideProps) {
  const { t } = useTranslation();

  const isValid = firstName.trim() && lastName.trim();

  return (
    <div>
      <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
        {t('register.name.title')}
      </h2>
      <p className="text-sm text-[var(--text-muted)] mb-6">
        {t('register.name.subtitle')}
      </p>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="first-name" className="mb-2 block">
              {t('register.name.firstName')}
            </Label>
            <Input
              id="first-name"
              type="text"
              value={firstName}
              onChange={(e) => onChange('firstName', e.target.value)}
              placeholder="John"
              autoComplete="given-name"
            />
          </div>
          <div>
            <Label htmlFor="last-name" className="mb-2 block">
              {t('register.name.lastName')}
            </Label>
            <Input
              id="last-name"
              type="text"
              value={lastName}
              onChange={(e) => onChange('lastName', e.target.value)}
              placeholder="Doe"
              autoComplete="family-name"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="display-name" className="mb-2 block">
            {t('register.name.displayName')}
          </Label>
          <Input
            id="display-name"
            type="text"
            value={displayName}
            onChange={(e) => onChange('displayName', e.target.value)}
            placeholder={t('register.name.displayNamePlaceholder')}
          />
          <p className="text-xs text-[var(--text-muted)] mt-1">
            {t('register.name.displayNameHint')}
          </p>
        </div>
      </div>

      <div className="flex gap-3 mt-8">
        <Button variant="secondary" onClick={onBack}>
          {t('common.back')}
        </Button>
        <Button variant="primary" onClick={onNext} disabled={!isValid} className="flex-1">
          {t('common.continue')}
        </Button>
      </div>
    </div>
  );
}
