// src/shared/constants/routes.constants.ts
import type { CmsGroup } from '../enums';

export const Routes = {
  // Marketing
  HOME: '/',
  PRICING: '/pricing',
  ABOUT: '/about',
  TERMS: '/terms',
  PRIVACY: '/privacy',
  CONTACT: '/contact',
  MAINTENANCE: '/maintenance',

  // Auth
  LOGIN: '/login',
  REGISTER: '/register',
  AUTH_CALLBACK: '/callback',

  // Dashboard
  DASHBOARD: '/dashboard',
  LISTINGS: '/dashboard/listings',
  LISTING_NEW: '/dashboard/listings/new',
  LISTING_DETAIL: (id: string) => `/dashboard/listings/${id}`,
  LISTING_EDIT: (id: string) => `/dashboard/listings/${id}/edit`,
  BILLING: '/dashboard/billing',
  BILLING_UPGRADE: '/dashboard/billing/upgrade',
  SETTINGS: '/dashboard/settings',
  REFERRAL: '/dashboard/settings/referral',
  TEAM: '/dashboard/team',
  TEAM_SETTINGS: '/dashboard/team/settings',

  // Admin
  ADMIN: '/admin',
  ADMIN_USERS: '/admin/users',
  ADMIN_USER_DETAIL: (id: string) => `/admin/users/${id}`,
  ADMIN_PLANS: '/admin/plans',
  ADMIN_PLAN_DETAIL: (id: string) => `/admin/plans/${id}`,
  ADMIN_FEATURE_FLAGS: '/admin/feature-flags',
  ADMIN_SETTINGS: '/admin/settings',
  ADMIN_CMS: '/admin/cms',
  ADMIN_CMS_GROUP: (group: CmsGroup) => `/admin/cms?group=${group}`,
  ADMIN_GROWTH_REFERRAL: '/admin/growth/referral',
  ADMIN_GROWTH_LOYALTY: '/admin/growth/loyalty',
  ADMIN_PROMOTIONS: '/admin/growth/promotions',
} as const;

export const RouteGroups = {
  DASHBOARD: '/dashboard',
  ADMIN: '/admin',
  AUTH: ['/login', '/register', '/callback'],
} as const;
