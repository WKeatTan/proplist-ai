// src/shared/constants/plan.constants.ts
import { Platform, PlanType } from '../enums';

export const PlanConfig: Record<
  PlanType,
  {
    monthlyQuota: number; // -1 = unlimited
    trialDays: number;
    maxTeamMembers: number;
    features: {
      bilingual: boolean;
      imageDescription: boolean;
      versionHistory: boolean;
      prioritySupport: boolean;
      teamSharing: boolean;
    };
  }
> = {
  [PlanType.FREE]: {
    monthlyQuota: 10,
    trialDays: 0,
    maxTeamMembers: 0,
    features: {
      bilingual: false,
      imageDescription: false,
      versionHistory: false,
      prioritySupport: false,
      teamSharing: false,
    },
  },
  [PlanType.STARTER]: {
    monthlyQuota: 100,
    trialDays: 7,
    maxTeamMembers: 0,
    features: {
      bilingual: true,
      imageDescription: false,
      versionHistory: true,
      prioritySupport: false,
      teamSharing: false,
    },
  },
  [PlanType.PRO]: {
    monthlyQuota: -1,
    trialDays: 14,
    maxTeamMembers: 0,
    features: {
      bilingual: true,
      imageDescription: true,
      versionHistory: true,
      prioritySupport: true,
      teamSharing: false,
    },
  },
  [PlanType.TEAM]: {
    monthlyQuota: -1,
    trialDays: 14,
    maxTeamMembers: 5,
    features: {
      bilingual: true,
      imageDescription: true,
      versionHistory: true,
      prioritySupport: true,
      teamSharing: true,
    },
  },
};
