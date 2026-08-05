<?php

declare(strict_types=1);

namespace Database\Seeders;

use Illuminate\Database\Seeder;

/**
 * Note: model events stay enabled here on purpose — the content models generate
 * their ULID public identifier on `creating` (SCHEMA §A2).
 */
final class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            PortfolioContentSeeder::class,
            AdminUserSeeder::class,
        ]);
    }
}
