import { useTranslation } from 'react-i18next';
import { Input, Label } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface CompanySlideProps {
  companyName: string;
  companyRole: string;
  onChange: (field: 'companyName' | 'companyRole', value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function CompanySlide({
  companyName,
  companyRole,
  onChange,
  onNext,
  onBack,
}: CompanySlideProps) {
  const { t } = useTranslation();

  const isValid = companyName.trim();

  return (
    <div>
      <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
        {t('register.company.title')}
      </h2>
      <p className="text-sm text-[var(--text-muted)] mb-6">
        {t('register.company.subtitle')}
      </p>

      <div className="space-y-4">
        <div>
          <Label htmlFor="company-name" className="mb-2 block">
            {t('register.company.name')}
          </Label>
          <Input
            id="company-name"
            type="text"
            value={companyName}
            onChange={(e) => onChange('companyName', e.target.value)}
            placeholder={t('register.company.namePlaceholder')}
            autoComplete="organization"
          />
        </div>

        <div>
          <Label htmlFor="company-role" className="mb-2 block">
            {t('register.company.role')}
          </Label>
          <Input
            id="company-role"
            type="text"
            value={companyRole}
            onChange={(e) => onChange('companyRole', e.target.value)}
            placeholder={t('register.company.rolePlaceholder')}
            autoComplete="organization-title"
          />
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
