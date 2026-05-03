-- supabase/migrations/004_cms_table.sql

CREATE TABLE IF NOT EXISTS cms_content (
  key         text PRIMARY KEY,
  type        text NOT NULL CHECK (type IN ('text','richtext','image','json','boolean')),
  value_en    jsonb,
  value_zh    jsonb,
  label       text,
  group_name  text CHECK (group_name IN ('branding','landing','banner','legal','contact')),
  sort_order  integer DEFAULT 0,
  updated_by  uuid REFERENCES users(id),
  updated_at  timestamptz DEFAULT now()
);

ALTER TABLE cms_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read cms"
  ON cms_content FOR SELECT USING (true);

CREATE POLICY "Only admins can write cms"
  ON cms_content FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role IN ('admin','super_admin')
    )
  );

INSERT INTO cms_content (key, type, value_en, value_zh, label, group_name, sort_order) VALUES
  ('branding.app_name',      'text',    '"PropList AI"',                        '"PropList AI"',              'App Name',    'branding', 1),
  ('branding.tagline',       'text',    '"AI Listing Tool for SG Agents"',      '"新加坡房产中介 AI 助手"',    'Tagline',     'branding', 2),
  ('branding.logo_url',      'image',   '"/images/logo.png"',                   '"/images/logo.png"',         'Logo',        'branding', 3),
  ('branding.favicon_url',   'image',   '"/images/favicon.ico"',                '"/images/favicon.ico"',      'Favicon',     'branding', 4),
  ('branding.og_image_url',  'image',   '"/images/og.png"',                     '"/images/og.png"',           'OG Image',    'branding', 5),
  ('landing.hero_title',     'text',    '"Generate listings in 30 seconds"',    '"30秒生成7平台文案"',         'Hero Title',  'landing',  1),
  ('landing.hero_subtitle',  'text',    '"For Singapore property agents"',       '"专为新加坡房产中介"',        'Hero Sub',    'landing',  2),
  ('landing.hero_cta',       'text',    '"Start Free Trial"',                   '"免费试用14天"',              'Hero CTA',    'landing',  3),
  ('banner.promo_enabled',   'boolean', 'false',                                'false',                      'Promo On',    'banner',   1),
  ('banner.promo_text',      'text',    '"🎉 14-day free trial!"',              '"🎉 14天免费试用！"',         'Promo Text',  'banner',   2),
  ('banner.promo_link',      'text',    '"/register"',                          '"/register"',                'Promo Link',  'banner',   3),
  ('banner.promo_color',     'text',    '"#f59e0b"',                            '"#f59e0b"',                  'Promo Color', 'banner',   4),
  ('legal.about_us',         'richtext','"<p>About PropList AI...</p>"',        '"<p>关于 PropList AI...</p>"','About Us',    'legal',    1),
  ('legal.terms',            'richtext','"<p>Terms & Conditions...</p>"',       '"<p>使用条款...</p>"',        'Terms',       'legal',    2),
  ('legal.privacy',          'richtext','"<p>Privacy Policy...</p>"',           '"<p>隐私政策...</p>"',        'Privacy',     'legal',    3),
  ('contact.email',          'text',    '"hello@proplistai.com"',               '"hello@proplistai.com"',     'Email',       'contact',  1),
  ('contact.whatsapp',       'text',    '"+"',                                  '"+"',                        'WhatsApp',    'contact',  2)
ON CONFLICT (key) DO NOTHING;
