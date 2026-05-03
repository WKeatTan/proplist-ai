// src/shared/constants/platform.constants.ts
import { AppLanguage, Platform, PlanType } from '../enums';

export const PlatformConfig: Record<
  Platform,
  { label: Record<AppLanguage, string>; maxChars: number; maxHashtags?: number }
> = {
  [Platform.PROPERTY_GURU]: {
    label: { en: 'PropertyGuru', zh: 'PropertyGuru' },
    maxChars: 2000,
  },
  [Platform.NINETY_NINE_CO]: {
    label: { en: '99.co', zh: '99.co' },
    maxChars: 1500,
  },
  [Platform.FACEBOOK]: {
    label: { en: 'Facebook', zh: 'Facebook' },
    maxChars: 500,
  },
  [Platform.WHATSAPP]: {
    label: { en: 'WhatsApp', zh: 'WhatsApp' },
    maxChars: 200,
  },
  [Platform.INSTAGRAM]: {
    label: { en: 'Instagram', zh: 'Instagram' },
    maxChars: 300,
    maxHashtags: 20,
  },
  [Platform.TWITTER]: {
    label: { en: 'X (Twitter)', zh: 'X (推特)' },
    maxChars: 240,
  },
  [Platform.XIAOHONGSHU]: {
    label: { en: 'RedNote', zh: '小红书' },
    maxChars: 400,
    maxHashtags: 5,
  },
};

// Platforms available per plan
export const PlanPlatformAccess: Record<PlanType, Platform[]> = {
  [PlanType.FREE]: [Platform.PROPERTY_GURU, Platform.NINETY_NINE_CO],
  [PlanType.STARTER]: [
    Platform.PROPERTY_GURU,
    Platform.NINETY_NINE_CO,
    Platform.FACEBOOK,
    Platform.WHATSAPP,
  ],
  [PlanType.PRO]: Object.values(Platform),
  [PlanType.TEAM]: Object.values(Platform),
};
