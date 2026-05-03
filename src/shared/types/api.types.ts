// src/shared/types/api.types.ts
import type { ErrorCode } from '../enums';

export interface ApiResponse<T = null> {
  data: T | null;
  error?: {
    code: ErrorCode;
    message: string;
    details?: Record<string, string[]>;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
}
