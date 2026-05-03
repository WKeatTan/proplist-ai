// src/shared/types/user.types.ts
import type { AppLanguage, AppTheme, LoyaltyTier, UserRole } from '../enums';

export interface User {
  id: string;
  email: string;
  fullName?: string;
  role: UserRole;
  teamId?: string;
  referralCode?: string;
  preferredLanguage: AppLanguage;
  preferredTheme: AppTheme;
  loyaltyTier?: LoyaltyTier;
  createdAt: string;
}

export interface UpdatePreferencesInput {
  preferredLanguage?: AppLanguage;
  preferredTheme?: AppTheme;
}
