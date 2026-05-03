// src/shared/constants/query-keys.constants.ts
import { Endpoints } from './endpoints.constants';
import type { CmsGroup } from '../enums';

export const QueryKeys = {
  USER: () => [Endpoints.USER],
  USER_PREFERENCES: () => [Endpoints.USER_PREFERENCES],
  LISTINGS: (params?: Record<string, unknown>) =>
    params ? [Endpoints.LISTINGS, params] : [Endpoints.LISTINGS],
  LISTING_BY_ID: (id: string) => [Endpoints.LISTING_BY_ID(id)],
  PLANS: () => [Endpoints.PLANS],
  SUBSCRIPTION: () => [Endpoints.SUBSCRIPTION],
  NOTIFICATIONS: () => [Endpoints.NOTIFICATIONS],
  FEATURE_FLAGS: () => [Endpoints.FEATURE_FLAGS],
  ADMIN_DASHBOARD: () => [Endpoints.ADMIN_DASHBOARD],
  ADMIN_USERS: (params?: Record<string, unknown>) =>
    params ? [Endpoints.ADMIN_USERS, params] : [Endpoints.ADMIN_USERS],
  ADMIN_PLANS: () => [Endpoints.ADMIN_PLANS],
  ADMIN_FEATURE_FLAGS: () => [Endpoints.ADMIN_FEATURE_FLAGS],
  ADMIN_SETTINGS: () => [Endpoints.ADMIN_SETTINGS],
  ADMIN_CMS: (group?: CmsGroup) =>
    group ? [Endpoints.ADMIN_CMS, group] : [Endpoints.ADMIN_CMS],
  ADMIN_GROWTH_REFERRAL: () => [Endpoints.ADMIN_GROWTH_REFERRAL],
  ADMIN_GROWTH_LOYALTY: () => [Endpoints.ADMIN_GROWTH_LOYALTY],
} as const;
