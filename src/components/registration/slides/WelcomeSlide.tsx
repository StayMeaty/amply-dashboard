import { useTranslation } from 'react-i18next';
import { CheckCircle, Mail } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface WelcomeSlideProps {
  email: string;
  onContinue: () => void;
}

export function WelcomeSlide({ email, onContinue }: WelcomeSlideProps) {
  const { t } = useTranslation();

  return (
    <div className="text-center py-4">
      <div className="w-16 h-16 rounded-full bg-amply-teal/10 flex items-center justify-center mx-auto mb-6">
        <CheckCircle size={32} className="text-amply-teal" />
      </div>

      <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
        {t('register.welcome.title')}
      </h2>
      <p className="text-sm text-[var(--text-muted)] mb-6">
        {t('register.welcome.subtitle')}
      </p>

      <div className="glass-panel-secondary rounded-lg p-4 mb-6">
        <div className="flex items-center gap-3 justify-center">
          <Mail size={20} className="text-amply-teal" />
          <div className="text-left">
            <p className="text-sm font-medium text-[var(--text-primary)]">
              {t('register.welcome.verifyEmail')}
            </p>
            <p className="text-xs text-[var(--text-muted)]">
              {t('register.welcome.sentTo', { email })}
            </p>
          </div>
        </div>
      </div>

      <Button variant="primary" onClick={onContinue} className="w-full">
        {t('register.welcome.continue')}
      </Button>
    </div>
  );
}
