import { TrendingUp, TrendingDown, Users, DollarSign, Heart } from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { GlassCard, CardHeader } from '@/components/glass/GlassCard';
import { Button } from '@/components/ui/Button';
import { cn, formatCurrency, formatRelativeDate } from '@/lib/utils';

// Demo data
const stats = [
  {
    title: 'Total Received',
    value: 124580,
    change: 12.5,
    icon: DollarSign,
  },
  {
    title: 'This Month',
    value: 18240,
    change: 8.3,
    icon: TrendingUp,
  },
  {
    title: 'Donors',
    value: 1247,
    change: -2.1,
    icon: Users,
  },
  {
    title: 'Avg. Donation',
    value: 47.2,
    change: 5.7,
    icon: Heart,
  },
];

const recentDonations = [
  { id: 1, donor: 'Sarah Johnson', amount: 150, date: new Date(Date.now() - 2 * 60 * 60 * 1000) },
  { id: 2, donor: 'Anonymous', amount: 75, date: new Date(Date.now() - 5 * 60 * 60 * 1000) },
  { id: 3, donor: 'Michael Chen', amount: 250, date: new Date(Date.now() - 24 * 60 * 60 * 1000) },
  { id: 4, donor: 'Emma Williams', amount: 50, date: new Date(Date.now() - 48 * 60 * 60 * 1000) },
];

export function Dashboard() {
  return (
    <PageContainer title="Dashboard">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <GlassCard key={stat.title} padding="md">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-label text-[var(--text-muted)] mb-1">
                  {stat.title}
                </p>
                <p className="text-display text-[var(--text-primary)]">
                  {stat.title.includes('Donors')
                    ? stat.value.toLocaleString()
                    : formatCurrency(stat.value)}
                </p>
              </div>
              <div className="p-2 rounded-lg bg-amply-light/50">
                <stat.icon size={20} className="text-amply-teal" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1">
              {stat.change > 0 ? (
                <TrendingUp size={14} className="text-success" />
              ) : (
                <TrendingDown size={14} className="text-error" />
              )}
              <span
                className={cn(
                  'text-xs font-medium',
                  stat.change > 0 ? 'text-success' : 'text-error'
                )}
              >
                {stat.change > 0 ? '+' : ''}
                {stat.change}%
              </span>
              <span className="text-xs text-[var(--text-muted)]">vs last month</span>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Area */}
        <div className="lg:col-span-2">
          <GlassCard
            padding="none"
            header={
              <CardHeader
                title="Donation Trends"
                description="Last 30 days"
                action={
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">7D</Button>
                    <Button variant="secondary" size="sm">30D</Button>
                    <Button variant="ghost" size="sm">1Y</Button>
                  </div>
                }
              />
            }
          >
            <div className="h-64 flex items-center justify-center text-[var(--text-muted)]">
              <div className="text-center">
                <p className="text-sm">Chart placeholder</p>
                <p className="text-xs mt-1">Recharts integration pending</p>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Recent Donations */}
        <div className="lg:col-span-1">
          <GlassCard
            padding="none"
            header={
              <CardHeader
                title="Recent Donations"
                action={<Button variant="ghost" size="sm">View All</Button>}
              />
            }
          >
            <div className="divide-y divide-[var(--border-default)]">
              {recentDonations.map((donation) => (
                <div
                  key={donation.id}
                  className="px-5 py-3 flex items-center justify-between hover:bg-[var(--surface-secondary)] transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">
                      {donation.donor}
                    </p>
                    <p className="text-xs text-[var(--text-muted)]">
                      {formatRelativeDate(donation.date)}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-success">
                    +{formatCurrency(donation.amount)}
                  </p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6">
        <GlassCard variant="secondary">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <h3 className="text-subheading text-[var(--text-primary)]">
                Quick Actions
              </h3>
              <p className="text-sm text-[var(--text-muted)]">
                Common tasks to get started
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="primary">Create Campaign</Button>
              <Button variant="secondary">Export Report</Button>
              <Button variant="ghost">View Documentation</Button>
            </div>
          </div>
        </GlassCard>
      </div>
    </PageContainer>
  );
}
