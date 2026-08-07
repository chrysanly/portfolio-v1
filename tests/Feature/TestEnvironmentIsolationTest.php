<?php

declare(strict_types=1);

namespace Tests\Feature;

use Illuminate\Support\Facades\DB;
use Tests\TestCase;

/**
 * Guards the boundary between the test suite and the live database.
 *
 * Production runs on a hosted Postgres, and its DB_URL lives in .env. Every
 * connection in config/database.php reads `'url' => env('DB_URL')`, and
 * ConfigurationUrlParser::parseConfiguration() rewrites the driver from the URL
 * scheme (postgresql -> pgsql) whenever that value is truthy — outranking
 * DB_CONNECTION and DB_DATABASE. If that value ever reaches the suite,
 * RefreshDatabase runs migrate:fresh against production and the content is gone.
 *
 * Two independent things keep that from happening: APP_ENV=testing makes Laravel
 * load .env.testing instead of .env, and phpunit.xml blanks DB_URL. This test
 * fails loudly if either stops holding.
 */
final class TestEnvironmentIsolationTest extends TestCase
{
    public function test_the_suite_runs_against_in_memory_sqlite(): void
    {
        $this->assertSame('sqlite', DB::connection()->getDriverName());
        $this->assertSame(':memory:', DB::connection()->getDatabaseName());
    }

    public function test_no_production_database_url_reaches_the_suite(): void
    {
        $this->assertEmpty(env('DB_URL'), 'DB_URL leaked into the test environment.');

        foreach (array_keys(config('database.connections')) as $connection) {
            $this->assertEmpty(
                config("database.connections.{$connection}.url"),
                "Connection [{$connection}] carries a database URL under test."
            );
        }
    }

    public function test_dot_env_testing_is_the_file_in_play(): void
    {
        // .env sets a different APP_NAME; seeing this one proves the substitution.
        $this->assertSame('Portfolio (testing)', config('app.name'));
        $this->assertSame('testing', config('app.env'));
    }
}
