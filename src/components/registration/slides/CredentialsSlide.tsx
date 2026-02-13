import { useTranslation } from 'react-i18next';
import { Input, Label, FormMessage } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface CredentialsSlideProps {
  email: string;
  password: string;
  confirmPassword: string;
  onChange: (field: 'email' | 'password' | 'confirmPassword', value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function CredentialsSlide({
  email,
  password,
  confirmPassword,
  onChange,
  onNext,
  onBack,
}: CredentialsSlideProps) {
  const { t } = useTranslation();

  const isValid = email && password.length >= 8 && password === confirmPassword;

  return (
    <div>
      <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
        {t('register.credentials.title')}
      </h2>
      <p className="text-sm text-[var(--text-muted)] mb-6">
        {t('register.credentials.subtitle')}
      </p>

      <div className="space-y-4">
        <div>
          <Label htmlFor="reg-email" className="mb-2 block">
            {t('auth.email')}
          </Label>
          <Input
            id="reg-email"
            type="email"
            value={email}
            onChange={(e) => onChange('email', e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
          />
        </div>

        <div>
          <Label htmlFor="reg-password" className="mb-2 block">
            {t('auth.password')}
          </Label>
          <Input
            id="reg-password"
            type="password"
            value={password}
            onChange={(e) => onChange('password', e.target.value)}
            placeholder={t('register.credentials.passwordPlaceholder')}
            autoComplete="new-password"
          />
        </div>

        <div>
          <Label htmlFor="reg-confirm" className="mb-2 block">
            {t('register.credentials.confirmPassword')}
          </Label>
          <Input
            id="reg-confirm"
            type="password"
            value={confirmPassword}
            onChange={(e) => onChange('confirmPassword', e.target.value)}
            placeholder={t('register.credentials.confirmPlaceholder')}
            autoComplete="new-password"
            error={confirmPassword.length > 0 && password !== confirmPassword}
          />
          {confirmPassword && password !== confirmPassword && (
            <FormMessage error>{t('register.credentials.passwordMismatch')}</FormMessage>
          )}
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
