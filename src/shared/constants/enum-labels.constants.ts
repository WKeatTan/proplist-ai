// src/shared/constants/enum-labels.constants.ts
import {
  AppLanguage,
  FeatureFlagStatus,
  ListingStatus,
  LoyaltyTier,
  NotificationType,
  Platform,
  PlanType,
  PropertyType,
  SubscriptionStatus,
  UserRole,
} from '../enums';

// Generic translator — use with any label map below
export function translateEnum<T extends string>(
  labelMap: Record<T, { en: string; zh: string }>,
  value: T,
  locale: AppLanguage
): string {
  return labelMap[value]?.[locale] ?? value;
}

export const PlatformLabel: Record<Platform, { en: string; zh: string }> = {
  [Platform.PROPERTY_GURU]: { en: 'PropertyGuru', zh: 'PropertyGuru' },
  [Platform.NINETY_NINE_CO]: { en: '99.co', zh: '99.co' },
  [Platform.FACEBOOK]: { en: 'Facebook', zh: 'Facebook' },
  [Platform.WHATSAPP]: { en: 'WhatsApp', zh: 'WhatsApp' },
  [Platform.INSTAGRAM]: { en: 'Instagram', zh: 'Instagram' },
  [Platform.TWITTER]: { en: 'X (Twitter)', zh: 'X (推特)' },
  [Platform.XIAOHONGSHU]: { en: 'RedNote', zh: '小红书' },
};

export const PlanLabel: Record<PlanType, { en: string; zh: string }> = {
  [PlanType.FREE]: { en: 'Free', zh: '免费版' },
  [PlanType.STARTER]: { en: 'Starter', zh: '入门版' },
  [PlanType.PRO]: { en: 'Pro', zh: '专业版' },
  [PlanType.TEAM]: { en: 'Team', zh: '团队版' },
};

export const ListingStatusLabel: Record<ListingStatus, { en: string; zh: string }> = {
  [ListingStatus.DRAFT]: { en: 'Draft', zh: '草稿' },
  [ListingStatus.ACTIVE]: { en: 'Active', zh: '上架中' },
  [ListingStatus.ARCHIVED]: { en: 'Archived', zh: '已下架' },
};

export const PropertyTypeLabel: Record<PropertyType, { en: string; zh: string }> = {
  [PropertyType.HDB]: { en: 'HDB', zh: 'HDB 组屋' },
  [PropertyType.CONDO]: { en: 'Condo', zh: '私人公寓' },
  [PropertyType.LANDED]: { en: 'Landed', zh: '有地住宅' },
  [PropertyType.COMMERCIAL]: { en: 'Commercial', zh: '商业地产' },
};

export const LoyaltyTierLabel: Record<LoyaltyTier, { en: string; zh: string }> = {
  [LoyaltyTier.BRONZE]: { en: 'Bronze', zh: '铜牌' },
  [LoyaltyTier.SILVER]: { en: 'Silver', zh: '银牌' },
  [LoyaltyTier.GOLD]: { en: 'Gold', zh: '金牌' },
  [LoyaltyTier.PLATINUM]: { en: 'Platinum', zh: '铂金牌' },
};

export const NotificationTypeLabel: Record<NotificationType, { en: string; zh: string }> = {
  [NotificationType.TRIAL_EXPIRING]: { en: 'Trial Expiring', zh: '试用即将到期' },
  [NotificationType.QUOTA_WARNING]: { en: 'Quota Warning', zh: '用量提醒' },
  [NotificationType.UPGRADE_SUCCESS]: { en: 'Upgrade Successful', zh: '升级成功' },
  [NotificationType.REFERRAL_REWARD]: { en: 'Reward Received', zh: '奖励已到账' },
  [NotificationType.LOYALTY_UPGRADE]: { en: 'Tier Upgraded!', zh: '等级升级！' },
  [NotificationType.ANNOUNCEMENT]: { en: 'Announcement', zh: '公告' },
  [NotificationType.PAYMENT_FAILED]: { en: 'Payment Failed', zh: '扣款失败' },
};

export const SubscriptionStatusLabel: Record<SubscriptionStatus, { en: string; zh: string }> = {
  [SubscriptionStatus.TRIALING]: { en: 'Trial', zh: '试用中' },
  [SubscriptionStatus.ACTIVE]: { en: 'Active', zh: '已订阅' },
  [SubscriptionStatus.PAST_DUE]: { en: 'Past Due', zh: '待付款' },
  [SubscriptionStatus.CANCELED]: { en: 'Canceled', zh: '已取消' },
};

export const UserRoleLabel: Record<UserRole, { en: string; zh: string }> = {
  [UserRole.USER]: { en: 'User', zh: '普通用户' },
  [UserRole.TEAM_MEMBER]: { en: 'Team Member', zh: '团队成员' },
  [UserRole.TEAM_OWNER]: { en: 'Team Owner', zh: '团队管理员' },
  [UserRole.ADMIN]: { en: 'Admin', zh: '管理员' },
  [UserRole.SUPER_ADMIN]: { en: 'Super Admin', zh: '超级管理员' },
};

export const FeatureFlagStatusLabel: Record<FeatureFlagStatus, { en: string; zh: string }> = {
  [FeatureFlagStatus.ENABLED]: { en: 'Enabled', zh: '已开启' },
  [FeatureFlagStatus.DISABLED]: { en: 'Disabled', zh: '已关闭' },
  [FeatureFlagStatus.MAINTENANCE]: { en: 'Maintenance', zh: '维护中' },
};
