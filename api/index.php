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
 */

$storage = '/tmp/storage';

foreach ([
    $storage.'/app/public',
    $storage.'/framework/cache/data',
    $storage.'/framework/sessions',
    $storage.'/framework/testing',
    $storage.'/framework/views',
    $storage.'/logs',
] as $directory) {
    if (! is_dir($directory)) {
        mkdir($directory, 0755, true);
    }
}

$_ENV['LARAVEL_STORAGE_PATH'] = $storage;
$_SERVER['LARAVEL_STORAGE_PATH'] = $storage;

require __DIR__.'/../public/index.php';
