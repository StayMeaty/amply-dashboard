import { useTranslation } from 'react-i18next';
import { Sun, Moon, Monitor, Image, Layers } from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { GlassCard } from '@/components/glass/GlassCard';
import { useUIStore, type BackgroundMode } from '@/stores/ui';
import { cn } from '@/lib/utils';
import { languages, type LanguageCode } from '@/lib/i18n';
import type { Theme } from '@/lib/theme';

function FlagGB() {
  return (
    <svg viewBox="0 0 60 30" width="24" height="12" className="rounded-sm">
      <clipPath id="s"><path d="M0,0 v30 h60 v-30 z"/></clipPath>
      <clipPath id="t"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/></clipPath>
      <g clipPath="url(#s)">
        <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
        <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4"/>
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
      </g>
    </svg>
  );
}

function FlagDE() {
  return (
    <svg viewBox="0 0 5 3" width="24" height="14" className="rounded-sm">
      <rect width="5" height="3" fill="#000"/>
      <rect width="5" height="2" y="1" fill="#D00"/>
      <rect width="5" height="1" y="2" fill="#FFCE00"/>
    </svg>
  );
}

const flagComponents: Record<LanguageCode, React.FC> = {
  en: FlagGB,
  de: FlagDE,
};

export function Settings() {
  const { t, i18n } = useTranslation();
  const { theme, setTheme, backgroundMode, setBackgroundMode } = useUIStore();

  const themeOptions: { value: Theme; label: string; icon: React.ReactNode }[] = [
    { value: 'light', label: t('settings.themeLight'), icon: <Sun size={18} /> },
    { value: 'dark', label: t('settings.themeDark'), icon: <Moon size={18} /> },
    { value: 'system', label: t('settings.themeSystem'), icon: <Monitor size={18} /> },
  ];

  const backgroundOptions: { value: BackgroundMode; label: string; icon: React.ReactNode }[] = [
    { value: 'gradient', label: t('settings.backgroundGradient'), icon: <Layers size={18} /> },
    { value: 'wallpaper', label: t('settings.backgroundWallpaper'), icon: <Image size={18} /> },
  ];

  const handleLanguageChange = (code: LanguageCode) => {
    i18n.changeLanguage(code);
    localStorage.setItem('amply-language', code);
  };

  return (
    <PageContainer title={t('settings.title')}>
      <div className="space-y-6">
        {/* Appearance Section */}
        <GlassCard>
          <div className="p-6">
            <h2 className="text-subheading text-[var(--text-primary)] mb-1">
              {t('settings.appearance')}
            </h2>
            <p className="text-sm text-[var(--text-muted)] mb-6">
              {t('settings.appearanceDescription')}
            </p>

            {/* Theme */}
            <div className="mb-6">
              <label className="text-label text-[var(--text-secondary)] mb-3 block">
                {t('settings.theme')}
              </label>
              <div className="flex gap-2">
                {themeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setTheme(option.value)}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2.5 rounded-lg',
                      'border transition-all duration-150',
                      theme === option.value
                        ? 'bg-amply-teal text-white border-amply-teal'
                        : 'bg-[var(--surface-secondary)] text-[var(--text-secondary)] border-[var(--border-default)] hover:border-[var(--text-muted)]'
                    )}
                  >
                    {option.icon}
                    <span className="text-sm font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Background */}
            <div>
              <label className="text-label text-[var(--text-secondary)] mb-3 block">
                {t('settings.background')}
              </label>
              <div className="flex gap-2">
                {backgroundOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setBackgroundMode(option.value)}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2.5 rounded-lg',
                      'border transition-all duration-150',
                      backgroundMode === option.value
                        ? 'bg-amply-teal text-white border-amply-teal'
                        : 'bg-[var(--surface-secondary)] text-[var(--text-secondary)] border-[var(--border-default)] hover:border-[var(--text-muted)]'
                    )}
                  >
                    {option.icon}
                    <span className="text-sm font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Language Section */}
        <GlassCard>
          <div className="p-6">
            <h2 className="text-subheading text-[var(--text-primary)] mb-1">
              {t('settings.language')}
            </h2>
            <p className="text-sm text-[var(--text-muted)] mb-6">
              {t('settings.languageDescription')}
            </p>

            <div className="flex gap-2">
              {languages.map((lang) => {
                const FlagIcon = flagComponents[lang.code];
                return (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2.5 rounded-lg',
                      'border transition-all duration-150',
                      i18n.language === lang.code
                        ? 'bg-amply-teal text-white border-amply-teal'
                        : 'bg-[var(--surface-secondary)] text-[var(--text-secondary)] border-[var(--border-default)] hover:border-[var(--text-muted)]'
                    )}
                  >
                    <FlagIcon />
                    <span className="text-sm font-medium">{lang.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </GlassCard>
      </div>
    </PageContainer>
  );
}
