import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../client';
import { endpoints } from '../endpoints';
import type {
  Campaign,
  CampaignCreate,
  CampaignUpdate,
  CampaignListResponse,
} from '../types';

interface CampaignQueryParams {
  page?: number;
  pageSize?: number;
  status?: string;
}

export function useCampaigns(params: CampaignQueryParams = {}) {
  const { page = 1, pageSize = 20, status } = params;

  const searchParams = new URLSearchParams();
  searchParams.set('page', String(page));
  searchParams.set('page_size', String(pageSize));
  if (status) searchParams.set('status', status);

  return useQuery({
    queryKey: ['campaigns', params],
    queryFn: () =>
      apiClient.get<CampaignListResponse>(
        `${endpoints.campaigns.mine}?${searchParams.toString()}`
      ),
  });
}

export function useCampaign(campaignId: string) {
  return useQuery({
    queryKey: ['campaigns', campaignId],
    queryFn: () => apiClient.get<Campaign>(endpoints.campaigns.get(campaignId)),
    enabled: !!campaignId,
  });
}

export function useCampaignMutations() {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data: CampaignCreate) =>
      apiClient.post<Campaign>(endpoints.campaigns.mine, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: CampaignUpdate }) =>
      apiClient.patch<Campaign>(endpoints.campaigns.get(id), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
    },
  });

  return {
    create: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    createError: createMutation.error,
    update: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    updateError: updateMutation.error,
  };
}
