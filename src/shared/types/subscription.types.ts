// src/shared/types/subscription.types.ts
import type { PlanType, SubscriptionStatus } from '../enums';

export interface Plan {
  id: string;
  type: PlanType;
  name: string;
  description?: string;
  priceSgd: number;
  monthlyQuota: number;
  trialDays: number;
  features: Record<string, boolean>;
  stripePriceId?: string;
  isVisible: boolean;
}

export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  planType: PlanType;
  planName: string;
  status: SubscriptionStatus;
  trialStart?: string;
  trialEnd?: string;
  trialDaysLeft?: number;
  currentPeriodEnd?: string;
  usage: {
    used: number;
    limit: number;
    percentage: number;
  };
}

// src/shared/types/notification.types.ts
import type { NotificationType } from '../enums';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body?: string;
  link?: string;
  isRead: boolean;
  createdAt: string;
}
