// ─────────────────────────────────────────────────────────────────────────────
// src/shared/enums/index.ts
// ALL enums live here. Import from this file everywhere — never hardcode strings.
// ─────────────────────────────────────────────────────────────────────────────

// ── User ──────────────────────────────────────────
export enum UserRole {
  USER = 'user',
  TEAM_MEMBER = 'team_member',
  TEAM_OWNER = 'team_owner',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
}

// ── Platform ──────────────────────────────────────
export enum Platform {
  PROPERTY_GURU = 'propertyguru',
  NINETY_NINE_CO = '99co',
  FACEBOOK = 'facebook',
  WHATSAPP = 'whatsapp',
  INSTAGRAM = 'instagram',
  TWITTER = 'twitter',
  XIAOHONGSHU = 'xiaohongshu',
}

// ── Plan / Subscription ───────────────────────────
export enum PlanType {
  FREE = 'free',
  STARTER = 'starter',
  PRO = 'pro',
  TEAM = 'team',
}

export enum SubscriptionStatus {
  TRIALING = 'trialing',
  ACTIVE = 'active',
  PAST_DUE = 'past_due',
  CANCELED = 'canceled',
}

// ── Listing ───────────────────────────────────────
export enum ListingStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  ARCHIVED = 'archived',
}

export enum PropertyType {
  HDB = 'hdb',
  CONDO = 'condo',
  LANDED = 'landed',
  COMMERCIAL = 'commercial',
}

export enum ListingLanguage {
  EN = 'en',
  ZH = 'zh',
  BOTH = 'both',
}

// ── App preferences ───────────────────────────────
export enum AppLanguage {
  EN = 'en',
  ZH = 'zh',
}

export enum AppTheme {
  LIGHT = 'light',
  DARK = 'dark',
}

// ── Feature Flags ─────────────────────────────────
export enum FeatureFlag {
  AI_GENERATION = 'ai_generation',
  CHINESE_OUTPUT = 'chinese_output',
  NEW_REGISTRATION = 'new_registration',
  FREE_TRIAL = 'free_trial',
  AI_SUPPORT = 'ai_support',
  MAINTENANCE_MODE = 'maintenance_mode',
  PLATFORM_PROPERTYGURU = 'platform_propertyguru',
  PLATFORM_99CO = 'platform_99co',
  PLATFORM_FACEBOOK = 'platform_facebook',
  PLATFORM_WHATSAPP = 'platform_whatsapp',
  PLATFORM_INSTAGRAM = 'platform_instagram',
  PLATFORM_TWITTER = 'platform_twitter',
  PLATFORM_XIAOHONGSHU = 'platform_xiaohongshu',
  IMAGE_ENHANCEMENT = 'image_enhancement',
  VIDEO_GENERATION = 'video_generation',
  SOCIAL_SCHEDULING = 'social_scheduling',
}

export enum FeatureFlagStatus {
  ENABLED = 'enabled',      // Normal — UI visible and usable
  DISABLED = 'disabled',    // Hidden — UI not shown at all
  MAINTENANCE = 'maintenance', // Visible but greyed out with tooltip
}

// ── Notifications ─────────────────────────────────
export enum NotificationType {
  TRIAL_EXPIRING = 'trial_expiring',
  QUOTA_WARNING = 'quota_warning',
  UPGRADE_SUCCESS = 'upgrade_success',
  REFERRAL_REWARD = 'referral_reward',
  LOYALTY_UPGRADE = 'loyalty_upgrade',
  ANNOUNCEMENT = 'announcement',
  PAYMENT_FAILED = 'payment_failed',
}

// ── Growth ────────────────────────────────────────
export enum RewardType {
  STRIPE_CREDIT = 'stripe_credit',
  FREE_MONTHS = 'free_months',
  PAYNOW = 'paynow',
}

export enum LoyaltyTier {
  BRONZE = 'bronze',
  SILVER = 'silver',
  GOLD = 'gold',
  PLATINUM = 'platinum',
}

export enum ReferralStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
}

export enum RewardStatus {
  PENDING = 'pending',
  APPLIED = 'applied',
  PAID = 'paid',
}

// ── CMS ───────────────────────────────────────────
export enum CmsGroup {
  BRANDING = 'branding',
  LANDING = 'landing',
  BANNER = 'banner',
  LEGAL = 'legal',
  CONTACT = 'contact',
}

export enum CmsContentType {
  TEXT = 'text',
  RICHTEXT = 'richtext',
  IMAGE = 'image',
  JSON = 'json',
  BOOLEAN = 'boolean',
}

export enum CmsKey {
  APP_NAME = 'branding.app_name',
  TAGLINE = 'branding.tagline',
  LOGO_URL = 'branding.logo_url',
  FAVICON_URL = 'branding.favicon_url',
  OG_IMAGE_URL = 'branding.og_image_url',
  HERO_TITLE = 'landing.hero_title',
  HERO_SUBTITLE = 'landing.hero_subtitle',
  HERO_CTA = 'landing.hero_cta',
  FEATURES = 'landing.features',
  TESTIMONIALS = 'landing.testimonials',
  FAQ = 'landing.faq',
  PROMO_ENABLED = 'banner.promo_enabled',
  PROMO_TEXT = 'banner.promo_text',
  PROMO_LINK = 'banner.promo_link',
  PROMO_COLOR = 'banner.promo_color',
  NEWS_ENABLED = 'news.enabled',
  NEWS_ITEMS = 'news.items',
  ABOUT_US = 'legal.about_us',
  TERMS = 'legal.terms',
  PRIVACY = 'legal.privacy',
  CONTACT_EMAIL = 'contact.email',
  CONTACT_WHATSAPP = 'contact.whatsapp',
}

// ── Stripe ────────────────────────────────────────
export enum StripeWebhookEvent {
  CHECKOUT_COMPLETED = 'checkout.session.completed',
  INVOICE_PAYMENT_SUCCEEDED = 'invoice.payment_succeeded',
  INVOICE_PAYMENT_FAILED = 'invoice.payment_failed',
  SUBSCRIPTION_DELETED = 'customer.subscription.deleted',
  SUBSCRIPTION_UPDATED = 'customer.subscription.updated',
}

// ── Error codes ───────────────────────────────────
export enum ErrorCode {
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  SESSION_EXPIRED = 'SESSION_EXPIRED',
  FEATURE_DISABLED = 'FEATURE_DISABLED',
  FEATURE_MAINTENANCE = 'FEATURE_MAINTENANCE',
  PLAN_UPGRADE_REQUIRED = 'PLAN_UPGRADE_REQUIRED',
  QUOTA_EXCEEDED = 'QUOTA_EXCEEDED',
  NOT_FOUND = 'NOT_FOUND',
  ALREADY_EXISTS = 'ALREADY_EXISTS',
  OWNERSHIP_DENIED = 'OWNERSHIP_DENIED',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
}

// ── Misc ──────────────────────────────────────────
export enum Currency {
  SGD = 'SGD',
  MYR = 'MYR',
}

export enum Market {
  SG = 'sg',
  MY = 'my',
}

export enum StorageBucket {
  CMS = 'cms',
  AVATAR = 'avatars',
  IMAGES = 'listing-images',
}

export enum CookieKey {
  PREFERRED_LANGUAGE = 'preferred_language',
  PREFERRED_THEME = 'preferred_theme',
  USER_MANUALLY_SET_THEME = 'user_manually_set_theme',
  REFERRAL_CODE = 'ref',
}

export enum LocalStorageKey {
  LISTING_DRAFT = 'listing_draft',
  LAST_PLATFORM = 'last_platform',
}
