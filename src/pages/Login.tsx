import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GlassCard } from '@/components/glass/GlassCard';
import { Button } from '@/components/ui/Button';
import { Input, Label, FormMessage } from '@/components/ui/Input';
import { useAuth } from '@/api/hooks/useAuth';

export function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login, isLoggingIn, loginError } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate('/');
    } catch {
      // Error handled by mutation
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: 'var(--bg-gradient)' }}
    >
      <GlassCard className="w-full max-w-md" padding="lg">
        <div className="text-center mb-8">
          <img
            src="/logo.svg"
            alt="Amply"
            className="h-8 mx-auto mb-6"
            style={{ filter: 'var(--logo-filter)' }}
          />
          <h1 className="text-2xl font-semibold text-[var(--text-primary)]">
            {t('auth.login.title')}
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-2">
            {t('auth.login.subtitle')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="mb-2 block">
              {t('auth.email')}
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
          </div>

          <div>
            <Label htmlFor="password" className="mb-2 block">
              {t('auth.password')}
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
              minLength={8}
              autoComplete="current-password"
            />
          </div>

          {loginError && (
            <FormMessage error>
              {loginError instanceof Error ? loginError.message : t('auth.login.error')}
            </FormMessage>
          )}

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? t('common.loading') : t('auth.login.submit')}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-[var(--text-muted)]">
          <p>
            {t('auth.login.noAccount')}{' '}
            <Link to="/register" className="text-amply-teal hover:underline">
              {t('auth.login.signUp')}
            </Link>
          </p>
          <p className="mt-2">
            <Link to="/forgot-password" className="text-amply-teal hover:underline">
              {t('auth.login.forgotPassword')}
            </Link>
          </p>
        </div>
      </GlassCard>
    </div>
  );
}
