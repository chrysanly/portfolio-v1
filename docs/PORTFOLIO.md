# CJ Roma Portfolio — build notes

The public portfolio at `/` renders entirely from the database. Everything on it
is edited at `/admin`, behind a PIN.

---

## One-time setup

```bash
# 1. Database (MySQL 8.4)
mysql -u root -e "CREATE DATABASE cj_portfolio CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# 2. Schema + real content
php artisan migrate
php artisan db:seed --class="Database\Seeders\PortfolioContentSeeder"

# 3. Assets
npm install
composer dev            # server + queue + vite
```

Then open <http://localhost:8000> for the portfolio and
<http://localhost:8000/admin> for the content admin.

### Tests

Tests run on MySQL, not SQLite (RULES §7):

```bash
cp .env.test.example .env.test
mysql -u root -e "CREATE DATABASE cj_portfolio_test CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
php artisan key:generate --env=test
php artisan test
```

---

## The PIN gate

| Concern | Where it lives |
|---|---|
| Secret storage | `PORTFOLIO_ADMIN_PIN_HASH` in `.env` — a bcrypt hash, never the PIN |
| Verification | `App\Services\Auth\HashedPinVerifier` (constant time, fails closed) |
| Contract | `App\Contracts\PinVerifier` — injected, never `app()`-resolved |
| Session | `App\Services\Auth\AdminPinSession` (`session_lifetime` minutes) |
| Route gate | `App\Http\Middleware\EnsureAdminPinSession` on every admin route |
| Per-write gate | `App\Rules\MatchesAdminPin`, added by `App\Concerns\ConfirmsAdminPin` to **every** admin FormRequest |
| Brute-force gate | `throttle:admin-pin` — 5 attempts per minute per IP |

Two independent checks therefore stand between a request and a content change:
the session must be confirmed, **and** the request body must carry the correct
PIN. A stolen session cookie alone changes nothing.

To change the PIN:

```bash
php artisan portfolio:pin-hash        # prompts twice, prints the hash
# paste the printed line into .env, then:
php artisan config:clear
```

---

## Where content lives

| Screen | Table(s) | What it controls |
|---|---|---|
| Site settings | `site_settings` | header, hero, portrait, profile prose, contact headline, footer, reachability, SEO, default theme/hue |
| Sections | `page_sections` | nav labels, section headings, the "click a row to expand" note, order, visibility |
| Headline figures | `stats` | the three-tile strip |
| Profile rows | `profile_facts` | the label/value table |
| Capabilities | `capability_groups`, `capability_items` | capability rows and their tags |
| Experience | `experiences`, `experience_highlights` | accordion entries and bullets |
| Selected work | `works` | project cards |
| Contact tiles | `contact_tiles` | the four-tile contact strip |

Sections can be renamed, reordered and hidden but not created or deleted — the
six keys are structural (`App\Enums\SectionKey`).

Every collection has `position` (lower first) and `is_visible` (unticking hides
the row from the live page without deleting it).

---

## Request path for a save

```
PUT /admin/stats/{ulid}
  → EnsureAdminPinSession          session confirmed?
  → StatRequest                    all validation, incl. the PIN rule
  → StatController::update         orchestration only
  → UpdateStat (Action)            one business operation
  → ContentWriter                  transaction · duplicate→domain error · cache bust
  → redirect + flash toast
```

The public page reads a single cached payload
(`PortfolioContentService::published()`, `Cache::flexible`). Every write flushes
it after the transaction commits, so a save is visible on the next page load.

---

## Design fidelity

`resources/css/portfolio.css` holds the mockup's exact `oklch` tokens, keyframes
and component classes; the components reference class names only, never raw
values. The mockup resized itself from JavaScript — here the same breakpoints
(480 / 560 / 640 / 680 / 760 / 860 / 900 / 1060 / 1100) are real media queries.

Behaviour lives in hooks, one job each: `use-portfolio-theme`, `use-accent-hue`,
`use-clock`, `use-scroll-reveal`, `use-pointer-parallax`, `use-scroll-parallax`,
`use-active-section`, `use-boot-in`, `use-reduced-motion`. All of them respect
`prefers-reduced-motion`.

The **Tweaks** panel behaves as in the mockup: it retunes the accent hue for that
visitor only (localStorage). The hue saved in Site settings is the starting
point. Only the hue channel is overridden, so light and dark each keep the
lightness and chroma they were designed with.

---

## Files to place by hand

| File | Purpose |
|---|---|
| `public/images/cj-portrait.jpeg` | hero portrait (`portrait_path`) |
| `public/CJ_Roma_Resume.pdf` | résumé download (`resume_path`) |
| `public/images/work/*` | optional work-card screenshots (`image_path`) |

Uploading these from the admin was explicitly out of scope for this pass; the
paths are editable text fields, so dropping a file into `public/` and pointing at
it is all that is needed.

---

## Known deviations from the boilerplate rules

1. **Inertia page filenames are lowercase** (`portfolio/show.tsx`,
   `admin/stats.tsx`) rather than the `PascalCase.tsx` in RULES §2. The root
   Blade template resolves page components with
   `@vite("resources/js/pages/{$page['component']}.tsx")`, so the file path must
   match the component name the controller passes — and the existing pages
   (`dashboard.tsx`, `settings/profile.tsx`) already use this convention.
2. **Admin URLs use a hand-written route map** (`resources/js/lib/admin-routes.ts`)
   instead of Wayfinder helpers, so the frontend type-checks before the first
   `npm run dev` generates them. Swapping in the generated helpers later is a
   one-file change.
3. **No EN/AR bilingual layer.** RULES §9.1 requires it on ≥2 of four demos; this
   is a single English portfolio and the PRD marks AR as out of scope for v1. All
   copy still goes through `__()` and the CSS uses logical properties, so adding
   a locale later does not mean re-laying-out the page.

---

## Troubleshooting

### `npm run build` fails with "Composer detected issues in your platform"

```
[plugin @laravel/vite-plugin-wayfinder]
Error: Command failed: php artisan wayfinder:generate --with-form
PHP Fatal error: Your Composer dependencies require a PHP version ">= 8.3.0".
You are running 7.4.33.
```

Vite is fine — the Wayfinder plugin shells out to `php artisan`, and the `php`
first on PATH is too old for this project. Two ways to fix it, and doing both is
worth the minute:

1. **Pin the binary for the build** (no PATH surgery). Put the absolute path to
   your PHP 8.3+ executable in `.env`:

   ```env
   PHP_EXECUTABLE="C:\Users\admin\.config\herd\bin\php.exe"
   ```

   `vite.config.ts` reads it and passes it to the plugin as its `command`.

2. **Fix PATH anyway**, because `php artisan migrate`, `composer install` and
   `composer dev` all hit the same wall. Confirm with `php -v` that the shell
   sees 8.3+ before running any artisan command; if it does not, move the modern
   PHP directory above the old one in the PATH environment variable and open a
   new terminal.

Common Windows locations for a modern PHP: `%USERPROFILE%\.config\herd\bin`
(Laravel Herd), `C:\laragon\bin\php\php-8.x`, `C:\xampp\php`, `C:\php`.

### `/` still shows the boilerplate welcome page

The archive was not extracted (or was extracted somewhere else). Check:

```powershell
Get-Item routes\web.php | Select-Object Length     # 257 bytes = still the original
Test-Path routes\admin.php                         # False = not extracted
```

Run `install-portfolio.ps1` from the project root — it extracts, verifies, and
tells you what to run next. If the files *are* present and `/` still renders
`welcome`, the route cache is stale: `php artisan optimize:clear`.

### `Target class [Database\Seeders\PortfolioContentSeeder] does not exist`

Same cause — the seeder file is not on disk. If it is present, the optimised
classmap is stale: `composer dump-autoload`.

### `table users has no column named two_factor_secret`

A gap in the boilerplate, not in the portfolio. `create_users_table` omits
Fortify's two-factor columns and Fortify's migration was never published, but
`UserFactory` writes all three of them. Fixed by
`2026_08_04_090000_add_two_factor_columns_to_users_table.php`, which adds them
idempotently (`Schema::hasColumn` guards, so it is safe on a database that
already has them):

```bash
php artisan migrate
```

### `RuntimeException: This password does not use the Bcrypt algorithm` when entering the PIN

`PORTFOLIO_ADMIN_PIN_HASH` holds something that is not a bcrypt digest — most
often the PIN itself pasted in by mistake, or a value the shell mangled. The
verifier now checks the algorithm before calling the hasher, so outside
production you get an instruction instead of a 500. Fix it with:

```bash
php artisan portfolio:pin-hash     # prompts twice, prints the full line
# paste that line into .env, keeping the double quotes, then:
php artisan config:clear
```

A correct value looks like `PORTFOLIO_ADMIN_PIN_HASH="$2y$12$..."` — 60
characters starting `$2y$`. In production a bad value fails closed silently
rather than revealing configuration state.

### Capability tags or experience bullets render empty

Fixed in `CapabilityGroupResource` and `ExperienceResource`: nested children are
now resolved to plain arrays (`->resolve()`) instead of being left as lazy
resource collections. The public payload is cached, and only arrays and scalars
survive a cache round-trip predictably. After pulling this change, clear the
stale entry:

```bash
php artisan cache:clear
```

---

## Authentication surface

There is **no `/login`**. `Fortify::ignoreRoutes()` in `FortifyServiceProvider`
removes every Fortify route (login, register, password reset, two-factor
challenge, passkey endpoints), and `routes/web.php` registers no authenticated
dashboard or settings pages. The only privileged surface is `/admin`, gated by
the PIN.

Consequences worth knowing:

- `AdminUserSeeder` still creates the user row, but nothing can sign in with it.
  Harmless; delete the `AdminUserSeeder::class` line from `DatabaseSeeder` if you
  prefer a clean database.
- `resources/js/pages/auth/*` and `resources/js/pages/settings/*` are now dead
  code, kept so the login can be restored by deleting one line.
- To restore it: remove the `Fortify::ignoreRoutes()` call and re-add the
  `auth`-protected routes plus `require __DIR__.'/settings.php';` to
  `routes/web.php`.
