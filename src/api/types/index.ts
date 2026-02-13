export * from './auth';
export * from './user';
export * from './organization';

// Common API response wrapper
export interface ApiResponse<T> {
  data: T;
  meta?: {
    request_id: string;
  };
}

// Pagination
export interface PaginatedResponse<T> {
  data: T[];
  has_more: boolean;
  next_cursor?: string;
}

// Error response
export interface ApiError {
  error: {
    code: string;
    message: string;
    param?: string;
  };
}
