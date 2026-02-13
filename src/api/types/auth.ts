export type ContributorType = 'individual' | 'business' | 'fundraiser';
export type AccountType = 'contributor' | 'organization_admin';
export type DonorDisplayPreference = 'public_full' | 'public_anonymous' | 'private';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user_id: string;
}

export interface RegisterRequest {
  contributor_type: ContributorType;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  display_name?: string;
  company_name?: string;
  company_role?: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state_province_region?: string;
  postal_code: string;
  country_code: string;
  phone_number?: string;
  language_preference: string;
  default_donation_visibility: DonorDisplayPreference;
  marketing_consent: boolean;
}

export interface RegisterResponse {
  user_id: string;
  email: string;
  message: string;
}
