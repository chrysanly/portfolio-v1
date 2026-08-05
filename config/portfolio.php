<?php

declare(strict_types=1);

return [

    /*
    |---------------------------------------------------------------------------
    | Admin PIN gate
    |---------------------------------------------------------------------------
    |
    | The portfolio content admin is protected by a single PIN. The PIN itself is
    | never stored: only a one-way bcrypt hash lives in the environment, and it
    | is verified in constant time (RULES §5.8). Generate a new hash with:
    |
    |   php artisan portfolio:pin-hash
    |
    | `session_lifetime` is how long a confirmed PIN session stays valid before
    | the gate asks again. Every mutation additionally re-verifies the PIN, so
    | this value only controls how often the login screen reappears.
    |
    */

    'admin' => [
        'pin_hash' => env('PORTFOLIO_ADMIN_PIN_HASH', ''),
        'session_key' => 'portfolio.admin.confirmed_at',
        'session_lifetime' => (int) env('PORTFOLIO_ADMIN_SESSION_LIFETIME', 120),
        'pin_length' => (int) env('PORTFOLIO_ADMIN_PIN_LENGTH', 6),

        /*
         * The Fortify account for /login and /dashboard, created by
         * AdminUserSeeder. Unrelated to the PIN above: the content admin at
         * /admin never touches the users table.
         */
        'user' => [
            'name' => env('ADMIN_USER_NAME', 'Portfolio Admin'),
            'email' => env('ADMIN_USER_EMAIL', 'admin@portfolio.test'),
            'password' => env('ADMIN_USER_PASSWORD'),
        ],
    ],

    /*
    |---------------------------------------------------------------------------
    | Public page cache
    |---------------------------------------------------------------------------
    |
    | The public portfolio is a read-heavy page built from ten tables, so the
    | shaped payload is cached and busted by every write (RULES §6.5).
    |
    */

    'cache' => [
        // Bump the version suffix whenever the payload's shape changes: it
        // retires every old entry without needing a cache:clear on deploy.
        'key' => 'portfolio.content.v2',
        'ttl' => (int) env('PORTFOLIO_CACHE_TTL', 3600),
    ],

];
