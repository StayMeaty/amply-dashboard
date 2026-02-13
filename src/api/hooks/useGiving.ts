import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../client';
import { endpoints } from '../endpoints';
import type { GivingHistoryResponse, GivingSummary } from '../types';

interface GivingHistoryParams {
  page?: number;
  pageSize?: number;
  status?: string;
}

export function useGivingHistory(params: GivingHistoryParams = {}) {
  const { page = 1, pageSize = 20, status } = params;

  const searchParams = new URLSearchParams();
  searchParams.set('page', String(page));
  searchParams.set('page_size', String(pageSize));
  if (status) searchParams.set('status', status);

  return useQuery({
    queryKey: ['giving', 'history', params],
    queryFn: () =>
      apiClient.get<GivingHistoryResponse>(
        `${endpoints.giving.history}?${searchParams.toString()}`
      ),
  });
}

export function useGivingSummary() {
  return useQuery({
    queryKey: ['giving', 'summary'],
    queryFn: () => apiClient.get<GivingSummary>(endpoints.giving.summary),
  });
}
