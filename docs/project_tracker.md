# Briziq MVP — Project Tracker

> **Purpose:** This is the single source of truth for project progress. Every agent
> MUST read this file before starting any work to understand what has been completed,
> what is in progress, and what comes next. When you complete a step, mark it `[x]`
> and add a date stamp `(YYYY-MM-DD)`. When you start a step, mark it `[/]`.
>
> **Rule:** Do NOT skip ahead to a later epic unless all of its listed prerequisites
> are marked `[x]`. If you are unsure, ask the user.

---

## Legend

| Symbol | Meaning |
|--------|---------|
| `[ ]`  | Not started |
| `[/]`  | In progress |
| `[x]`  | Completed |
| `[~]`  | Partially done / needs revisit |
| `[-]`  | Blocked or deferred |

---

## Epic 0 — Project Foundation

> Scaffold, tooling, design system tokens, and base architecture.
> **Prerequisites:** None.

- [x] Initialize Next.js 16 project (App Router + TypeScript)
- [x] Configure Tailwind CSS v4
- [x] Set up project folder structure (`src/app`, `src/components`, `src/configs`, `src/services`, etc.)
- [x] Set up Neumorphic design tokens (`neo`, `neo-inner`, `neo-deep`, `neo-flat`) in CSS/Tailwind
- [x] Create `docs/design.md` with art direction and shadow tokens
- [x] Create `docs/Briziq UX Design System.md`
- [x] Create `docs/Briziq Experience Specifications.md`
- [x] Create PRD and Addendum
- [x] Set up Axios base instance and ApiService pattern
- [x] Set up i18n with `next-intl`
- [x] Set up theme system (light/dark, cookie persistence, CSS variables)
- [x] Set up navigation config and NavigationProvider
- [x] Set up route config (`protectedRoutes`, `publicRoutes`, `authRoutes`)
- [x] Set up PostLoginLayout with layout variants (CollapsibleSide, StackedSide, etc.)

---

## Epic 1 — Neumorphic UI Component Library

> Convert all base UI components to the Neumorphic visual language.
> **Prerequisites:** Epic 0.
> **Tracker:** `docs/neumorphism-conversion-tracker.md`

- [x] Alert
- [x] Avatar
- [x] Badge
- [x] Button (extrude default → inset pressed → flat disabled)
- [x] Card (extruded surface)
- [x] Checkbox
- [x] CloseButton
- [x] Input (intruded/inset surface)
- [x] Radio
- [x] Switcher
- [x] Progress
- [x] Skeleton
- [x] Segment
- [x] Dialog
- [x] Drawer
- [x] Dropdown
- [x] Tabs
- [x] Tooltip
- [x] Form
- [x] Table
- [x] Select
- [x] Tag
- [x] Spinner
- [x] Notification
- [x] Pagination
- [x] Timeline
- [x] Steps
- [x] Slider
- [x] Menu
- [x] Upload
- [x] DatePicker
- [x] Calendar
- [x] RangeCalendar
- [x] TimeInput
- [x] InputGroup
- [x] ScrollBar
- [x] StatusIcon
- [x] Toast
- [x] Design system showcase page (`src/app/design-system/page.tsx`)

---

## Epic 2 — Authentication & User Management

> Full auth flow with role-based access (Buyer / Exporter / Admin).
> **Prerequisites:** Epic 0, Epic 1 (Button, Input, Card, Form).

- [x] Configure `next-auth` with providers (GitHub, Google, Credentials)
- [x] Auth pages scaffolded (sign-in, sign-up, forgot-password, reset-password)
- [x] AuthProvider + SessionContext wired into root layout
- [x] Middleware for route protection and redirects
- [x] Server actions for auth (handleSignIn, handleSignOut, handleSignUp, etc.)
- [ ] Prisma User model with roles (`BUYER`, `EXPORTER`, `ADMIN`, `VERIFICATION_OFFICER`)
- [ ] Sign-up flow assigns role (Buyer or Exporter selection)
- [ ] Role-based session extension in next-auth callbacks
- [ ] Role-based middleware enforcement (Buyer vs Exporter vs Admin routes)
- [ ] User profile page (view/edit)
- [ ] Neumorphic styling applied to all auth pages

---

## Epic 3 — Database Schema & Prisma Setup

> Full data model for the platform.
> **Prerequisites:** Epic 0, Epic 2 (User model started).

- [~] Prisma schema initialized (minimal `User` model exists)
- [ ] Supabase PostgreSQL database connected
- [ ] `User` model — full fields (id, email, name, role, trustScore, profileImage, phone, country, company, createdAt, updatedAt)
- [ ] `VerificationDocument` model (id, exporterId, type, fileUrl, ocrText, expirationDate, status [PENDING, AI_REVIEWED, APPROVED, REJECTED], aiConfidence, reviewedBy, createdAt, updatedAt)
- [ ] `Product` model (id, exporterId, commodity, description, quantity, unit, origin, harvestStatus, fobPrice, currency, images, isActive, createdAt, updatedAt)
- [ ] `SecureTrade` model (id, buyerId, exporterId, productId, amount, currency, paymentGateway [TAZAPAY, ESCROW_COM], status [AUTHORIZED, CONFIRMED, SHIPPED, RELEASED, DISPUTED], exporterConfirmedAt, shipmentVerifiedAt, autoReleaseAt, createdAt, updatedAt)
- [ ] `Dispute` model (id, tradeId, initiatedBy, reason, status, resolution, createdAt, resolvedAt)
- [ ] `TrustScore` model or embedded fields (scoreValue, badgeLevel [NONE, VERIFIED, CONFIDENT, TRUSTED])
- [ ] Seed script for development data
- [ ] Prisma client singleton (`src/prisma/db.ts` finalized)
- [ ] Run initial migration

---

## Epic 4 — Landing Page & Global Search (Buyer-Facing)

> The "Google-like" homepage: animated hero prompts, search well, smart carousel.
> **Prerequisites:** Epic 1, Epic 3 (Product model).
> **PRD refs:** FR-1, FR-2, §4.1, §4.5

- [ ] Landing page layout (public, unauthenticated)
- [ ] Animated hero text rotation ("Search Trusted Exporters..." → "Looking for Genuine Agro Marketplace?" → etc.)
- [ ] Deep inset Neumorphic search well (primary input)
- [ ] Natural language query parsing (commodity, quantity, destination)
- [ ] API route: `POST /api/search` — parse query, return results
- [ ] Search results page layout
- [ ] Market Intelligence display — stamped flat (harvest status, FOB price, shipping duration)
- [ ] Recommended Exporter cards — extruded, with Trust Score and Badge
- [ ] Smart Carousel below search bar (premium/trusted exporters only)
- [ ] Carousel dynamically filtered by commodity search context
- [ ] Empty search state with rotating prompt text
- [ ] Mobile responsive layout

---

## Epic 5 — AI Verification & Export Readiness Engine (Exporter-Facing)

> Document upload, OCR, AI parsing, readiness scoring, human desk review queue.
> **Prerequisites:** Epic 2 (Exporter role), Epic 3 (VerificationDocument model).
> **PRD refs:** FR-3, FR-4, FR-5, §4.2

- [ ] Exporter dashboard layout (protected, role-gated)
- [ ] Deep inset Upload Well component (drag & drop + click)
- [ ] API route: `POST /api/verification/upload` — accept PDF/image, store in Supabase Storage
- [ ] Gemini OCR integration — server-side document parsing
- [ ] Extract document type, expiration dates, key IDs (CAC, NXP, NAQS)
- [ ] AI confidence scoring and anomaly flagging
- [ ] Export Readiness Score calculation (0-100%) — stamped flat on dashboard
- [ ] Target market compliance checklist generation (per commodity + country)
- [ ] Missing document roadmap display
- [ ] API route: `GET /api/verification/status` — return document statuses and readiness score
- [ ] Admin/Verification Officer review queue page
- [ ] Side-by-side view: AI-parsed data vs uploaded original
- [ ] Approve / Reject actions for Verification Officers
- [ ] Trust Score update on approval
- [ ] Confident Badge award logic (human-in-the-loop required)
- [ ] Badge display: deeply engraved inner-shadow seal on Exporter cards

---

## Epic 6 — Exporter Profile & Inventory Management

> Exporter product listings, stock management, public profile.
> **Prerequisites:** Epic 3 (Product model), Epic 5 (Badge system).

- [ ] Exporter inventory management page (CRUD products)
- [ ] Product form (commodity, quantity, origin, harvest status, FOB price, images)
- [ ] API routes: `POST/GET/PUT/DELETE /api/products`
- [ ] Public exporter profile page (visible to buyers)
- [ ] Export Intelligence display (verified licenses, inspection reports, AI Risk Assessment)
- [ ] Trust Score and Badge display on profile
- [ ] Inventory availability status (in-stock, limited, out-of-stock)

---

## Epic 7 — AI Assistant & Automated Deal Desk

> Multi-modal AI assistant: text chat, voice synthesis, logistics queries, contract generation.
> **Prerequisites:** Epic 5 (verification data), Epic 6 (inventory data).
> **PRD refs:** FR-6, FR-7, §4.3

- [ ] AI Assistant UI — structurally integrated into dashboards (not a floating bubble)
- [ ] Text chat interface with Gemini backend
- [ ] API route: `POST /api/assistant/chat` — server-side Gemini interaction
- [ ] Context-aware responses (verification status, inventory, compliance)
- [ ] Real-time stock availability check via assistant
- [ ] Secure Trade contract generation from assistant interaction
- [ ] Voice synthesis integration (Gemini voice)
- [ ] Language translation support
- [ ] Buyer-facing assistant on exporter profile pages (due diligence queries)

---

## Epic 8 — Smart Match Escrow & Secure Trade

> Authorization-first escrow flow, dual-trigger release, 7-day auto-release, dispute mediation.
> **Prerequisites:** Epic 3 (SecureTrade model), Epic 6 (inventory confirmation).
> **PRD refs:** FR-8, FR-9, FR-10, FR-11, FR-12, §4.4

- [ ] "Request Secure Trade" flow from exporter profile / search results
- [ ] Escrow Vault UI component — massively extruded container + deep inset payment well
- [ ] Trade summary generation (product, quantity, price, terms)
- [ ] Payment gateway routing logic: TazaPay ($100–$14k) vs Escrow.com (>$14k)
- [ ] API route: `POST /api/trades/authorize` — buyer authorizes payment
- [ ] Exporter inventory confirmation flow (24-hour window)
- [ ] Trust Score penalty for failed/rejected confirmations (FR-9)
- [ ] API route: `POST /api/trades/confirm` — exporter confirms, funds locked
- [ ] TazaPay API integration (server-side)
- [ ] Escrow.com API integration (server-side)
- [ ] Shipment tracking / logistics verification integration (Project44 / FourKites)
- [ ] Buyer "Shipment Received" button — trigger fund release
- [ ] 7-day auto-release timer (server-side cron/scheduled task)
- [ ] Dispute initiation by buyer (halts auto-release timer)
- [ ] Dispute mediation admin panel
- [ ] Trade status dashboard for buyers and exporters
- [ ] 2% transaction fee calculation and deduction

---

## Epic 9 — Pro Buyer Subscriptions & Predictive Search

> Subscription tier for predictive supply maps and future-demand intelligence.
> **Prerequisites:** Epic 4 (search), Epic 6 (inventory data).
> **PRD refs:** FR-14, FR-15, §4.6

- [ ] Subscription model in Prisma (plan type, billing cycle, status)
- [ ] Subscription management UI (subscribe, cancel, view plan)
- [ ] Payment integration for subscriptions
- [ ] Predictive supply map — interactive (harvest dates, supply forecasts)
- [ ] Data restricted to Trusted Badge exporters
- [ ] Access gating: map visible only to active Pro subscribers
- [ ] API route: `GET /api/predictions/supply-map`

---

## Epic 10 — Notifications, Messaging & Operational Alerts

> Platform notifications, WhatsApp/SMS pings for stock verification, email alerts.
> **Prerequisites:** Epic 2, Epic 8 (trade events).

- [ ] In-app notification system (bell icon, notification list)
- [ ] API routes: `GET /api/notifications`, `GET /api/notifications/count`
- [ ] Real-time notification delivery (SSE or polling)
- [ ] Email notifications for key trade events
- [ ] WhatsApp/SMS integration for exporter stock verification pings (FR-9)
- [ ] Notification preferences page

---

## Epic 11 — Admin Dashboard & Platform Operations

> Internal tooling for Briziq operators: verification queue, trade oversight, dispute management.
> **Prerequisites:** Epic 2 (Admin role), Epic 5, Epic 8.

- [ ] Admin layout and navigation
- [ ] Verification Officer queue (from Epic 5, admin-only)
- [ ] Trade monitoring dashboard (all active trades, statuses)
- [ ] Dispute management panel (view, mediate, resolve)
- [ ] User management (view users, roles, trust scores)
- [ ] Platform analytics (trade volume, verification throughput, revenue)

---

## Epic 12 — Polish, Testing & Launch Preparation

> QA, performance, accessibility, SEO, deployment.
> **Prerequisites:** All prior epics substantially complete.

- [ ] WCAG AA accessibility audit (contrast, keyboard navigation, focus rings)
- [ ] SEO: meta tags, Open Graph, structured data on public pages
- [ ] Performance audit (Core Web Vitals, bundle size)
- [ ] End-to-end test suite (key user journeys UJ-1 and UJ-2)
- [ ] Unit tests for critical business logic (escrow routing, trust score, auto-release)
- [ ] Security audit (API routes, secret exposure, CSRF)
- [ ] Production deployment configuration
- [ ] Environment variable documentation
- [ ] README update with setup instructions

---

## Current Status Summary

| Epic | Name | Status | Progress |
|------|------|--------|----------|
| 0 | Project Foundation | ✅ Complete | 14/14 |
| 1 | Neumorphic UI Component Library | ✅ Complete | 38/38 |
| 2 | Authentication & User Management | 🔶 Partial | 5/11 |
| 3 | Database Schema & Prisma Setup | 🔶 Started | 1/11 |
| 4 | Landing Page & Global Search | ⬜ Not started | 0/12 |
| 5 | AI Verification & Export Readiness | ⬜ Not started | 0/16 |
| 6 | Exporter Profile & Inventory | ⬜ Not started | 0/7 |
| 7 | AI Assistant & Deal Desk | ⬜ Not started | 0/9 |
| 8 | Smart Match Escrow | ⬜ Not started | 0/17 |
| 9 | Pro Buyer Subscriptions | ⬜ Not started | 0/7 |
| 10 | Notifications & Alerts | ⬜ Not started | 0/6 |
| 11 | Admin Dashboard | ⬜ Not started | 0/6 |
| 12 | Polish, Testing & Launch | ⬜ Not started | 0/9 |

**Next action:** Complete Epic 2 (finish auth with roles) → Epic 3 (full Prisma schema) → Epic 4 (landing page).

---

## Update Log

| Date | Epic | Change | Agent/Author |
|------|------|--------|--------------|
| 2026-09-18 | 0, 1, 2, 3 | Initial tracker created. Marked completed items based on codebase audit. | Agent |
