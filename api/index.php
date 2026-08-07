<?php

declare(strict_types=1);

/*
 * Serverless entry point for Vercel.
 *
 * Everything outside /tmp is read-only in a Vercel function, so Laravel's
 * storage tree is rebuilt under /tmp on each cold start and the framework is
 * pointed at it through LARAVEL_STORAGE_PATH (honoured by
 * Illuminate\Foundation\Application::storagePath()).
 *
 * Consequences worth knowing, rather than discovering in production:
 *  - /tmp is per-instance and disappears. Nothing durable may live here, so
 *    FILESYSTEM_DISK must be s3 (or another remote disk) for uploads, and
 *    SESSION_DRIVER/CACHE_STORE must be database or cookie, never file.
 *  - storage/logs is ephemeral too; send logs to stderr (LOG_CHANNEL=stderr)
 *    so Vercel captures them.
 *
 * bootstrap/cache needs the same treatment, and it is easy to miss because it
 * is not part of the storage tree. It ships empty (bootstrap/cache/.gitignore
 * ignores *), so on the first request Laravel tries to compile the package and
 * service manifests into it. Both ProviderRepository::writeManifest() and
 * PackageManifest::write() hard-fail on a non-writable directory, and that
 * happens midway through registering providers — so the app dies before `view`
 * is bound and the error handler then cannot render its own error page. The
 * symptom is a confusing "Target class [view] does not exist" that says nothing
 * about the filesystem. Application::normalizeCachePath() accepts an absolute
 * path for each cache, so they are pointed at /tmp and rebuilt per cold start.
 */

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
