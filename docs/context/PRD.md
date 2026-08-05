# PRD.md — CJ Roma Portfolio

> **Stack (resolved by STARTUP.md gate):** Laravel + React (Inertia 2 + React 19 + TypeScript).
> Persisted in `.env` (`APP_STACK=react`) and `config/features.php`. The first-run gate is
> satisfied — do not ask the stack question again for this project.

---

## 1. Overview

- **Project name / codename:** CJ Roma Portfolio
- **One-liner:** A self-managed portfolio site for a senior full-stack developer in Dubai, where every word on the page is editable from a PIN-protected admin.
- **Client / owner:** Chrysanly John C. Roma (self)
- **Business goal (measurable):** Land senior full-stack interviews — the résumé download and the email tile are the conversion events.
- **Target launch date:** — **Environment domains:** staging: · production:

## 2. Users & roles

| Role | Description | Can | Cannot |
|---|---|---|---|
| Visitor | anonymous | read the portfolio, download the résumé, retune the accent hue locally | change anything server-side |
| Owner | holder of the PIN | edit every piece of content at `/admin` | — |

There is deliberately **no user table involvement** for the admin: the PIN is the
whole credential (see §6). The authorization matrix is therefore two lines, and
`EnsureAdminPinSession` + `MatchesAdminPin` are the two enforcement points.

## 3. Scope

### In scope (v1) — ranked

| # | Feature | User story | Priority | Acceptance criteria |
|---|---|---|---|---|
| 1 | Public portfolio matching the approved mockup | As a hiring manager, I want a fast, readable profile page, so that I can judge fit in a minute | Must | Given the seeded content, when I open `/`, then the page matches `docs/mockups/CJ Roma Portfolio.html` — same tokens, type scale, animations, breakpoints — in light and dark |
| 2 | PIN-gated content admin | As the owner, I want to change any text myself, so that I never wait on a deploy | Must | Given a correct PIN, when I save a change, then the public page shows it on the next load. Given a wrong or missing PIN, then nothing is written and the field errors |
| 3 | PIN on every mutation | As the owner, I want a stolen session to be useless, so that only I can publish | Must | Given a confirmed session but no PIN in the payload, when I POST/PUT/DELETE, then the request fails validation |
| 4 | Ordering + visibility per row | As the owner, I want to hide a row without losing it | Must | Given `is_visible = false`, when the page renders, then that row is absent and the DB row survives |
| 5 | Duplicate protection | As the owner, I want the app to refuse a duplicate rather than create a mess | Must | Given an existing label, when I add the same one, then a field error appears and the row count is unchanged |
| 6 | Visitor-level accent tweak | As a visitor, I want the mockup's Tweaks panel | Should | Given I move the hue slider, then the accent retunes and survives a reload (localStorage), with light/dark keeping their designed lightness |

### Explicitly OUT of scope (v1)

- Image and résumé **uploads** from the admin (paths are editable text; files are placed in `public/` by hand).
- **EN/AR bilingual + RTL.** Single-language portfolio; RULES §9.1 applies to the four client demos, not here. Copy still goes through `__()` and layout uses logical properties, so adding a locale later is additive.
- Blog, case-study detail pages, contact **form** (tiles link out instead), analytics dashboard, multi-user accounts, versioning/undo of content edits.

## 4. Domain rules (business logic source of truth)

- **BR-1:** A change is published only if the request carries the correct PIN — enforced by `MatchesAdminPin` inside every admin FormRequest, on top of `EnsureAdminPinSession` on the route.
- **BR-2:** The PIN is never stored in plaintext anywhere. Only a bcrypt hash lives in `PORTFOLIO_ADMIN_PIN_HASH`; verification is constant-time and fails closed when the hash is empty.
- **BR-3:** Exactly one `site_settings` row exists — guaranteed by `UNIQUE(singleton_key)`, not by convention.
- **BR-4:** Content uniqueness is a database constraint first: `stats.label`, `profile_facts.label`, `capability_groups.name`, `works.title`, `contact_tiles.channel`, `page_sections.key`, `(capability_group_id, label)`, `(role, company)`, `(experience_id, description)`. Validation is UX; the constraint is truth; `ContentWriter` converts a violation into `DuplicateContentException` → 422, never a 500.
- **BR-5:** The public page is one cached payload; every write flushes it **after** the transaction commits, so a visitor can never read a cache entry built from uncommitted data.
- **BR-6:** A hidden row (`is_visible = false`) is excluded in SQL, never filtered in PHP or in the browser.
- **BR-7:** Section keys are structural (`App\Enums\SectionKey`) — renameable and hideable, never creatable or deletable.
- **BR-8:** Deleting a parent deletes its children (`capability_items`, `experience_highlights`) via `cascadeOnDelete`.
- **BR-9:** A child is only reachable through its own parent — nested routes use scoped bindings, so a mismatched pair is a 404, not a cross-parent edit.

## 5. Non-duplicate / idempotency map

| Operation | DB constraint | Idempotency-Key required? | On duplicate |
|---|---|---|---|
| Add headline figure | UNIQUE(label) | No — admin form, single operator | field error, row count unchanged |
| Add profile row | UNIQUE(label) | No | field error |
| Add capability tag | UNIQUE(capability_group_id, label) | No | field error |
| Add experience entry | UNIQUE(role, company) | No | field error |
| Add experience bullet | UNIQUE(experience_id, description) | No | field error |
| Add work card | UNIQUE(title) | No | field error |
| Add contact tile | UNIQUE(channel) | No | field error |
| Open PIN session | — | No | throttled 5/min per IP |

No `Idempotency-Key` middleware here: there is no payment, booking or order, and
every write is an authenticated single-operator form submit whose button disables
while `processing`. If a public contact form is ever added, ARCHITECTURE §6
applies to it.

## 6. Data & privacy

- **PII collected:** none from visitors. The owner's own contact details (email, phone, WhatsApp) are published on purpose and tagged `PII` in SCHEMA Part B.
- **Retention:** not applicable — no visitor data is stored. No analytics cookies. The only client-side storage is the visitor's theme and accent-hue preference (localStorage, no identifiers).
- **Regulatory notes:** the PIN hash is a secret in `.env`, never committed. `APP_DEBUG=false` in production.
- Data residency: no constraint (no third-party data processed).

## 7. Integrations

| Service | Purpose | Env keys | Failure behavior |
|---|---|---|---|
| none in v1 | — | — | — |

Outbound links only (mailto, tel, wa.me). No API clients, so no fakes needed.

## 8. Non-functional requirements

- **Performance:** p95 read < 200ms — the page is a single cached payload
  (`Cache::flexible`, 1h fresh / 2h stale) built from 8 indexed queries on a
  cache miss. Lighthouse ≥ 90 on `/`.
- **Security:** RULES §5 applies. Project-specific: PIN re-verified per write;
  `throttle:admin-pin` 5/min on the gate; `throttle:portfolio` 120/min on `/`.
- **Availability & ops:** nightly DB backup (content is the only state).
- **Languages:** EN only in v1 (see §3 out-of-scope).
- **Devices:** mobile-first, 360px minimum; breakpoints mirror the mockup.
- **SEO:** `/` carries title, description and OG tags from `site_settings`.
  SSR is available via `npm run build:ssr` if crawler coverage needs it.

## 9. Pages & flows inventory

| Page | Route | Auth | SSR | Key components |
|---|---|---|---|---|
| Portfolio | `/` | guest | optional | PortfolioHeader, PortfolioNav, HeroSection, StatsSection, ProfileSection, CapabilitiesSection, ExperienceSection, WorkSection, ContactSection, AccentTweaks |
| PIN gate | `/admin/login` | guest, throttled | no | login form |
| Overview | `/admin` | PIN | no | count tiles |
| Site settings | `/admin/settings` | PIN | no | grouped FieldControls |
| Sections | `/admin/sections` | PIN | no | ResourceRow ×6 |
| Headline figures | `/admin/stats` | PIN | no | ResourceManager |
| Profile rows | `/admin/profile-facts` | PIN | no | ResourceManager |
| Capabilities | `/admin/capability-groups` | PIN | no | ResourceManager (nested) |
| Experience | `/admin/experiences` | PIN | no | ResourceManager (nested) |
| Selected work | `/admin/works` | PIN | no | ResourceManager |
| Contact tiles | `/admin/contact-tiles` | PIN | no | ResourceManager |

Critical flows (each covered end-to-end by a feature test):

1. **Visitor reads the portfolio** — `PortfolioPageTest`.
2. **Owner unlocks and saves a change** — `AdminPinGateTest`, `StatManagementTest`, `SiteSettingUpdateTest`.
3. **Wrong PIN changes nothing** — `AdminPinGateTest`, `StatManagementTest`.
4. **Nested child edits stay inside their parent** — `ExperienceManagementTest`.

## 10. Milestones & definition of done

| Milestone | Contents | Status |
|---|---|---|
| M1 Skeleton | 10 migrations, models, enums, factories, seeded real content | done |
| M2 Public page | Resources, cached service, controller, mockup ported to React | done |
| M3 Admin | PIN gate, 26 Actions, 12 FormRequests, 10 admin screens | done |
| M4 Launch | portrait + résumé placed in `public/`, Lighthouse pass, deploy, backups | pending |

**Project DoD:** all Must features accepted · CI green (Pint, Larastan, ESLint,
tsc, PHPUnit) · RULES §5 walked · SCHEMA Part B current (it is) · design signed
off against the mockup.

## 11. Open questions / decision log

| Date | Question | Decision | By |
|---|---|---|---|
| 2026-08-04 | How should the admin authenticate? | PIN-only session **plus** the PIN on every write; no user record | Owner |
| 2026-08-04 | Which content is editable? | Everything in the mockup, each row ordered and publishable | Owner |
| 2026-08-04 | Database engine? | MySQL 8.4 for app and tests (RULES §1, §7) | Owner |
| 2026-08-04 | Admin shape? | Separate `/admin` dashboard; the public page stays presentational | Owner |
| 2026-08-04 | Admin uploads for portrait/résumé/screenshots? | Out of scope this pass; paths are editable text fields | Owner |
