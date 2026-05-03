-- supabase/migrations/001_initial_schema.sql
-- Run this in Supabase SQL Editor

-- ── Teams ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS teams (
  id                       uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name                     text NOT NULL,
  owner_id                 uuid,
  members_can_view_others  boolean DEFAULT true,
  members_can_edit_others  boolean DEFAULT false,
  members_can_delete       boolean DEFAULT false,
  created_at               timestamptz DEFAULT now()
);

-- ── Users ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id                 uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email              text UNIQUE NOT NULL,
  full_name          text,
  role               text DEFAULT 'user'
    CHECK (role IN ('user','team_member','team_owner','admin','super_admin')),
  team_id            uuid REFERENCES teams(id),
  is_active          boolean DEFAULT true,
  referral_code      text UNIQUE,
  preferred_language text DEFAULT 'en' CHECK (preferred_language IN ('en','zh')),
  preferred_theme    text DEFAULT 'light' CHECK (preferred_theme IN ('light','dark')),
  paynow_number      text,
  paynow_type        text CHECK (paynow_type IN ('mobile','uen')),
  created_at         timestamptz DEFAULT now()
);

-- ── Plans ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS plans (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type             text NOT NULL CHECK (type IN ('free','starter','pro','team')),
  name_en          text NOT NULL,
  name_zh          text,
  description_en   text,
  description_zh   text,
  price_sgd        integer NOT NULL DEFAULT 0,
  monthly_quota    integer DEFAULT 10,
  trial_days       integer DEFAULT 0,
  features         jsonb DEFAULT '{}',
  stripe_price_id  text,
  is_visible       boolean DEFAULT true,
  sort_order       integer DEFAULT 0,
  created_at       timestamptz DEFAULT now()
);

INSERT INTO plans (type, name_en, name_zh, price_sgd, monthly_quota, trial_days, sort_order) VALUES
  ('free',    'Free',    '免费版', 0,    10,  0,  1),
  ('starter', 'Starter', '入门版', 2900, 100, 7,  2),
  ('pro',     'Pro',     '专业版', 4900, -1,  14, 3),
  ('team',    'Team',    '团队版', 9900, -1,  14, 4);

-- ── Subscriptions ──────────────────────────────────
CREATE TABLE IF NOT EXISTS subscriptions (
  id                      uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                 uuid REFERENCES users(id) NOT NULL,
  plan_id                 uuid REFERENCES plans(id) NOT NULL,
  stripe_subscription_id  text UNIQUE,
  stripe_customer_id      text,
  status                  text DEFAULT 'trialing'
    CHECK (status IN ('trialing','active','past_due','canceled')),
  trial_start             timestamptz,
  trial_end               timestamptz,
  current_period_end      timestamptz,
  created_at              timestamptz DEFAULT now(),
  updated_at              timestamptz DEFAULT now()
);

-- ── Listings ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS listings (
  id                 uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id            uuid REFERENCES users(id) NOT NULL,
  team_id            uuid REFERENCES teams(id),
  status             text DEFAULT 'draft'
    CHECK (status IN ('draft','active','archived')),
  property_data      jsonb NOT NULL DEFAULT '{}',
  generated_content  jsonb DEFAULT '{}',
  version            integer DEFAULT 1,
  archived_at        timestamptz,
  created_at         timestamptz DEFAULT now(),
  updated_at         timestamptz DEFAULT now()
);

-- ── Feature Flags ─────────────────────────────────
CREATE TABLE IF NOT EXISTS feature_flags (
  key                      text PRIMARY KEY,
  status                   text DEFAULT 'enabled'
    CHECK (status IN ('enabled','disabled','maintenance')),
  description              text,
  maintenance_message_en   text,
  maintenance_message_zh   text,
  maintenance_until        timestamptz,
  updated_by               uuid REFERENCES users(id),
  updated_at               timestamptz DEFAULT now()
);

INSERT INTO feature_flags (key, status, description) VALUES
  ('ai_generation',         'enabled',  'AI 文案生成'),
  ('chinese_output',        'enabled',  '中文版本生成'),
  ('new_registration',      'enabled',  '新用户注册'),
  ('free_trial',            'enabled',  'Free Trial 功能'),
  ('ai_support',            'enabled',  'AI 客服'),
  ('maintenance_mode',      'disabled', '全站维护模式'),
  ('platform_propertyguru', 'enabled',  'PropertyGuru 平台'),
  ('platform_99co',         'enabled',  '99.co 平台'),
  ('platform_facebook',     'enabled',  'Facebook 平台'),
  ('platform_whatsapp',     'enabled',  'WhatsApp 平台'),
  ('platform_instagram',    'enabled',  'Instagram 平台'),
  ('platform_twitter',      'enabled',  'X (Twitter) 平台'),
  ('platform_xiaohongshu',  'enabled',  '小红书平台'),
  ('image_enhancement',     'disabled', 'AI 图片增强 (V2)'),
  ('video_generation',      'disabled', 'AI 视频生成 (V2)'),
  ('social_scheduling',     'disabled', '社媒定时发布 (V2)')
ON CONFLICT (key) DO NOTHING;

-- ── Usage Logs ────────────────────────────────────
CREATE TABLE IF NOT EXISTS usage_logs (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid REFERENCES users(id) NOT NULL,
  listing_id  uuid REFERENCES listings(id),
  action      text NOT NULL CHECK (action IN ('generate','regenerate','copy')),
  tokens_used integer DEFAULT 0,
  created_at  timestamptz DEFAULT now()
);
