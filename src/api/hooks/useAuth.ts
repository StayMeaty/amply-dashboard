import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { apiClient } from '../client';
import { endpoints } from '../endpoints';
import { useAuthStore } from '@/stores/auth';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  User,
} from '../types';

export function useAuth() {
  const queryClient = useQueryClient();
  const { token, setAuth, logout: storeLogout, setLoading } = useAuthStore();

  // Fetch current user when we have a token
  const {
    data: user,
    isLoading: isLoadingUser,
    error: userError,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: () => apiClient.get<User>(endpoints.auth.me),
    enabled: !!token,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Sync user data to store when fetched
  useEffect(() => {
    if (user && token) {
      setAuth(token, user);
    }
  }, [user, token, setAuth]);

  // Handle auth errors (token expired)
  useEffect(() => {
    if (userError && token) {
      storeLogout();
    }
  }, [userError, token, storeLogout]);

  // Set loading state
  useEffect(() => {
    if (!token) {
      setLoading(false);
    } else {
      setLoading(isLoadingUser);
    }
  }, [token, isLoadingUser, setLoading]);

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: (data: LoginRequest) =>
      apiClient.post<LoginResponse>(endpoints.auth.login, data),
    onSuccess: async (response) => {
      // Temporarily set token to fetch user
      useAuthStore.setState({ token: response.access_token });

      // Fetch user data
      const userData = await apiClient.get<User>(endpoints.auth.me);
      setAuth(response.access_token, userData);

      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: (data: RegisterRequest) =>
      apiClient.post<RegisterResponse>(endpoints.auth.register, data),
  });

  // Logout
  const logout = () => {
    storeLogout();
    queryClient.clear();
  };

  return {
    user,
    isLoading: isLoadingUser,
    isAuthenticated: !!token && !!user,
    login: loginMutation.mutateAsync,
    loginError: loginMutation.error,
    isLoggingIn: loginMutation.isPending,
    register: registerMutation.mutateAsync,
    registerError: registerMutation.error,
    isRegistering: registerMutation.isPending,
    logout,
    refetchUser,
  };
}
