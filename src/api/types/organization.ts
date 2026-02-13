// ===== Organization Types =====

export type OrganizationType =
  | 'nonprofit'
  | 'charity'
  | 'foundation'
  | 'association'
  | 'ngo'
  | 'fiscally_sponsored';

export type OrganizationReviewStatus =
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'info_requested';

export type VerificationStatus = 'unverified' | 'pending' | 'verified' | 'rejected';

export type FundType = 'general' | 'project' | 'restricted' | 'emergency';

export type LedgerEntryType =
  | 'genesis'
  | 'donation_received'
  | 'refund_issued'
  | 'adjustment';

// ===== Organization =====

export interface OrganizationDetail {
  id: string;
  slug: string;
  name: string;
  display_name: string | null;
  organization_type: OrganizationType;
  description: string | null;
  mission_statement: string | null;
  website_url: string | null;
  contact_email: string;
  contact_phone: string | null;
  logo_url: string | null;
  banner_url: string | null;
  address_line_1: string | null;
  address_line_2: string | null;
  city: string | null;
  state_province_region: string | null;
  postal_code: string | null;
  country_code: string | null;
  status: string;
  review_status: OrganizationReviewStatus | null;
  verification_status: VerificationStatus;
  verification_level: string | null;
  can_receive_donations: boolean;
  is_public: boolean;
  stripe_charges_enabled: boolean;
  stripe_payouts_enabled: boolean;
  default_currency: string;
  sdgs: number[];
  tax_id: string | null;
  legal_name: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrganizationUpdate {
  display_name?: string;
  description?: string;
  mission_statement?: string;
  website_url?: string;
  contact_email?: string;
  contact_phone?: string;
  logo_url?: string;
  banner_url?: string;
  address_line_1?: string;
  address_line_2?: string;
  city?: string;
  state_province_region?: string;
  postal_code?: string;
  primary_color?: string;
  sdgs?: number[];
}

// ===== Dashboard Summary =====

export interface FundSummary {
  id: string;
  name: string;
  balance: number;
  currency: string;
  is_default: boolean;
}

export interface DonationSummary {
  id: string;
  amount: number;
  currency: string;
  donor_name: string;
  donor_display_preference: string;
  completed_at: string | null;
}

export interface OrganizationSummary {
  total_donations: number;
  total_amount: number;
  currency: string;
  pending_amount: number;
  this_month_amount: number;
  this_month_count: number;
  funds: FundSummary[];
  recent_donations: DonationSummary[];
}

// ===== Fund =====

export interface Fund {
  id: string;
  organization_id: string;
  name: string;
  description: string | null;
  fund_type: FundType;
  currency: string;
  current_amount: number;
  goal_amount: number | null;
  is_default: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface FundCreate {
  name: string;
  description?: string;
  fund_type?: FundType;
  currency?: string;
  goal_amount?: number;
  is_active?: boolean;
}

export interface FundUpdate {
  name?: string;
  description?: string;
  goal_amount?: number;
  is_active?: boolean;
}

export interface FundListResponse {
  items: Fund[];
  total: number;
  has_more: boolean;
}

// ===== Donations =====

export interface DonationListItem {
  id: string;
  amount: number;
  fee_amount: number;
  net_amount: number;
  currency: string;
  status: string;
  donor_email: string;
  donor_first_name: string;
  donor_last_name: string;
  donor_display_preference: string;
  fund_id: string | null;
  fund_name: string | null;
  payment_method_type: string | null;
  completed_at: string | null;
  created_at: string;
}

export interface DonationListResponse {
  items: DonationListItem[];
  total: number;
  page: number;
  page_size: number;
  has_more: boolean;
}

// ===== Ledger =====

export interface LedgerEntry {
  id: string;
  sequence_number: number;
  entry_type: LedgerEntryType;
  amount: number;
  currency: string;
  description: string | null;
  reference_type: string | null;
  reference_id: string | null;
  fund_id: string;
  fund_name: string;
  visibility: string;
  created_at: string;
}

export interface LedgerListResponse {
  items: LedgerEntry[];
  total: number;
  page: number;
  page_size: number;
  has_more: boolean;
}

// ===== Campaign Types =====

export type CampaignStatus = 'draft' | 'active' | 'paused' | 'completed' | 'cancelled';
export type CampaignType = 'fundraiser' | 'project' | 'emergency' | 'recurring';

export interface Campaign {
  id: string;
  organization_id: string;
  fund_id: string | null;
  slug: string;
  title: string;
  type: CampaignType;
  status: CampaignStatus;
  short_description: string | null;
  story: string | null;
  cover_image_url: string | null;
  video_url: string | null;
  goal_amount: number;
  current_amount: number;
  currency: string;
  donation_count: number;
  starts_at: string | null;
  ends_at: string | null;
  is_public: boolean;
  is_featured: boolean;
  sdgs: number[] | null;
  created_at: string;
  updated_at: string;
  progress_percent: number;
}

export interface CampaignCreate {
  title: string;
  type?: CampaignType;
  short_description?: string;
  story?: string;
  cover_image_url?: string;
  video_url?: string;
  goal_amount: number;
  currency?: string;
  starts_at?: string;
  ends_at?: string;
  is_public?: boolean;
  fund_id?: string;
  sdgs?: number[];
}

export interface CampaignUpdate {
  title?: string;
  short_description?: string;
  story?: string;
  cover_image_url?: string;
  video_url?: string;
  goal_amount?: number;
  starts_at?: string;
  ends_at?: string;
  is_public?: boolean;
  status?: CampaignStatus;
  sdgs?: number[];
}

export interface CampaignListResponse {
  items: Campaign[];
  total: number;
  page: number;
  page_size: number;
  has_more: boolean;
}

// ===== Giving History Types =====

export interface GivingHistoryItem {
  id: string;
  organization_id: string;
  organization_name: string;
  fund_id: string | null;
  fund_name: string | null;
  campaign_id: string | null;
  campaign_title: string | null;
  amount: number;
  net_amount: number;
  currency: string;
  status: string;
  message: string | null;
  covers_fee: boolean;
  receipt_number: string | null;
  receipt_issued_at: string | null;
  created_at: string;
  completed_at: string | null;
}

export interface GivingHistoryResponse {
  items: GivingHistoryItem[];
  total: number;
  page: number;
  page_size: number;
  has_more: boolean;
}

export interface GivingSummary {
  total_donated: number;
  total_donations: number;
  total_organizations: number;
  currency: string;
}

// ===== Widget Types =====

export type WidgetType = 'donation_button' | 'donation_form' | 'progress_bar' | 'leaderboard' | 'recent_donations';
export type WidgetTheme = 'light' | 'dark' | 'auto';

export interface Widget {
  id: string;
  organization_id: string;
  fund_id: string | null;
  campaign_id: string | null;
  name: string;
  type: WidgetType;
  theme: WidgetTheme;
  primary_color: string | null;
  button_text: string | null;
  show_goal: boolean;
  show_donors: boolean;
  show_recent: boolean;
  preset_amounts: number[] | null;
  custom_css: string | null;
  is_active: boolean;
  embed_count: number;
  created_at: string;
  updated_at: string;
  embed_code: string;
}

export interface WidgetCreate {
  name: string;
  type?: WidgetType;
  fund_id?: string;
  campaign_id?: string;
  theme?: WidgetTheme;
  primary_color?: string;
  button_text?: string;
  show_goal?: boolean;
  show_donors?: boolean;
  show_recent?: boolean;
  preset_amounts?: number[];
  custom_css?: string;
}

export interface WidgetUpdate {
  name?: string;
  theme?: WidgetTheme;
  primary_color?: string;
  button_text?: string;
  show_goal?: boolean;
  show_donors?: boolean;
  show_recent?: boolean;
  preset_amounts?: number[];
  custom_css?: string;
  is_active?: boolean;
}

export interface WidgetListResponse {
  items: Widget[];
  total: number;
  page: number;
  page_size: number;
  has_more: boolean;
}
