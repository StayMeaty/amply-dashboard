import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../client';
import { endpoints } from '../endpoints';
import type { Widget, WidgetCreate, WidgetUpdate, WidgetListResponse } from '../types';

interface WidgetQueryParams {
  page?: number;
  pageSize?: number;
}

export function useWidgets(params: WidgetQueryParams = {}) {
  const { page = 1, pageSize = 20 } = params;

  const searchParams = new URLSearchParams();
  searchParams.set('page', String(page));
  searchParams.set('page_size', String(pageSize));

  return useQuery({
    queryKey: ['widgets', params],
    queryFn: () =>
      apiClient.get<WidgetListResponse>(
        `${endpoints.widgets.mine}?${searchParams.toString()}`
      ),
  });
}

export function useWidget(widgetId: string) {
  return useQuery({
    queryKey: ['widgets', widgetId],
    queryFn: () => apiClient.get<Widget>(endpoints.widgets.get(widgetId)),
    enabled: !!widgetId,
  });
}

export function useWidgetMutations() {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data: WidgetCreate) =>
      apiClient.post<Widget>(endpoints.widgets.mine, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['widgets'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: WidgetUpdate }) =>
      apiClient.patch<Widget>(endpoints.widgets.get(id), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['widgets'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiClient.delete(endpoints.widgets.get(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['widgets'] });
    },
  });

  return {
    create: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    update: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    remove: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
}
