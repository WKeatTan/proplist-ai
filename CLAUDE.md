# PropList AI — Claude Code Instructions

## Project Overview
AI listing copywriting SaaS for Singapore property agents.
Generates platform-optimised copy for 7 platforms (PropertyGuru, 99.co, Facebook, WhatsApp, Instagram, X, 小红书) in 30 seconds.

## Tech Stack
- **Framework**: Next.js 14 App Router (full-stack, no separate backend)
- **Language**: TypeScript strict mode — NO `any` allowed
- **UI**: Ant Design 5 + Tailwind CSS
- **Data fetching**: SWR (not RTK Query, not React Query)
- **Global state**: React Context (not Redux)
- **Database**: Supabase (PostgreSQL + Auth + RLS)
- **AI**: Anthropic Claude API (`claude-sonnet-4-5`)
- **Payments**: Stripe
- **Email**: Resend + React Email
- **i18n**: next-intl (per-page loading, EN + ZH)
- **Linting/Formatting**: Biome (not ESLint/Prettier)

## Architecture — Critical Rules

### 1. Layer Separation (ALWAYS follow this)
```
UI Layer       → src/client/components/XxxCard.tsx
Behaviour      → src/client/hooks/useXxx.ts
Service        → src/server/services/xxx.service.ts
DB / API       → src/server/db/xxx.db.ts  |  src/api/xxx.api.ts
```
- Components receive data and callbacks via props — NO direct API calls inside components
- Hooks handle loading/error states and call services
- Services contain business logic
- DB files contain only Supabase queries

### 2. No Magic Strings — EVER
```typescript
// ❌ WRONG
fetch('/api/listings')
router.push('/dashboard')
if (user.role === 'admin')

// ✅ CORRECT
fetch(Endpoints.LISTINGS)
router.push(Routes.DASHBOARD)
if (user.role === UserRole.ADMIN)
```
- All routes → `src/shared/constants/routes.constants.ts`
- All API endpoints → `src/shared/constants/endpoints.constants.ts`
- All enums → `src/shared/enums/index.ts`
- All SWR cache keys → `src/shared/constants/query-keys.constants.ts`

### 3. File Naming Convention
| Type | Format | Example |
|------|--------|---------|
| Page | `XxxPage.tsx` | `LoginPage.tsx` |
| Component | `XxxCard.tsx`, `XxxForm.tsx`, `XxxModal.tsx` | `ListingCard.tsx` |
| Hook | `useXxx.ts` | `useListings.ts` |
| Service | `xxx.service.ts` | `listing.service.ts` |
| DB | `xxx.db.ts` | `listings.db.ts` |
| API (client) | `xxx.api.ts` | `listings.api.ts` |
| Types | `xxx.types.ts` | `listing.types.ts` |
| Translator | `xxx.translator.ts` | `listing.translator.ts` |

### 4. API Routes — Always validate + translate
Every API Route must:
1. `verifyAuth(req)` — check Supabase session
2. `checkFeatureFlag(flag)` — check ENABLED/DISABLED/MAINTENANCE
3. `checkPlan(...)` — check subscription tier
4. `checkQuota(user)` — check monthly usage
5. `verifyOwnership(id, userId)` — check resource belongs to user
6. `validateBody(Schema)(req)` — Zod validation
7. Translate response via `xxxTranslator(data, locale)`
8. Wrap in `try/catch` with `handleApiError(err)`

### 5. Feature Flags have THREE states
- `ENABLED` → normal, UI visible and usable
- `DISABLED` → UI hidden entirely (user doesn't know feature exists)
- `MAINTENANCE` → UI visible but greyed out + tooltip "temporarily unavailable"

### 6. Security Rules
- NEVER expose `SUPABASE_SERVICE_ROLE_KEY` to frontend
- NEVER put sensitive logic in Client Components
- NEVER skip RLS — all sensitive tables have RLS enabled
- Role is ALWAYS fetched from DB, never trusted from JWT
- Data queries ALWAYS include `.eq('user_id', userId)` filter
- NOT_FOUND (404) for ownership failures — never 403 (don't reveal resource exists)

### 7. Translations
- All API responses with text fields go through `src/server/translators/`
- `getLocale(req)` extracts language from Cookie
- `t({ en, zh }, locale)` for bilingual fields
- `translateEnum(LabelMap, value, locale)` for enum labels
- i18n files live in `messages/en/` and `messages/zh/`

### 8. State Management
- Server data (listings, subscription) → SWR with `QueryKeys.*`
- Global UI state (user, theme, language) → `AppContext`
- Local UI state → `useState`
- NO Redux, NO Zustand

## Database
- Always use parameterised Supabase queries (never string concatenation)
- All mutations go through service layer, not directly from API routes
- Migrations in `supabase/migrations/` — numbered sequentially

## Environment Variables
Never hardcode. Always use:
```typescript
process.env.ANTHROPIC_API_KEY      // server only
process.env.SUPABASE_SERVICE_ROLE_KEY  // server only
process.env.NEXT_PUBLIC_SUPABASE_URL   // client safe
```

## Commit Convention
```
feat: add listing archive functionality
fix: resolve stripe webhook signature error
chore: update dependencies
refactor: extract quota check to middleware
docs: update API documentation
```

## Current Phase
**Phase 0 — Project Initialisation**
See Notion task list for current progress.
Next: Week 1 — Auth + route structure
