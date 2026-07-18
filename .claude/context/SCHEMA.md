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

## PART B — Living schema (THIS project) — TEMPLATE

> AI: replicate this block per table. Keep in sync with migrations. Delete this template note in real projects.

### users
| Column | Type | Constraints/Index | Notes |
|---|---|---|---|
| id | bigint UN | PK | |
| public_id | ulid | UNIQUE | exposed identifier |
| name | string(120) | NOT NULL | PII |
| email | string(255) | UNIQUE | PII |
| password | string | hashed cast | |
| role | string(20) | idx | enum `UserRole` |
| timestamps / deleted_at | | idx(deleted_at) | soft deletes |

**Relations:** hasMany bookings, orders. **Uniqueness rules:** email. **Hot queries:** login by email (UNIQUE covers it).

### {table_name}
| Column | Type | Constraints/Index | Notes |
|---|---|---|---|
| … | … | … | … |

**Relations:** …
**Uniqueness rules:** …
**Hot queries + supporting indexes:** …
**JSON shapes (if any):**
```json
{ "shipping": { "line1": "", "city": "", "emirate": "", "phone": "" } }
```

### ER summary (keep updated)
```
users 1--* bookings *--1 doctors *--* services (doctor_service)
users 1--* orders 1--* order_items *--1 variants *--1 products *--1 categories
```
