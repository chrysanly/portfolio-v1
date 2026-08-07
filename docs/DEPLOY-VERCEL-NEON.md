# Deploying Laravel + Inertia to Vercel with a Neon Postgres database

Written for an agent picking this up cold. Every problem below was hit and fixed
on this project; each one is recorded as **symptom → cause → fix → how it was
verified**, because most of them present with an error message that names
something other than the actual failure.

Read the "Why serverless breaks Laravel" section first. Five of the six bugs
below are the same root cause wearing different masks: **a Vercel function's
filesystem is read-only except `/tmp`, and its TLS terminates at the edge.**

---

## Why serverless breaks Laravel

Laravel assumes a normal server: a writable disk, one long-lived process, and a
direct connection from the browser. A Vercel function gives you none of that.

| Assumption | Reality on Vercel | What breaks |
| --- | --- | --- |
| `storage/` is writable | read-only outside `/tmp` | sessions, cache, logs, compiled views |
| `bootstrap/cache/` is writable | read-only outside `/tmp` | **the app cannot boot at all** |
| A local database file works | bundle is read-only | any write returns "readonly database" |
| The request scheme is real | TLS ends at the edge, function sees plain HTTP | every asset URL is `http://` and gets blocked |
| The process persists | dies between requests | in-memory state, file caches |

Anything the app writes at runtime must go to `/tmp`, and `/tmp` is per-instance
and disappears. Nothing durable may live there.

---

## Part 1 — Setup from scratch

### 1.1 `vercel.json`

```json
{
    "$schema": "https://openapi.vercel.sh/vercel.json",
    "framework": null,
    "outputDirectory": "public",
    "installCommand": "npm ci && if command -v composer >/dev/null 2>&1; then composer install --no-dev --prefer-dist --no-interaction --optimize-autoloader; else echo 'composer unavailable in build container — relying on the vercel-php builder to install vendor/'; fi",
    "buildCommand": "npm run build",
    "functions": {
        "api/index.php": {
            "runtime": "vercel-php@0.9.0",
            "maxDuration": 30
        }
    },
    "env": {
        "DB_CONNECTION": "pgsql",
        "DB_SSLMODE": "require",
        "SESSION_DRIVER": "database",
        "CACHE_STORE": "database",
        "QUEUE_CONNECTION": "sync",
        "LOG_CHANNEL": "stderr"
    },
    "routes": [
        { "src": "/build/(.*)", "dest": "/public/build/$1" },
        { "src": "/images/(.*)", "dest": "/public/images/$1" },
        {
            "src": "/([^/]+\\.(?:ico|svg|png|jpe?g|webp|gif|pdf|txt|xml|json|webmanifest|woff2?|ttf|map))",
            "dest": "/public/$1"
        },
        { "src": "/(.*)", "dest": "/api/index.php" }
    ]
}
```

Points that are not obvious:

- **`env` here overrides Vercel dashboard variables.** A `DB_CONNECTION` left at
  `sqlite` in this block silently beats a correct `DB_URL` set in the dashboard.
  Non-secret, non-environment-specific values belong here; secrets never do.
- **`outputDirectory` does not change route resolution.** Legacy `routes` resolve
  `dest` from the repository root, which is why the `dest` values keep their
  `/public` prefix even though `outputDirectory` is `public`.
- **`LOG_CHANNEL=stderr`** is mandatory. `storage/logs` is ephemeral; stderr is
  what Vercel's Runtime Logs capture, and it is the only way to see a real
  exception once `APP_DEBUG=false`.

### 1.2 `api/index.php`

Vercel requires the entry point to live in `/api`. This file redirects every
runtime-writable path into `/tmp` **before** Laravel boots.

```php
<?php

declare(strict_types=1);

$storage = '/tmp/storage';
$bootstrapCache = '/tmp/bootstrap/cache';

foreach ([
    $storage.'/app/public',
    $storage.'/framework/cache/data',
    $storage.'/framework/sessions',
    $storage.'/framework/testing',
    $storage.'/framework/views',
    $storage.'/logs',
    $bootstrapCache,
] as $directory) {
    if (! is_dir($directory)) {
        mkdir($directory, 0755, true);
    }
}

$paths = [
    'LARAVEL_STORAGE_PATH' => $storage,
    'APP_SERVICES_CACHE' => $bootstrapCache.'/services.php',
    'APP_PACKAGES_CACHE' => $bootstrapCache.'/packages.php',
    'APP_CONFIG_CACHE' => $bootstrapCache.'/config.php',
    'APP_ROUTES_CACHE' => $bootstrapCache.'/routes-v7.php',
    'APP_EVENTS_CACHE' => $bootstrapCache.'/events.php',
];

foreach ($paths as $key => $value) {
    $_ENV[$key] = $value;
    $_SERVER[$key] = $value;
}

require __DIR__.'/../public/index.php';
```

`bootstrap/cache` is the one people miss — it is not part of the storage tree,
and forgetting it makes the app fail to boot entirely. See Bug 2.

### 1.3 `bootstrap/app.php` — trust the proxy

```php
->withMiddleware(function (Middleware $middleware): void {
    $middleware->trustProxies(at: '*');
    // ...
})
```

Without this the site renders as a blank page. See Bug 4.

### 1.4 Build without PHP

Vercel's build container has **Node but not necessarily PHP or Composer**, so the
frontend build must not shell out to `php artisan`:

- Commit generated Wayfinder/route output (`resources/js/{actions,routes}`) and
  skip the generating Vite plugin when `process.env.VERCEL` is set.
- Keep `buildCommand` as plain `npm run build`. No `artisan config:cache` etc. —
  they need a bootable PHP app.
- Regenerate committed output locally after changing routes or controllers:
  `php artisan wayfinder:generate`.

### 1.5 Neon

1. Create a project at [neon.tech](https://neon.tech) — free tier, no card.
   Pick the region closest to the Vercel deployment region.
2. Copy the connection string:
   `postgresql://USER:PASSWORD@ep-<id>.<region>.aws.neon.tech/neondb?sslmode=require`
3. Note the **endpoint ID** — the first label of the host, `ep-<id>`. Required
   for `PGOPTIONS`, see Bug 3.

Local `.env`:

```dotenv
DB_CONNECTION=pgsql
DB_URL=postgresql://USER:PASSWORD@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
DB_SSLMODE=require
CACHE_STORE=array      # NOT database locally — see Bug 6
```

Then `php artisan migrate`.

### 1.6 Vercel environment variables (dashboard, Production scope)

| Variable | Value | Secret |
| --- | --- | --- |
| `DB_URL` | the Neon connection string | yes |
| `APP_KEY` | `base64:...` | yes |
| `PGOPTIONS` | `endpoint=ep-<your-endpoint-id>` | no |
| `APP_ENV` | `production` | no |
| `APP_DEBUG` | `false` | no |
| `APP_URL` | the deployed URL | no |
| `APP_NAME` | site name | no |

Do **not** duplicate anything already in `vercel.json`'s `env` block.

**Environment variables are baked in at deploy time.** Adding one changes nothing
until you redeploy. This alone explains many "I set it and it still fails"
reports.

---

## Part 2 — The bugs, in the order they surface

Each one blocks the next, so work top to bottom.

### Bug 1 — Build succeeds, deploy fails on output directory

**Symptom**

```
Error: No Output Directory named "dist" found after the Build completed.
```

Vite reports success; the deploy fails immediately after.

**Cause** Vercel applied a Vite framework preset instead of honouring
`"framework": null`. Vite's default output is `dist/`; this project writes to
`public/build`. Nothing ever produces `dist/`.

**Fix** Add `"outputDirectory": "public"` to `vercel.json`. Leave the `routes`
`dest` paths alone — they keep their `/public` prefix.

**If it persists** Set Project Settings → General → Framework Preset to **Other**.
A dashboard setting can outrank `vercel.json`.

---

### Bug 2 — `Target class [view] does not exist`

**Symptom** Every request 500s. The log shows a `BindingResolutionException` for
`view`, with a trace through `RegisterErrorViewPaths` and the exception handler.

**Cause — not what the message says.** `bootstrap/cache` ships empty, because
`bootstrap/cache/.gitignore` ignores `*`. On the first request Laravel compiles
the package and service manifests into it. Both
`ProviderRepository::writeManifest()` and `PackageManifest::write()` throw on a
non-writable directory:

```
The /var/task/user/bootstrap/cache directory must be present and writable.
```

That throw lands **midway through registering providers**, so `view` is never
bound. The exception handler then needs `view` to render its own error page and
fails again — and that second failure is the only one that reaches the log. The
real cause never appears.

**Fix** Relocate all five caches to `/tmp` in `api/index.php` (§1.2).
`Application::normalizeCachePath()` honours an absolute path per cache; its
prefix check is `['/', '\\']`, so a `/tmp/...` value is used verbatim.

**Diagnostic trick worth remembering** The HTTP path masks this error; the
console path reports it plainly. If an HTTP request gives a nonsensical container
binding failure, run the same thing through `php artisan` to see the true
exception.

**Verified** With relocation: HTTP 200, `view` bound, byte-identical output to a
known-good local render, manifests written under `/tmp`, `bootstrap/cache`
untouched.

---

### Bug 3 — Neon rejects the connection: `Endpoint ID is not specified`

**Symptom** The app boots (`/up` returns 200, static assets serve) but every
route touching the database or session 500s:

```
SQLSTATE[08006] [7] ERROR: Endpoint ID is not specified. Either please upgrade
the postgres client library (libpq) for SNI support or pass the endpoint ID
(first part of the domain name) as a parameter
```

**Cause** The `pdo_pgsql` bundled with `vercel-php` has a `libpq` without SNI
support, so Neon cannot tell which endpoint the connection is for. A modern local
libpq *does* support SNI — **this reproduces only in production.**

**Fix** Set one dashboard variable and redeploy:

```
PGOPTIONS=endpoint=ep-<your-endpoint-id>
```

libpq uses `PGOPTIONS` as the default for its `options` parameter, so the
endpoint is sent at connection setup. No code change, no password change, auth
stays on `scram-sha-256`.

**Why not the other documented workarounds** — all three were tested:

| Approach | Result |
| --- | --- |
| `options=endpoint%3D...` in `DB_URL` query | ✗ Laravel's `PostgresConnector::getDsn()` only emits `host`, `dbname`, `port`, `charset`, `application_name`, `ssl*`. A URL query `options` lands in `config['options']`, which Laravel treats as a PDO options *array* and breaks. |
| `dbname=neondb options=endpoint=...` | ✗ Laravel quotes it as `dbname='...'`; the quoting stops libpq expanding it. Fails with `database "neondb options=endp..." does not exist`. |
| endpoint in the password field | ~ works, but downgrades auth from `scram-sha-256` to plaintext `password`. |
| **`PGOPTIONS` env var** | **✓ chosen** |

**How to verify `PGOPTIONS` is actually transmitted** (works from any machine,
including one whose libpq has SNI): set a deliberately **wrong** endpoint. Neon
replies `Inconsistent endpoint`, which only happens if the parameter reached the
server. A correct value connects. This distinguishes "being sent" from "silently
ignored".

**Note** `vercel-php@0.9.0` is already the latest release, and
[vercel-community/php#458](https://github.com/vercel-community/php/issues/458) is
this exact bug — closed, no released fix. A version bump is not available.

---

### Bug 4 — Page loads but renders blank/dark; console shows mixed content

**Symptom**

```
Mixed Content: The page at 'https://...' was loaded over HTTPS, but requested an
insecure stylesheet/script/font 'http://...'. This request has been blocked.
```

HTML is served with a 200; the browser blocks every asset.

**Cause** Vercel terminates TLS at the edge and forwards to the function over
plain HTTP. With `trustProxies` unconfigured, `TrustProxies` trusts nothing,
`X-Forwarded-Proto: https` is ignored, and the URL generator builds every asset
URL from the unencrypted scheme it sees.

**Fix**

```php
$middleware->trustProxies(at: '*');
```

`'*'` rather than a fixed list because Vercel's forwarding IPs are dynamic and
undocumented. The function is only reachable through that proxy, so there is no
untrusted path that could spoof the headers.

**Verified** A forwarded request before the change produced 17 `http://` asset
references and 0 `https`; after, 0 and 17. Invisible locally — pin it with a
test (§3).

---

### Bug 5 — `/admin` cannot save (only if still on file-based SQLite)

**Symptom** Reads work, every write returns
`SQLSTATE[HY000]: General error: 8 attempt to write a readonly database`.

**Cause** A committed `database/database.sqlite` sits in the read-only bundle.

**Fix** Move to a network database (Neon). Then:

- Untrack the SQLite file so a stale local copy cannot be mistaken for
  production data: `git rm --cached database/database.sqlite`, add `*.sqlite` to
  `database/.gitignore`.
- Port the existing rows across (§4).

---

### Bug 6 — Stale/incorrect absolute URLs on the live site

**Symptom** The deployed page requests
`http://localhost:3000/images/portrait.jpeg` → `ERR_CONNECTION_REFUSED`. Saving
anything in `/admin` fixes it, then it comes back later.

**Cause** Resources build absolute URLs with `asset()`, and the page payload is
cached. With `CACHE_STORE=database` **and local `.env` pointing at the same Neon
database**, rendering the site locally writes a payload full of
`http://localhost:.../` URLs into the shared cache table — which production then
serves. The database stores a clean relative path; the host is baked in at render
time.

**Fix** In the **local** `.env` only:

```dotenv
CACHE_STORE=array
```

Local renders then cache per-request and never touch the shared cache table.
Production keeps `CACHE_STORE=database` from `vercel.json`.

Alternative: point local development at a separate Neon branch. More setup,
cleaner separation.

---

## Part 3 — The guard that prevents catastrophe

**Read this before running the test suite against a project with a live
`DB_URL`.** Without it, `php artisan test` destroys production.

Every connection in `config/database.php` reads `'url' => env('DB_URL')`.
`ConfigurationUrlParser::parseConfiguration()` rewrites the **driver** from the
URL scheme (`postgresql` → `pgsql`) whenever that value is truthy — outranking
`DB_CONNECTION` and `DB_DATABASE`. So a `phpunit.xml` that pins
`DB_CONNECTION=sqlite` and `DB_DATABASE=:memory:` is **not enough**:
`RefreshDatabase` would run `migrate:fresh` against the production Postgres.

Two independent guards:

**1. `.env.testing`** — Laravel loads it *instead of* `.env` when
`APP_ENV=testing`, so production credentials never enter the suite. It contains
no secrets (in-memory SQLite, throwaway `APP_KEY`), and must be committed so it
exists in CI. If the repo's `.gitignore` has a blanket `.env.*`, re-allow it:

```gitignore
.env.*
!.env.example
!.env.testing
```

**2. `phpunit.xml`** — blank the URL explicitly. The parser short-circuits on a
falsy url (`if (! $url) return $config;`):

```xml
<env name="DB_CONNECTION" value="sqlite"/>
<env name="DB_DATABASE" value=":memory:"/>
<env name="DB_URL" value=""/>
```

**3. A test that fails loudly if either stops holding** — see
`tests/Feature/TestEnvironmentIsolationTest.php`: asserts the suite runs on
in-memory SQLite, that no connection carries a URL, and that `.env.testing` is
the file in play.

---

## Part 4 — Migrating existing SQLite content to Postgres

Do **not** reseed. If anything was edited through `/admin` since the seeder was
written, reseeding silently reverts it. Copy the live rows instead — see
`app/Console/Commands/PortSqliteToPgsql.php`.

Two details that a naive `INSERT` loop gets wrong:

1. **Booleans.** SQLite has no boolean type and stores them as `0`/`1`. Postgres
   rejects an integer bound to a `boolean` column. Coerce each value against the
   *target* schema's column types — the target is the only schema that knows the
   real type.
2. **Sequences.** Rows are copied with their original ids to preserve foreign
   keys, which leaves Postgres identity sequences at 1. The first insert made
   through `/admin` then collides on the primary key. Re-sync afterwards:

```sql
SELECT setval(
    pg_get_serial_sequence(?, 'id'),
    COALESCE((SELECT MAX(id) FROM {table}), 1),
    (SELECT MAX(id) IS NOT NULL FROM {table})
);
```

Copy parents before children; delete children before parents. Run inside a
transaction with a `--pretend` mode that rolls back, so type errors surface
before anything is committed.

**Verify the sequence fix with a real insert**, not by reading catalog tables:
insert a row, confirm the new id exceeds the previous `MAX(id)`, delete it.

---

## Part 5 — Diagnostic playbook

### Narrow it down with four requests

```bash
B="https://your-app.vercel.app"
for p in "/up" "/build/manifest.json" "/favicon.svg" "/"; do
  printf "%-24s " "$p"; curl -s -o /dev/null -w "HTTP %{http_code}\n" "$B$p"
done
```

| Pattern | Meaning |
| --- | --- |
| everything 500s, including `/up` | app cannot boot → Bug 2 |
| `/up` + assets 200, `/` 500 | boot fine, database/session layer → Bug 3, or missing `DB_URL`/`APP_KEY` |
| everything 200 but page is blank | assets blocked → Bug 4 |
| deploy never produced a URL | build/output config → Bug 1 |

### Redirect to `vercel.com/sso-api`

Not an app error — Deployment Protection. Settings → Deployment Protection →
Vercel Authentication → **Disabled** for a public site.

### Reading a real exception

`APP_DEBUG=false` correctly hides causes. Either read Vercel's **Runtime Logs**
(`LOG_CHANNEL=stderr` puts the exception there), or set `APP_DEBUG=true`
**temporarily**, reproduce, and set it straight back — the debug page prints
`DB_URL`, the password, and the whole environment to anyone who loads the page.

When a pasted trace starts mid-stack (`#44` …), the exception class and message
are above frame `#0` and have been cut off. Ask for the top of the entry; the
frames shown are usually generic middleware and say nothing.

---

## Part 6 — Pre-deploy checklist

- [ ] `vercel.json` — `outputDirectory`, `env` block pins `DB_CONNECTION=pgsql`
- [ ] `api/index.php` — storage **and** `bootstrap/cache` redirected to `/tmp`
- [ ] `bootstrap/app.php` — `trustProxies(at: '*')`
- [ ] Dashboard vars set **and redeployed afterwards**, Production scope
- [ ] `PGOPTIONS=endpoint=ep-...` matches the host in `DB_URL`
- [ ] `APP_DEBUG=false`
- [ ] `.env.testing` committed; `phpunit.xml` blanks `DB_URL`
- [ ] Local `.env` has `CACHE_STORE=array`
- [ ] `.env.example` contains **placeholders only** — never a real credential
- [ ] No database file tracked in git
- [ ] `npm run build` passes with `SKIP_WAYFINDER=1` (mimics the Vercel build)
- [ ] `php artisan test` passes

### Secret hygiene

Scan staged content before every push — a real credential pasted into a tracked
template (`.env.example`) is the easiest mistake to make here:

```bash
git diff --cached | grep -in "neon\.tech\|postgres://\|postgresql://\|npg_\|base64:"
```

If one was ever committed, rotating the credential is the only real remedy;
removing the file in a later commit does not remove it from history.
