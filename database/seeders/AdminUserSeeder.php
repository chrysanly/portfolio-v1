<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Date;
use RuntimeException;

/**
 * Creates the account used for the Fortify-authenticated area (/login, /dashboard,
 * /settings). The portfolio *content* admin at /admin does not use this account —
 * it is PIN-only by design.
 *
 * Credentials come from ADMIN_USER_* in `.env`. Idempotent: matched on email, so
 * re-running resets the password rather than creating a second account.
 */
final class AdminUserSeeder extends Seeder
{
    private const FALLBACK_PASSWORD = 'password';

    public function run(): void
    {
        $email = (string) config('portfolio.admin.user.email');
        $name = (string) config('portfolio.admin.user.name');
        $password = (string) (config('portfolio.admin.user.password') ?? '');

        if ($password === '') {
            if (app()->isProduction()) {
                throw new RuntimeException(
                    'Set ADMIN_USER_PASSWORD before seeding an admin account in production.',
                );
            }

            $password = self::FALLBACK_PASSWORD;

            $this->command?->warn(
                'ADMIN_USER_PASSWORD is empty — using "'.self::FALLBACK_PASSWORD.'" for local testing only.',
            );
        }

        // The `password` cast hashes this on save; the plain value never persists.
        $user = User::query()->updateOrCreate(
            ['email' => $email],
            ['name' => $name, 'password' => $password],
        );

        // Not mass-assignable on purpose, so it is set explicitly.
        $user->forceFill(['email_verified_at' => Date::now()])->save();

        $this->command?->info("Admin account ready: {$email}");
    }
}
