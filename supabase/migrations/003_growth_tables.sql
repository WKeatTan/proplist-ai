-- supabase/migrations/003_growth_tables.sql

-- ── Referrals ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS referrals (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id   uuid REFERENCES users(id),
  referee_id    uuid REFERENCES users(id),
  referral_code text NOT NULL,
  status        text DEFAULT 'pending' CHECK (status IN ('pending','completed')),
  reward_given  boolean DEFAULT false,
  created_at    timestamptz DEFAULT now()
);

-- ── Referral Config (single row — admin editable) ─
CREATE TABLE IF NOT EXISTS referral_config (
  id                    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_reward_type  text CHECK (referrer_reward_type IN ('stripe_credit','free_months','extra_credits')),
  referrer_reward_value integer DEFAULT 1000,
  referee_reward_type   text CHECK (referee_reward_type IN ('trial_extension','discount_percent')),
  referee_reward_value  integer DEFAULT 7,
  is_active             boolean DEFAULT true,
  max_referrals         integer,
  reward_expiry_days    integer DEFAULT 30,
  updated_by            uuid REFERENCES users(id),
  updated_at            timestamptz DEFAULT now()
);

INSERT INTO referral_config (referrer_reward_type, referrer_reward_value, referee_reward_type, referee_reward_value)
VALUES ('stripe_credit', 1000, 'trial_extension', 7)
ON CONFLICT DO NOTHING;

-- ── Referral Rewards ──────────────────────────────
CREATE TABLE IF NOT EXISTS referral_rewards (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id   uuid REFERENCES users(id),
  referee_id    uuid REFERENCES users(id),
  reward_type   text CHECK (reward_type IN ('stripe_credit','paynow','free_months')),
  reward_amount integer,
  status        text DEFAULT 'pending' CHECK (status IN ('pending','applied','paid')),
  stripe_tx_id  text,
  applied_at    timestamptz,
  created_at    timestamptz DEFAULT now()
);

-- ── Loyalty Status ────────────────────────────────
CREATE TABLE IF NOT EXISTS loyalty_status (
  user_id           uuid REFERENCES users(id) PRIMARY KEY,
  tier              text DEFAULT 'bronze'
    CHECK (tier IN ('bronze','silver','gold','platinum')),
  months_subscribed integer DEFAULT 0,
  updated_at        timestamptz DEFAULT now()
);

-- ── Loyalty Tiers (admin editable) ───────────────
CREATE TABLE IF NOT EXISTS loyalty_tiers (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name          text NOT NULL,
  min_months    integer NOT NULL,
  max_months    integer,
  extra_credits integer DEFAULT 0,
  features      jsonb DEFAULT '{}',
  discount_pct  integer DEFAULT 0,
  sort_order    integer DEFAULT 0,
  updated_by    uuid REFERENCES users(id),
  updated_at    timestamptz DEFAULT now()
);

INSERT INTO loyalty_tiers (name, min_months, max_months, extra_credits, discount_pct, sort_order) VALUES
  ('Bronze',   1,  3,  0,  0,  1),
  ('Silver',   4,  6,  20, 0,  2),
  ('Gold',     7,  12, 50, 0,  3),
  ('Platinum', 13, null, 0, 10, 4)
ON CONFLICT DO NOTHING;

-- ── Discount Codes ────────────────────────────────
CREATE TABLE IF NOT EXISTS discount_codes (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code             text UNIQUE NOT NULL,
  type             text NOT NULL CHECK (type IN ('percentage','fixed_amount')),
  value            integer NOT NULL,
  max_uses         integer,
  used_count       integer DEFAULT 0,
  applicable_plans jsonb,
  expires_at       timestamptz,
  stripe_coupon_id text,
  created_at       timestamptz DEFAULT now()
);
