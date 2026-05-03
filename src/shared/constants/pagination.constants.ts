// src/shared/constants/pagination.constants.ts
export const PaginationConfig = {
  DEFAULT: 20,
  LISTINGS: 20,
  ADMIN_USERS: 50,
  ADMIN_LISTINGS: 50,
  NOTIFICATIONS: 10,
  AUDIT_LOGS: 100,
  OPTIONS: [10, 20, 50, 100] as const,
  MAX: 100,
} as const;
