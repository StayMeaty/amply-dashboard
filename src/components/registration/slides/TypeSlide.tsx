import { useTranslation } from 'react-i18next';
import { User, Building2, Megaphone } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ContributorType } from '@/api/types';

interface TypeSlideProps {
  value: ContributorType | null;
  onChange: (type: ContributorType) => void;
  onNext: () => void;
}

const options: { type: ContributorType; icon: typeof User; labelKey: string; descKey: string }[] = [
  { type: 'individual', icon: User, labelKey: 'register.type.individual', descKey: 'register.type.individualDesc' },
  { type: 'business', icon: Building2, labelKey: 'register.type.business', descKey: 'register.type.businessDesc' },
  { type: 'fundraiser', icon: Megaphone, labelKey: 'register.type.fundraiser', descKey: 'register.type.fundraiserDesc' },
];

export function TypeSlide({ value, onChange, onNext }: TypeSlideProps) {
  const { t } = useTranslation();

  const handleSelect = (type: ContributorType) => {
    onChange(type);
    setTimeout(onNext, 200);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
        {t('register.type.title')}
      </h2>
      <p className="text-sm text-[var(--text-muted)] mb-6">
        {t('register.type.subtitle')}
      </p>

      <div className="space-y-3">
        {options.map(({ type, icon: Icon, labelKey, descKey }) => (
          <button
            key={type}
            onClick={() => handleSelect(type)}
            className={cn(
              'w-full flex items-center gap-4 p-4 rounded-lg border transition-all',
              'text-left',
              value === type
                ? 'border-amply-teal bg-amply-teal/10'
                : 'border-[var(--border-default)] hover:border-[var(--text-muted)] bg-[var(--surface-secondary)]'
            )}
          >
            <div
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center',
                value === type
                  ? 'bg-amply-teal text-white'
                  : 'bg-[var(--surface-primary)] text-[var(--text-secondary)]'
              )}
            >
              <Icon size={20} />
            </div>
            <div>
              <p className="font-medium text-[var(--text-primary)]">{t(labelKey)}</p>
              <p className="text-sm text-[var(--text-muted)]">{t(descKey)}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
