import type { AccountType, ContributorType } from './auth';

export type OrganizationReviewStatus = 'pending' | 'approved' | 'rejected' | 'info_requested';

export interface Organization {
  id: string;
  name: string;
  slug: string;
  review_status: OrganizationReviewStatus;
  is_public: boolean;
  stripe_charges_enabled: boolean;
}

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  display_name: string | null;
  is_email_verified: boolean;
  account_type: AccountType;
  contributor_type: ContributorType | null;
  company_name: string | null;
  city: string | null;
  country_code: string | null;
  language_preference: string;
  timezone: string;
  onboarding_completed: boolean;
  organization: Organization | null;
}
