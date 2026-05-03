-- supabase/migrations/002_rls_policies.sql

-- ── Listings ──────────────────────────────────────
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own listings"
  ON listings FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own listings"
  ON listings FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own listings"
  ON listings FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own listings"
  ON listings FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Team members can view team listings"
  ON listings FOR SELECT
  USING (
    team_id IS NOT NULL AND
    team_id IN (SELECT team_id FROM users WHERE id = auth.uid() AND team_id IS NOT NULL)
  );

-- ── Subscriptions ─────────────────────────────────
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own subscription"
  ON subscriptions FOR SELECT USING (auth.uid() = user_id);

-- ── Usage Logs ────────────────────────────────────
ALTER TABLE usage_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own usage"
  ON usage_logs FOR SELECT USING (auth.uid() = user_id);

-- ── Users ─────────────────────────────────────────
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON users FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE USING (auth.uid() = id);

-- ── Feature Flags — public read ───────────────────
ALTER TABLE feature_flags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read feature flags"
  ON feature_flags FOR SELECT USING (true);

-- ── CMS — public read, admin write ────────────────
-- (cms_content table added in migration 004)
