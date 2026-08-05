# SCHEMA.md — Database Conventions & Living Schema

> Read after ARCHITECTURE.md. Part A is fixed conventions for ALL projects.
> Part B is the living schema of THIS project — the AI must update it whenever a migration is added.
> **Rule: no migration is written unless it complies with Part A and is reflected in Part B in the same PR.**

---

## PART A — Conventions (all projects)

### A1. Naming
- Tables: `snake_case`, plural (`order_items`). Pivots: singular, alphabetical (`doctor_service`).
- Columns: `snake_case`, singular. FKs: `{singular_relation}_id`. Booleans: `is_/has_` prefix. Timestamps of events: `{verb}_at` (`published_at`, `confirmed_at`).
- Indexes named by Laravel defaults; custom composites: `idx_{table}_{cols}`.

### A2. Keys & identifiers
- PK: `$table->id()` (BIGINT unsigned) internally.
- **Public-facing identifiers are ULIDs or slugs, never auto-increment IDs** (`$table->ulid('public_id')->unique()` or `slug` unique). Prevents enumeration/IDOR scraping.
- Every FK declared with constraint: `$table->foreignId('user_id')->constrained()->cascadeOnDelete()` (or `restrictOnDelete()` for protected parents — decide explicitly, never default silently).

### A3. Types (strict)
| Data | Type | Never |
|---|---|---|
| Money | `DECIMAL(12,2)` (or integer minor units for gateways) | FLOAT/DOUBLE |
| Status/type | string ENUM cast to PHP backed enum; column `string(30)` + CHECK or native enum per DB | free text |
| Phone | `string(20)`, E.164 normalized in `prepareForValidation` | integer |
| Flexible blobs | `JSON` with documented shape here | serialized PHP |
| Coordinates | `DECIMAL(10,7)/(11,7)` or POINT + spatial index if radius queries | float |
| Long text | `TEXT/LONGTEXT`, never indexed raw — use FULLTEXT or Scout | VARCHAR(5000) |

### A4. Integrity = duplicates die at the database
- Every business uniqueness rule becomes a **UNIQUE constraint**, not just validation:
  - `UNIQUE(email)` · `UNIQUE(doctor_id, starts_at)` · `UNIQUE(order_number)` · `UNIQUE(user_id, listing_id)` on favourites.
- Validation (`Rule::unique()`) is UX; the constraint is truth; the Action catches `UniqueConstraintViolationException` → domain error. All three or it's not done.
- `NOT NULL` by default; nullable is an explicit modeling decision with a comment.
- CHECK constraints for invariants where supported (`price >= 0`, `ends_at > starts_at`).

### A5. Indexing playbook (performance)
1. Index every column in `WHERE`, `ORDER BY`, `JOIN`, and FK columns (Laravel adds FK indexes via `constrained()`).
2. Composite indexes ordered: equality columns first, then range/sort — e.g. filter `status = ? AND type = ? AND price BETWEEN` → `INDEX(status, type, price)`.
3. Covering slim queries: pair with `select()` so hot list pages hit index-only reads where possible.
4. No index on low-cardinality booleans alone; combine into composites.
5. Any query on a table expected >10k rows ships with an `EXPLAIN` check in the PR description.
6. Soft-deleted tables: include `deleted_at` in hot composites or use partial indexes (Postgres).

### A6. Migrations discipline
- Append-only after merge. Fix-forward with new migrations.
- Every migration reversible (`down()` real, not empty) until first production deploy; after that, forward-only + backups.
- Zero-downtime rules for live tables: add nullable column → backfill in chunked job → add constraint; never `change()` a huge table in one shot.
- Seeders: `DatabaseSeeder` = realistic demo data via factories; `ProductionSeeder` = reference data only (roles, settings). Factories define states (`published()`, `outOfStock()`).

### A7. Data protection
- PII columns minimal and listed in Part B with a `PII` tag. Encrypted casts for sensitive-at-rest (`'token' => 'encrypted'`).
- Passwords: `hashed` cast only. Never log PII; scrub in log context.
- Retention: soft-deleted user data pruned by scheduled `model:prune` per policy in PRD.md.
- Backups: nightly automated (spatie/laravel-backup or managed DB snapshots), restore tested quarterly.

### A8. Concurrency
- Stock/balance mutations: `lockForUpdate()` inside the transaction, or atomic `decrement()` guarded by `WHERE stock >= ?` and affected-rows check.
- Long-running human edits: optimistic locking via `updated_at`/version column check.

---

## PART B — Living schema (THIS project)

> Portfolio content. Ten tables, all read by one cached payload and written only
> through Actions behind the PIN gate. Every table carries `public_id` (ULID,
> unique) as its route key so admin URLs never expose auto-increment ids.

### site_settings — the page-wide singleton

| Column | Type | Constraints/Index | Notes |
|---|---|---|---|
| id | bigint UN | PK | |
| public_id | ulid | UNIQUE | route key |
| singleton_key | char(1) | UNIQUE, default 'x' | makes a second row impossible |
| brand_label | string(80) | NOT NULL | header label |
| availability_label | string(60) | NOT NULL | header status |
| hero_eyebrow | string(80) | NOT NULL | |
| hero_headline_lead | string(200) | NOT NULL | plain part of the H1 |
| hero_headline_highlight | string(80) | NOT NULL | gradient span of the H1 |
| hero_summary | text | NOT NULL | |
| portrait_path | string(255) | NOT NULL | relative to `public/` |
| portrait_alt | string(160) | NOT NULL | a11y |
| portrait_badge_start / _end | string(24) | NOT NULL | corner badges |
| profile_lead | text | NOT NULL | |
| profile_closing | text | NOT NULL | |
| contact_headline_lead / _highlight / _tail | string(160/60/160) | NOT NULL | middle part gets the gradient |
| footer_start | string(200) | NOT NULL | |
| footer_end | string(120) | NOT NULL | |
| email | string(255) | NOT NULL | **PII** |
| whatsapp_url | string(255) | NOT NULL | **PII** |
| phone_number | string(20) | NOT NULL | **PII**, E.164-ish, trimmed in prepareForValidation |
| resume_path | string(255) | NOT NULL | relative to `public/` |
| meta_title | string(120) | NOT NULL | SEO |
| meta_description | string(255) | NOT NULL | SEO |
| accent_hue | smallint UN | default 170, CHECK 0–360 | starting hue for visitors |
| default_theme | string(10) | default 'system' | enum `ThemeMode` |
| timestamps | | | |

**Relations:** none. **Uniqueness rules:** `singleton_key`.
**Hot queries:** `SiteSetting::query()->firstOrFail()` — one row, no index needed.

### page_sections — nav labels and section headings

| Column | Type | Constraints/Index | Notes |
|---|---|---|---|
| id | bigint UN | PK | |
| public_id | ulid | UNIQUE | route key |
| key | string(30) | UNIQUE | enum `SectionKey`; structural, not user-created |
| nav_label | string(40) | NOT NULL | uppercase in the design |
| heading | string(80) | NOT NULL | |
| note | string(120) | NULL | optional aside beside the heading |
| position | smallint UN | idx(is_visible, position) | |
| is_visible | boolean | default true | hides from page *and* nav |
| timestamps | | | |

**Uniqueness rules:** `key` (one row per section).
**Hot queries:** `visible()->ordered()` → `idx_page_sections_visible_position`.

### stats — headline figures strip

| Column | Type | Constraints/Index | Notes |
|---|---|---|---|
| id / public_id | bigint UN / ulid | PK / UNIQUE | |
| label | string(60) | UNIQUE | e.g. "YEARS OF EXPERIENCE" |
| value | string(16) | NOT NULL | e.g. "5+" — a string, not a number |
| is_accent | boolean | default false | renders the value in the accent colour |
| position | smallint UN | idx(is_visible, position) | |
| is_visible | boolean | default true | |
| timestamps | | | |

**Uniqueness rules:** `label`. **Hot queries:** `visible()->ordered()`.

### profile_facts — the label/value table

Same shape as `stats`: `label` string(60) UNIQUE, `value` string(255),
`is_accent`, `position`, `is_visible`, timestamps.
**Uniqueness rules:** `label`. **Index:** `idx_profile_facts_visible_position`.

### capability_groups — one capability row

| Column | Type | Constraints/Index | Notes |
|---|---|---|---|
| id / public_id | bigint UN / ulid | PK / UNIQUE | |
| name | string(80) | UNIQUE | e.g. "Databases" |
| marker | string(20) | default 'primary' | enum `AccentMarker` |
| position | smallint UN | idx(is_visible, position) | |
| is_visible | boolean | default true | |

**Relations:** hasMany capability_items (cascade delete).

### capability_items — the technology tags

| Column | Type | Constraints/Index | Notes |
|---|---|---|---|
| id / public_id | bigint UN / ulid | PK / UNIQUE | |
| capability_group_id | bigint UN | FK → capability_groups, cascadeOnDelete | |
| label | string(60) | UNIQUE(capability_group_id, label) | |
| position | smallint UN | idx(group, is_visible, position) | |
| is_visible | boolean | default true | |

**Uniqueness rules:** (group, label) — the same tag twice in one row is a mistake.

### experiences — accordion entries

| Column | Type | Constraints/Index | Notes |
|---|---|---|---|
| id / public_id | bigint UN / ulid | PK / UNIQUE | |
| period_label | string(24) | NOT NULL | printed verbatim ("NOV22—FEB25") |
| role | string(100) | UNIQUE(role, company) | |
| company | string(200) | | includes the location suffix |
| is_current | boolean | default false | period shown in accent |
| is_expanded_by_default | boolean | default false | open on first paint |
| position | smallint UN | idx(is_visible, position) | |
| is_visible | boolean | default true | |

**Relations:** hasMany experience_highlights (cascade delete).

### experience_highlights — bullets

| Column | Type | Constraints/Index | Notes |
|---|---|---|---|
| id / public_id | bigint UN / ulid | PK / UNIQUE | |
| experience_id | bigint UN | FK → experiences, cascadeOnDelete | |
| description | string(400) | UNIQUE(experience_id, description) | |
| position | smallint UN | idx(experience, is_visible, position) | |
| is_visible | boolean | default true | |

### works — Selected work cards

| Column | Type | Constraints/Index | Notes |
|---|---|---|---|
| id / public_id | bigint UN / ulid | PK / UNIQUE | |
| eyebrow | string(80) | NOT NULL | "ERP · LARAVEL · RBAC" |
| title | string(140) | UNIQUE | |
| description | string(400) | NOT NULL | |
| media_label | string(80) | NOT NULL | caption inside the striped placeholder |
| image_path | string(255) | NULL | relative to `public/`; null keeps the placeholder |
| position | smallint UN | idx(is_visible, position) | |
| is_visible | boolean | default true | |

### contact_tiles — the contact strip

| Column | Type | Constraints/Index | Notes |
|---|---|---|---|
| id / public_id | bigint UN / ulid | PK / UNIQUE | |
| channel | string(20) | UNIQUE | enum `ContactChannel`; decides link behaviour |
| title | string(60) | NOT NULL | "Email" |
| value_label | string(160) | NOT NULL | what the visitor reads |
| href | string(255) | NOT NULL | mailto:/tel:/https:/path |
| badge_label | string(24) | NULL | "PREFERRED" — turns the ordinal accent-coloured |
| position | smallint UN | idx(is_visible, position) | ordinal shown as 01, 02 … |
| is_visible | boolean | default true | |

**Uniqueness rules:** `channel` (one tile per channel).

### ER summary

```
site_settings (singleton)
page_sections (6 fixed keys)
stats · profile_facts · works · contact_tiles          (flat, ordered, publishable)
capability_groups 1--* capability_items                (cascade)
experiences       1--* experience_highlights           (cascade)
```

### Notes

- No soft deletes: content rows are either published, hidden (`is_visible=false`)
  or genuinely gone. Hiding is the reversible action.
- CHECK constraints are added with raw SQL and skipped on SQLite, which cannot
  `ALTER TABLE ADD CONSTRAINT`. Tests run on MySQL (RULES §7), so the constraint
  is exercised.
- The public page issues 8 queries once per cache miss
  (`PortfolioContentService::published()`), all covered by the indexes above; no
  row count here approaches the 10k `EXPLAIN` threshold.
