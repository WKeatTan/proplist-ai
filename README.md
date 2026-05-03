# PropList AI

AI listing copywriting SaaS for Singapore property agents.  
Generate platform-optimised copy for 7 platforms in 30 seconds.

## Tech Stack

- **Next.js 14** (App Router, full-stack)
- **TypeScript** (strict)
- **Ant Design 5** + **Tailwind CSS**
- **SWR** for data fetching
- **Supabase** (PostgreSQL + Auth + RLS)
- **Anthropic Claude API**
- **Stripe** (subscriptions)
- **Resend** + **React Email**
- **next-intl** (EN / ZH)
- **Biome** (linting + formatting)

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/YOUR_USERNAME/proplist-ai.git
cd proplist-ai
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
# Fill in all values in .env.local
```

### 3. Set up database

Run migrations in Supabase SQL Editor in order:
```
supabase/migrations/001_initial_schema.sql
supabase/migrations/002_rls_policies.sql
supabase/migrations/003_growth_tables.sql
supabase/migrations/004_cms_table.sql
supabase/migrations/005_notifications.sql
```

### 4. Run development server

```bash
npm run dev
# → http://localhost:3000
```

### 5. Set up Stripe webhook (local testing)

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
# Copy the whsec_xxx value to .env.local STRIPE_WEBHOOK_SECRET
```

## Project Structure

```
proplist-ai/
├── app/                    # Next.js App Router (routes)
│   ├── (marketing)/        # Public pages
│   ├── (auth)/             # Login / Register
│   ├── (dashboard)/        # User dashboard
│   ├── (admin)/            # Admin panel
│   └── api/                # API Routes (server-side)
├── src/
│   ├── client/             # Frontend only (components, hooks, context)
│   ├── server/             # Backend only (services, db, claude, stripe)
│   └── shared/             # Shared (enums, types, constants, schemas)
├── emails/                 # React Email templates
├── messages/               # i18n translation files
│   ├── en/
│   └── zh/
├── supabase/
│   └── migrations/         # Database migration files
├── CLAUDE.md               # Claude Code instructions
└── middleware.ts           # Route protection
```

## Scripts

```bash
npm run dev        # Start dev server (Turbopack)
npm run build      # Production build
npm run check      # Biome lint + format
npm run typecheck  # TypeScript type check
```

## Documentation

All product and technical documentation is in Notion.
See `CLAUDE.md` for development guidelines.
