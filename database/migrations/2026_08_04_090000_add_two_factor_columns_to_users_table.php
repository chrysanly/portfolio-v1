<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Adds Fortify's two-factor columns to `users`.
 *
 * `create_users_table` never included them and Fortify's own migration was never
 * published, yet `UserFactory` writes all three and `User::casts()` declares
 * `two_factor_confirmed_at` — so seeding, and every visit to the security
 * settings page, hit "table users has no column named two_factor_secret".
 *
 * No `after()` clause: it is a MySQL-only modifier and column order carries no
 * meaning here.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table): void {
            // TEXT, not string: these hold encrypted payloads, not short values.
            if (! Schema::hasColumn('users', 'two_factor_secret')) {
                $table->text('two_factor_secret')->nullable();
            }

            if (! Schema::hasColumn('users', 'two_factor_recovery_codes')) {
                $table->text('two_factor_recovery_codes')->nullable();
            }

            if (! Schema::hasColumn('users', 'two_factor_confirmed_at')) {
                $table->timestamp('two_factor_confirmed_at')->nullable();
            }
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table): void {
            $table->dropColumn([
                'two_factor_secret',
                'two_factor_recovery_codes',
                'two_factor_confirmed_at',
            ]);
        });
    }
};
