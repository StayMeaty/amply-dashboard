import { useState } from 'react';
import {
  Check,
  X,
  AlertTriangle,
  Info,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Heart,
  Calendar,
  Search,
  Filter,
  MoreHorizontal,
  ExternalLink,
  Copy,
  Eye,
  EyeOff,
  ChevronDown,
  Plus,
  Download,
  RefreshCw,
} from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tabs from '@radix-ui/react-tabs';
import * as Select from '@radix-ui/react-select';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Switch from '@radix-ui/react-switch';

import { PageContainer } from '@/components/layout/PageContainer';
import { GlassCard, CardHeader } from '@/components/glass/GlassCard';
import { Button } from '@/components/ui/Button';
import { Input, Textarea, Label, FormMessage } from '@/components/ui/Input';
import { Badge } from '@/components/data/Badge';
import { cn, formatCurrency, formatDate } from '@/lib/utils';

// Demo data
const sampleDonations = [
  { id: 'don_1a2b3c', donor: 'Sarah Johnson', amount: 150, fund: 'General Fund', status: 'completed', date: new Date('2026-02-10') },
  { id: 'don_4d5e6f', donor: 'Anonymous', amount: 75, fund: 'Education', status: 'completed', date: new Date('2026-02-09') },
  { id: 'don_7g8h9i', donor: 'Michael Chen', amount: 250, fund: 'Healthcare', status: 'pending', date: new Date('2026-02-09') },
  { id: 'don_0j1k2l', donor: 'Emma Williams', amount: 50, fund: 'Environment', status: 'failed', date: new Date('2026-02-08') },
  { id: 'don_3m4n5o', donor: 'David Brown', amount: 500, fund: 'General Fund', status: 'completed', date: new Date('2026-02-07') },
];

export function Demo() {
  const [modalOpen, setModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <PageContainer
      title="Component Demo"
      action={<Button variant="primary"><Plus size={16} /> Add New</Button>}
    >
      {/* Typography Section */}
      <section className="mb-10">
        <h2 className="text-heading text-[var(--text-primary)] mb-4">Typography</h2>
        <GlassCard>
          <div className="space-y-4">
            <div>
              <p className="text-label text-[var(--text-muted)] mb-1">Display (Thin 100)</p>
              <p className="text-display text-[var(--text-primary)]">Transparent Giving</p>
            </div>
            <div>
              <p className="text-label text-[var(--text-muted)] mb-1">Heading (ExtraLight 200)</p>
              <p className="text-heading text-[var(--text-primary)]">Every Cent Traceable</p>
            </div>
            <div>
              <p className="text-label text-[var(--text-muted)] mb-1">Subheading (Light 300)</p>
              <p className="text-subheading text-[var(--text-primary)]">Building Trust Through Transparency</p>
            </div>
            <div>
              <p className="text-label text-[var(--text-muted)] mb-1">Body (Regular 400)</p>
              <p className="text-body text-[var(--text-secondary)]">
                Amply provides the infrastructure for transparent charitable giving.
                Every donation is recorded on our immutable ledger, ensuring complete traceability.
              </p>
            </div>
            <div>
              <p className="text-label text-[var(--text-muted)] mb-1">Label (Medium 500)</p>
              <p className="text-label text-[var(--text-primary)]">DONATION AMOUNT</p>
            </div>
            <div>
              <p className="text-label text-[var(--text-muted)] mb-1">Caption</p>
              <p className="text-caption">Last updated 2 hours ago</p>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* Buttons Section */}
      <section className="mb-10">
        <h2 className="text-heading text-[var(--text-primary)] mb-4">Buttons</h2>
        <GlassCard>
          <div className="space-y-6">
            {/* Variants */}
            <div>
              <p className="text-label text-[var(--text-muted)] mb-3">Variants</p>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="coral">Donate Now</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
              </div>
            </div>

            {/* Sizes */}
            <div>
              <p className="text-label text-[var(--text-muted)] mb-3">Sizes</p>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary" size="sm">Small</Button>
                <Button variant="primary" size="md">Medium</Button>
                <Button variant="primary" size="lg">Large</Button>
                <Button variant="primary" size="icon"><Plus size={18} /></Button>
              </div>
            </div>

            {/* With Icons */}
            <div>
              <p className="text-label text-[var(--text-muted)] mb-3">With Icons</p>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary"><Plus size={16} /> Create Campaign</Button>
                <Button variant="secondary"><Download size={16} /> Export</Button>
                <Button variant="ghost"><RefreshCw size={16} /> Refresh</Button>
                <Button variant="secondary" size="icon"><MoreHorizontal size={18} /></Button>
              </div>
            </div>

            {/* States */}
            <div>
              <p className="text-label text-[var(--text-muted)] mb-3">States</p>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" disabled>Disabled</Button>
                <Button variant="secondary" disabled>Disabled</Button>
              </div>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* Form Elements Section */}
      <section className="mb-10">
        <h2 className="text-heading text-[var(--text-primary)] mb-4">Form Elements</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GlassCard>
            <div className="space-y-5">
              <p className="text-label text-[var(--text-muted)] mb-3">Text Inputs</p>

              {/* Default Input */}
              <div>
                <Label htmlFor="campaign-name">Campaign Name</Label>
                <Input
                  id="campaign-name"
                  placeholder="Enter campaign name"
                  className="mt-1.5"
                />
              </div>

              {/* With Value */}
              <div>
                <Label htmlFor="goal">Goal Amount</Label>
                <Input
                  id="goal"
                  defaultValue="$10,000"
                  className="mt-1.5"
                />
                <FormMessage>Set a realistic fundraising goal</FormMessage>
              </div>

              {/* Password with Toggle */}
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-1.5">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Error State */}
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value="invalid-email"
                  error
                  className="mt-1.5"
                />
                <FormMessage error>Please enter a valid email address</FormMessage>
              </div>

              {/* Search Input */}
              <div>
                <Label htmlFor="search">Search</Label>
                <div className="relative mt-1.5">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                  <Input
                    id="search"
                    placeholder="Search donations..."
                    className="pl-9"
                  />
                </div>
              </div>

              {/* Textarea */}
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter campaign description..."
                  className="mt-1.5"
                  rows={3}
                />
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="space-y-5">
              <p className="text-label text-[var(--text-muted)] mb-3">Selects & Toggles</p>

              {/* Select */}
              <div>
                <Label>Category</Label>
                <Select.Root defaultValue="education">
                  <Select.Trigger
                    className={cn(
                      'flex h-9 w-full items-center justify-between rounded-md px-3 py-2 mt-1.5',
                      'text-sm bg-[var(--surface-secondary)] backdrop-blur-sm',
                      'border border-[var(--border-default)]',
                      'text-[var(--text-primary)]',
                      'focus:outline-none focus:border-amply-teal focus:ring-2 focus:ring-amply-teal/10'
                    )}
                  >
                    <Select.Value placeholder="Select a category" />
                    <Select.Icon>
                      <ChevronDown size={16} className="text-[var(--text-muted)]" />
                    </Select.Icon>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content
                      className="glass-panel-elevated rounded-lg overflow-hidden min-w-[200px]"
                      position="popper"
                      sideOffset={4}
                    >
                      <Select.Viewport className="p-1">
                        {['Education', 'Healthcare', 'Environment', 'Community'].map((item) => (
                          <Select.Item
                            key={item}
                            value={item.toLowerCase()}
                            className={cn(
                              'flex items-center px-3 py-2 rounded-md cursor-pointer',
                              'text-sm text-[var(--text-secondary)]',
                              'outline-none',
                              'hover:bg-[var(--surface-secondary)] hover:text-[var(--text-primary)]',
                              'data-[state=checked]:text-amply-teal'
                            )}
                          >
                            <Select.ItemText>{item}</Select.ItemText>
                          </Select.Item>
                        ))}
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              </div>

              {/* Checkboxes */}
              <div>
                <p className="text-sm font-medium text-[var(--text-primary)] mb-3">Notifications</p>
                <div className="space-y-3">
                  {['Email notifications', 'Push notifications', 'SMS alerts'].map((label, i) => (
                    <label key={label} className="flex items-center gap-3 cursor-pointer">
                      <Checkbox.Root
                        defaultChecked={i < 2}
                        className={cn(
                          'h-4 w-4 rounded border border-[var(--border-default)]',
                          'bg-[var(--surface-secondary)]',
                          'data-[state=checked]:bg-amply-teal data-[state=checked]:border-amply-teal',
                          'focus:outline-none focus:ring-2 focus:ring-amply-teal/20'
                        )}
                      >
                        <Checkbox.Indicator className="flex items-center justify-center text-white">
                          <Check size={12} />
                        </Checkbox.Indicator>
                      </Checkbox.Root>
                      <span className="text-sm text-[var(--text-secondary)]">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Switch */}
              <div>
                <p className="text-sm font-medium text-[var(--text-primary)] mb-3">Settings</p>
                <div className="space-y-4">
                  {[
                    { label: 'Enable recurring donations', checked: true },
                    { label: 'Make campaign public', checked: true },
                    { label: 'Allow anonymous donations', checked: false },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <span className="text-sm text-[var(--text-secondary)]">{item.label}</span>
                      <Switch.Root
                        defaultChecked={item.checked}
                        className={cn(
                          'w-9 h-5 rounded-full relative',
                          'bg-[var(--border-default)]',
                          'data-[state=checked]:bg-amply-teal',
                          'transition-colors'
                        )}
                      >
                        <Switch.Thumb
                          className={cn(
                            'block w-4 h-4 rounded-full bg-white',
                            'transition-transform',
                            'translate-x-0.5 data-[state=checked]:translate-x-[18px]',
                            'shadow-sm'
                          )}
                        />
                      </Switch.Root>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Cards Section */}
      <section className="mb-10">
        <h2 className="text-heading text-[var(--text-primary)] mb-4">Glass Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard variant="primary">
            <p className="text-label text-[var(--text-muted)] mb-2">Primary</p>
            <p className="text-body text-[var(--text-secondary)]">
              Standard glass card with 70% opacity and 16px blur.
            </p>
          </GlassCard>

          <GlassCard variant="secondary">
            <p className="text-label text-[var(--text-muted)] mb-2">Secondary</p>
            <p className="text-body text-[var(--text-secondary)]">
              Lighter glass card with 50% opacity, for nested content.
            </p>
          </GlassCard>

          <GlassCard variant="elevated">
            <p className="text-label text-[var(--text-muted)] mb-2">Elevated</p>
            <p className="text-body text-[var(--text-secondary)]">
              More prominent card with 80% opacity, for modals and popovers.
            </p>
          </GlassCard>
        </div>

        {/* Card with Header */}
        <div className="mt-6">
          <GlassCard
            padding="none"
            header={
              <CardHeader
                title="Recent Activity"
                description="Last 24 hours"
                action={<Button variant="ghost" size="sm">View All</Button>}
              />
            }
            footer={
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="sm">Cancel</Button>
                <Button variant="primary" size="sm">Save</Button>
              </div>
            }
          >
            <div className="py-8 text-center text-[var(--text-muted)]">
              Card content area
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Stat Cards Section */}
      <section className="mb-10">
        <h2 className="text-heading text-[var(--text-primary)] mb-4">Stat Cards</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Total Received', value: 124580, change: 12.5, icon: DollarSign },
            { title: 'This Month', value: 18240, change: 8.3, icon: Calendar },
            { title: 'Donors', value: 1247, change: -2.1, icon: Users, isCount: true },
            { title: 'Avg. Donation', value: 47.2, change: 5.7, icon: Heart },
          ].map((stat) => (
            <GlassCard key={stat.title} padding="md">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-label text-[var(--text-muted)] mb-1">{stat.title}</p>
                  <p className="text-display text-[var(--text-primary)]">
                    {stat.isCount ? stat.value.toLocaleString() : formatCurrency(stat.value)}
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
                <span className={cn('text-xs font-medium', stat.change > 0 ? 'text-success' : 'text-error')}>
                  {stat.change > 0 ? '+' : ''}{stat.change}%
                </span>
                <span className="text-xs text-[var(--text-muted)]">vs last month</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Badges Section */}
      <section className="mb-10">
        <h2 className="text-heading text-[var(--text-primary)] mb-4">Badges & Status</h2>
        <GlassCard>
          <div className="flex flex-wrap gap-3">
            <Badge variant="success">Completed</Badge>
            <Badge variant="warning">Pending</Badge>
            <Badge variant="error">Failed</Badge>
            <Badge variant="info">Processing</Badge>
            <Badge variant="default">Draft</Badge>
          </div>
        </GlassCard>
      </section>

      {/* Alerts Section */}
      <section className="mb-10">
        <h2 className="text-heading text-[var(--text-primary)] mb-4">Alerts</h2>
        <div className="space-y-4">
          {[
            { variant: 'success', icon: Check, title: 'Payment successful', message: 'The donation of $150.00 has been processed successfully.' },
            { variant: 'warning', icon: AlertTriangle, title: 'Verification pending', message: 'Please complete your organization verification to receive payouts.' },
            { variant: 'error', icon: X, title: 'Payment failed', message: 'The card was declined. Please try a different payment method.' },
            { variant: 'info', icon: Info, title: 'Scheduled maintenance', message: 'The platform will be briefly unavailable on Feb 20 at 3:00 AM UTC.' },
          ].map((alert) => (
            <div
              key={alert.variant}
              className={cn(
                'flex items-start gap-3 p-4 rounded-lg',
                {
                  success: 'bg-success-light text-success',
                  warning: 'bg-warning-light text-warning',
                  error: 'bg-error-light text-error',
                  info: 'bg-info-light text-info',
                }[alert.variant]
              )}
            >
              <alert.icon size={20} className="flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">{alert.title}</p>
                <p className="text-sm opacity-90">{alert.message}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tabs Section */}
      <section className="mb-10">
        <h2 className="text-heading text-[var(--text-primary)] mb-4">Tabs</h2>
        <GlassCard padding="none">
          <Tabs.Root defaultValue="overview">
            <Tabs.List className="flex border-b border-[var(--border-default)]">
              {['Overview', 'Donations', 'Campaigns', 'Payouts'].map((tab) => (
                <Tabs.Trigger
                  key={tab}
                  value={tab.toLowerCase()}
                  className={cn(
                    'px-4 py-3 text-sm font-medium',
                    'text-[var(--text-muted)] hover:text-[var(--text-primary)]',
                    'border-b-2 border-transparent -mb-px',
                    'transition-colors',
                    'data-[state=active]:text-amply-teal data-[state=active]:border-amply-teal'
                  )}
                >
                  {tab}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
            <Tabs.Content value="overview" className="p-5">
              <p className="text-[var(--text-secondary)]">Overview content goes here.</p>
            </Tabs.Content>
            <Tabs.Content value="donations" className="p-5">
              <p className="text-[var(--text-secondary)]">Donations content goes here.</p>
            </Tabs.Content>
            <Tabs.Content value="campaigns" className="p-5">
              <p className="text-[var(--text-secondary)]">Campaigns content goes here.</p>
            </Tabs.Content>
            <Tabs.Content value="payouts" className="p-5">
              <p className="text-[var(--text-secondary)]">Payouts content goes here.</p>
            </Tabs.Content>
          </Tabs.Root>
        </GlassCard>
      </section>

      {/* Data Table Section */}
      <section className="mb-10">
        <h2 className="text-heading text-[var(--text-primary)] mb-4">Data Table</h2>
        <GlassCard padding="none">
          {/* Table Header */}
          <div className="px-5 py-4 border-b border-[var(--border-default)] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <Input placeholder="Search donations..." className="pl-9 w-64" />
              </div>
              <Button variant="secondary" size="sm">
                <Filter size={14} /> Filter
              </Button>
            </div>
            <Button variant="primary" size="sm">
              <Download size={14} /> Export
            </Button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border-default)] bg-[var(--bg-subtle)]/50">
                  <th className="text-left py-3 px-5 text-label text-[var(--text-muted)]">ID</th>
                  <th className="text-left py-3 px-5 text-label text-[var(--text-muted)]">Donor</th>
                  <th className="text-left py-3 px-5 text-label text-[var(--text-muted)]">Amount</th>
                  <th className="text-left py-3 px-5 text-label text-[var(--text-muted)]">Fund</th>
                  <th className="text-left py-3 px-5 text-label text-[var(--text-muted)]">Status</th>
                  <th className="text-left py-3 px-5 text-label text-[var(--text-muted)]">Date</th>
                  <th className="py-3 px-5"></th>
                </tr>
              </thead>
              <tbody>
                {sampleDonations.map((donation) => (
                  <tr
                    key={donation.id}
                    className="border-b border-[var(--border-subtle)] hover:bg-[var(--surface-secondary)] transition-colors cursor-pointer"
                  >
                    <td className="py-3 px-5 font-mono text-sm text-[var(--text-muted)]">{donation.id}</td>
                    <td className="py-3 px-5 text-sm text-[var(--text-primary)]">{donation.donor}</td>
                    <td className="py-3 px-5 font-mono text-sm text-[var(--text-primary)]">{formatCurrency(donation.amount)}</td>
                    <td className="py-3 px-5 text-sm text-[var(--text-secondary)]">{donation.fund}</td>
                    <td className="py-3 px-5">
                      <Badge variant={
                        donation.status === 'completed' ? 'success' :
                        donation.status === 'pending' ? 'warning' : 'error'
                      }>
                        {donation.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-5 text-sm text-[var(--text-secondary)]">{formatDate(donation.date)}</td>
                    <td className="py-3 px-5">
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-5 py-4 border-t border-[var(--border-default)] flex items-center justify-between">
            <p className="text-sm text-[var(--text-muted)]">Showing 1-5 of 247 results</p>
            <div className="flex items-center gap-1">
              <Button variant="secondary" size="sm" disabled>Previous</Button>
              <Button variant="primary" size="sm">1</Button>
              <Button variant="secondary" size="sm">2</Button>
              <Button variant="secondary" size="sm">3</Button>
              <span className="px-2 text-[var(--text-muted)]">...</span>
              <Button variant="secondary" size="sm">25</Button>
              <Button variant="secondary" size="sm">Next</Button>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* Modal Section */}
      <section className="mb-10">
        <h2 className="text-heading text-[var(--text-primary)] mb-4">Modal</h2>
        <GlassCard>
          <p className="text-body text-[var(--text-secondary)] mb-4">
            Click the button below to open a modal dialog.
          </p>
          <Dialog.Root open={modalOpen} onOpenChange={setModalOpen}>
            <Dialog.Trigger asChild>
              <Button variant="primary">Open Modal</Button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-[var(--overlay-default)] animate-in fade-in-0" />
              <Dialog.Content
                className={cn(
                  'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
                  'w-full max-w-md',
                  'glass-panel-elevated rounded-xl',
                  'animate-in fade-in-0 zoom-in-95',
                  'focus:outline-none'
                )}
              >
                <div className="p-5 border-b border-[var(--border-default)] flex items-center justify-between">
                  <Dialog.Title className="text-lg font-semibold text-[var(--text-primary)]">
                    Create Campaign
                  </Dialog.Title>
                  <Dialog.Close asChild>
                    <Button variant="ghost" size="icon">
                      <X size={18} />
                    </Button>
                  </Dialog.Close>
                </div>
                <div className="p-5 space-y-4">
                  <div>
                    <Label htmlFor="modal-name">Campaign Name</Label>
                    <Input id="modal-name" placeholder="Enter campaign name" className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="modal-goal">Goal Amount</Label>
                    <Input id="modal-goal" placeholder="$0.00" className="mt-1.5" />
                  </div>
                </div>
                <div className="p-5 border-t border-[var(--border-default)] bg-[var(--bg-subtle)]/30 flex justify-end gap-3 rounded-b-xl">
                  <Dialog.Close asChild>
                    <Button variant="secondary">Cancel</Button>
                  </Dialog.Close>
                  <Button variant="primary">Create Campaign</Button>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </GlassCard>
      </section>

      {/* Code/API Key Display */}
      <section className="mb-10">
        <h2 className="text-heading text-[var(--text-primary)] mb-4">API Key Display</h2>
        <GlassCard>
          <div className="space-y-4">
            {[
              { label: 'Publishable Key', value: 'pk_live_amply_abc123def456ghi789' },
              { label: 'Secret Key', value: 'sk_live_amply_***************************', masked: true },
            ].map((key) => (
              <div key={key.label}>
                <p className="text-label text-[var(--text-muted)] mb-2">{key.label}</p>
                <div className="flex items-center gap-2">
                  <code className={cn(
                    'flex-1 px-4 py-2 rounded-md font-mono text-sm',
                    'bg-[var(--bg-subtle)] text-[var(--text-primary)]',
                    'border border-[var(--border-default)]'
                  )}>
                    {key.value}
                  </code>
                  <Button variant="secondary" size="icon" title="Copy">
                    <Copy size={16} />
                  </Button>
                  {key.masked && (
                    <Button variant="secondary" size="icon" title="Reveal">
                      <Eye size={16} />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </section>

      {/* Empty State */}
      <section className="mb-10">
        <h2 className="text-heading text-[var(--text-primary)] mb-4">Empty State</h2>
        <GlassCard>
          <div className="py-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amply-light/50 flex items-center justify-center">
              <Heart size={32} className="text-amply-teal" />
            </div>
            <h3 className="text-subheading text-[var(--text-primary)] mb-2">No donations yet</h3>
            <p className="text-body text-[var(--text-muted)] mb-6 max-w-sm mx-auto">
              Start receiving donations by creating your first campaign or sharing your donation page.
            </p>
            <div className="flex justify-center gap-3">
              <Button variant="primary">Create Campaign</Button>
              <Button variant="secondary">
                <ExternalLink size={16} /> Share Page
              </Button>
            </div>
          </div>
        </GlassCard>
      </section>
    </PageContainer>
  );
}
