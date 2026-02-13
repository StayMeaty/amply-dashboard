import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GlassCard } from '@/components/glass/GlassCard';
import { SlideContainer } from '@/components/registration/SlideContainer';
import {
  TypeSlide,
  CredentialsSlide,
  NameSlide,
  CompanySlide,
  AddressSlide,
  ContactSlide,
  PreferencesSlide,
  WelcomeSlide,
} from '@/components/registration/slides';
import { useAuth } from '@/api/hooks/useAuth';
import type { ContributorType, DonorDisplayPreference, RegisterRequest } from '@/api/types';

interface FormData {
  contributorType: ContributorType | null;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  displayName: string;
  companyName: string;
  companyRole: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  stateProvinceRegion: string;
  postalCode: string;
  countryCode: string;
  phoneNumber: string;
  languagePreference: string;
  defaultDonationVisibility: DonorDisplayPreference;
  marketingConsent: boolean;
}

const initialFormData: FormData = {
  contributorType: null,
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
  displayName: '',
  companyName: '',
  companyRole: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  stateProvinceRegion: '',
  postalCode: '',
  countryCode: '',
  phoneNumber: '',
  languagePreference: 'en',
  defaultDonationVisibility: 'public_full',
  marketingConsent: false,
};

export function Register() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register, isRegistering, registerError } = useAuth();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isComplete, setIsComplete] = useState(false);

  const isBusiness = formData.contributorType === 'business';
  // Slides: Type, Credentials, Name, [Company], Address, Contact, Preferences
  const totalSlides = isBusiness ? 7 : 6;

  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Map slide index to actual slide, skipping Company for non-business
  const getSlideIndex = (index: number): number => {
    if (!isBusiness && index >= 3) {
      return index + 1; // Skip company slide (index 3)
    }
    return index;
  };

  const handleNext = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handleBack = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleSubmit = async () => {
    if (!formData.contributorType) return;

    const request: RegisterRequest = {
      contributor_type: formData.contributorType,
      email: formData.email,
      password: formData.password,
      first_name: formData.firstName,
      last_name: formData.lastName,
      display_name: formData.displayName || undefined,
      company_name: formData.companyName || undefined,
      company_role: formData.companyRole || undefined,
      address_line_1: formData.addressLine1,
      address_line_2: formData.addressLine2 || undefined,
      city: formData.city,
      state_province_region: formData.stateProvinceRegion || undefined,
      postal_code: formData.postalCode,
      country_code: formData.countryCode,
      phone_number: formData.phoneNumber || undefined,
      language_preference: formData.languagePreference,
      default_donation_visibility: formData.defaultDonationVisibility,
      marketing_consent: formData.marketingConsent,
    };

    try {
      await register(request);
      setIsComplete(true);
    } catch {
      // Error handled by mutation
    }
  };

  const renderSlide = () => {
    if (isComplete) {
      return <WelcomeSlide email={formData.email} onContinue={() => navigate('/login')} />;
    }

    const slideIndex = getSlideIndex(currentSlide);

    switch (slideIndex) {
      case 0:
        return (
          <TypeSlide
            value={formData.contributorType}
            onChange={(type) => updateField('contributorType', type)}
            onNext={handleNext}
          />
        );
      case 1:
        return (
          <CredentialsSlide
            email={formData.email}
            password={formData.password}
            confirmPassword={formData.confirmPassword}
            onChange={(field, value) => updateField(field, value)}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 2:
        return (
          <NameSlide
            firstName={formData.firstName}
            lastName={formData.lastName}
            displayName={formData.displayName}
            onChange={(field, value) => updateField(field, value)}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <CompanySlide
            companyName={formData.companyName}
            companyRole={formData.companyRole}
            onChange={(field, value) => updateField(field, value)}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <AddressSlide
            addressLine1={formData.addressLine1}
            addressLine2={formData.addressLine2}
            city={formData.city}
            stateProvinceRegion={formData.stateProvinceRegion}
            postalCode={formData.postalCode}
            countryCode={formData.countryCode}
            onChange={(field, value) => updateField(field, value)}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 5:
        return (
          <ContactSlide
            phoneNumber={formData.phoneNumber}
            languagePreference={formData.languagePreference}
            onChange={(field, value) => updateField(field, value)}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 6:
        return (
          <PreferencesSlide
            defaultDonationVisibility={formData.defaultDonationVisibility}
            marketingConsent={formData.marketingConsent}
            onChange={(field, value) =>
              updateField(field, value as DonorDisplayPreference | boolean)
            }
            onSubmit={handleSubmit}
            onBack={handleBack}
            isSubmitting={isRegistering}
            error={registerError instanceof Error ? registerError : null}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: 'var(--bg-gradient)' }}
    >
      <GlassCard className="w-full max-w-lg" padding="lg">
        {!isComplete && (
          <div className="text-center mb-6">
            <img
              src="/dashboard/logo.svg"
              alt="Amply"
              className="h-7 mx-auto"
              style={{ filter: 'var(--logo-filter)' }}
            />
          </div>
        )}

        <SlideContainer currentSlide={currentSlide} totalSlides={isComplete ? 1 : totalSlides}>
          {renderSlide()}
        </SlideContainer>

        {!isComplete && currentSlide === 0 && (
          <div className="mt-6 text-center text-sm text-[var(--text-muted)]">
            {t('register.haveAccount')}{' '}
            <Link to="/login" className="text-amply-teal hover:underline">
              {t('register.signIn')}
            </Link>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
