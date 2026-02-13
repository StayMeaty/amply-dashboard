import { useTranslation } from 'react-i18next';
import { Input, Label } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface AddressSlideProps {
  addressLine1: string;
  addressLine2: string;
  city: string;
  stateProvinceRegion: string;
  postalCode: string;
  countryCode: string;
  onChange: (
    field:
      | 'addressLine1'
      | 'addressLine2'
      | 'city'
      | 'stateProvinceRegion'
      | 'postalCode'
      | 'countryCode',
    value: string
  ) => void;
  onNext: () => void;
  onBack: () => void;
}

export function AddressSlide({
  addressLine1,
  addressLine2,
  city,
  stateProvinceRegion,
  postalCode,
  countryCode,
  onChange,
  onNext,
  onBack,
}: AddressSlideProps) {
  const { t } = useTranslation();

  const isValid = addressLine1.trim() && city.trim() && postalCode.trim() && countryCode.trim();

  return (
    <div>
      <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
        {t('register.address.title')}
      </h2>
      <p className="text-sm text-[var(--text-muted)] mb-6">
        {t('register.address.subtitle')}
      </p>

      <div className="space-y-4">
        <div>
          <Label htmlFor="address-1" className="mb-2 block">
            {t('register.address.line1')}
          </Label>
          <Input
            id="address-1"
            type="text"
            value={addressLine1}
            onChange={(e) => onChange('addressLine1', e.target.value)}
            placeholder={t('register.address.line1Placeholder')}
            autoComplete="address-line1"
          />
        </div>

        <div>
          <Label htmlFor="address-2" className="mb-2 block">
            {t('register.address.line2')}
          </Label>
          <Input
            id="address-2"
            type="text"
            value={addressLine2}
            onChange={(e) => onChange('addressLine2', e.target.value)}
            placeholder={t('register.address.line2Placeholder')}
            autoComplete="address-line2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city" className="mb-2 block">
              {t('register.address.city')}
            </Label>
            <Input
              id="city"
              type="text"
              value={city}
              onChange={(e) => onChange('city', e.target.value)}
              placeholder={t('register.address.cityPlaceholder')}
              autoComplete="address-level2"
            />
          </div>
          <div>
            <Label htmlFor="postal-code" className="mb-2 block">
              {t('register.address.postalCode')}
            </Label>
            <Input
              id="postal-code"
              type="text"
              value={postalCode}
              onChange={(e) => onChange('postalCode', e.target.value)}
              placeholder="12345"
              autoComplete="postal-code"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="region" className="mb-2 block">
              {t('register.address.region')}
            </Label>
            <Input
              id="region"
              type="text"
              value={stateProvinceRegion}
              onChange={(e) => onChange('stateProvinceRegion', e.target.value)}
              placeholder={t('register.address.regionPlaceholder')}
              autoComplete="address-level1"
            />
          </div>
          <div>
            <Label htmlFor="country" className="mb-2 block">
              {t('register.address.country')}
            </Label>
            <Input
              id="country"
              type="text"
              value={countryCode}
              onChange={(e) => onChange('countryCode', e.target.value.toUpperCase().slice(0, 2))}
              placeholder="US"
              maxLength={2}
              autoComplete="country"
            />
          </div>
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
