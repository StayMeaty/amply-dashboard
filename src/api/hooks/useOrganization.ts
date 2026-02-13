import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../client';
import { endpoints } from '../endpoints';
import type {
  OrganizationDetail,
  OrganizationUpdate,
  OrganizationSummary,
  DonationListResponse,
  LedgerListResponse,
  Fund,
  FundCreate,
  FundUpdate,
  FundListResponse,
} from '../types';

export function useOrganization() {
  const queryClient = useQueryClient();

  const {
    data: organization,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['organization', 'mine'],
    queryFn: () => apiClient.get<OrganizationDetail>(endpoints.organizations.mine),
  });

  const updateMutation = useMutation({
    mutationFn: (data: OrganizationUpdate) =>
      apiClient.patch<OrganizationDetail>(endpoints.organizations.mine, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organization'] });
    },
  });

  return {
    organization,
    isLoading,
    error,
    update: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    updateError: updateMutation.error,
  };
}

export function useOrganizationSummary() {
  return useQuery({
    queryKey: ['organization', 'summary'],
    queryFn: () => apiClient.get<OrganizationSummary>(endpoints.organizations.summary),
  });
}

interface DonationQueryParams {
  page?: number;
  pageSize?: number;
  status?: string;
  fundId?: string;
}

export function useOrganizationDonations(params: DonationQueryParams = {}) {
  const { page = 1, pageSize = 20, status, fundId } = params;

  const searchParams = new URLSearchParams();
  searchParams.set('page', String(page));
  searchParams.set('page_size', String(pageSize));
  if (status) searchParams.set('status', status);
  if (fundId) searchParams.set('fund_id', fundId);

  return useQuery({
    queryKey: ['organization', 'donations', params],
    queryFn: () =>
      apiClient.get<DonationListResponse>(
        `${endpoints.organizations.donations}?${searchParams.toString()}`
      ),
  });
}

interface LedgerQueryParams {
  page?: number;
  pageSize?: number;
  fundId?: string;
  entryType?: string;
}

export function useOrganizationLedger(params: LedgerQueryParams = {}) {
  const { page = 1, pageSize = 50, fundId, entryType } = params;

  const searchParams = new URLSearchParams();
  searchParams.set('page', String(page));
  searchParams.set('page_size', String(pageSize));
  if (fundId) searchParams.set('fund_id', fundId);
  if (entryType) searchParams.set('entry_type', entryType);

  return useQuery({
    queryKey: ['organization', 'ledger', params],
    queryFn: () =>
      apiClient.get<LedgerListResponse>(
        `${endpoints.organizations.ledger}?${searchParams.toString()}`
      ),
  });
}

export function useOrganizationFunds() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['organization', 'funds'],
    queryFn: () => apiClient.get<FundListResponse>(endpoints.organizations.funds),
  });

  const createMutation = useMutation({
    mutationFn: (data: FundCreate) =>
      apiClient.post<Fund>(endpoints.organizations.funds, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organization', 'funds'] });
      queryClient.invalidateQueries({ queryKey: ['organization', 'summary'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ fundId, data }: { fundId: string; data: FundUpdate }) =>
      apiClient.patch<Fund>(endpoints.organizations.fund(fundId), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organization', 'funds'] });
      queryClient.invalidateQueries({ queryKey: ['organization', 'summary'] });
    },
  });

  return {
    funds: data?.items ?? [],
    total: data?.total ?? 0,
    isLoading,
    error,
    create: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    createError: createMutation.error,
    update: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    updateError: updateMutation.error,
  };
}
