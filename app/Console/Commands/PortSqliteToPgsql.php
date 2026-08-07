<?php

declare(strict_types=1);

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Database\Connection;
use Illuminate\Support\Facades\DB;
use Throwable;

/**
 * One-shot migration of the committed SQLite content store into the live
 * Postgres database.
 *
 * The committed database/database.sqlite was the production source of truth
 * while Vercel served it read-only. Moving to Neon makes /admin writable, so
 * the current rows have to be lifted across once — the PortfolioContentSeeder
 * is deliberately NOT used, because any edit made through /admin since the
 * seeder was written would be silently reverted by reseeding.
 *
 * Two things make this more than an INSERT loop:
 *  - SQLite has no boolean type and stores those columns as 0/1 integers.
 *    Postgres rejects an integer bound to a boolean column, so every value is
 *    coerced against the target's real column types.
 *  - Rows are copied with their original ids to keep foreign keys intact, which
 *    leaves Postgres' identity sequences at 1. They are re-synced afterwards,
 *    otherwise the first row created through /admin collides on the primary key.
 */
final class PortSqliteToPgsql extends Command
{
    protected $signature = 'portfolio:port-to-pgsql
        {--source= : Path to the source SQLite file (defaults to database/database.sqlite)}
        {--pretend : Report what would be copied without writing anything}';

    protected $description = 'Copy the committed SQLite content into the configured Postgres database';

    /**
     * Parents before children, so foreign keys resolve as we go.
     *
     * @var list<string>
     */
    private const TABLES = [
        'users',
        'passkeys',
        'site_settings',
        'page_sections',
        'stats',
        'profile_facts',
        'capability_groups',
        'capability_items',
        'experiences',
        'experience_highlights',
        'works',
        'contact_tiles',
    ];

    public function handle(): int
    {
        $target = config('database.default');

        if ($target !== 'pgsql') {
            $this->components->error(
                "The default connection is [{$target}], not [pgsql]. Set DB_CONNECTION=pgsql before porting."
            );

            return self::FAILURE;
        }

        $source = $this->option('source') ?? database_path('database.sqlite');

        if (! is_file($source)) {
            $this->components->error("No SQLite file at [{$source}].");

            return self::FAILURE;
        }

        config([
            'database.connections.sqlite_source' => [
                'driver' => 'sqlite',
                'database' => $source,
                'prefix' => '',
                'foreign_key_constraints' => false,
            ],
        ]);

        $from = DB::connection('sqlite_source');
        $to = DB::connection('pgsql');

        $this->components->info("Source: {$source}");
        $this->components->info('Target: '.$to->getConfig('host').'/'.$to->getConfig('database'));

        // Fail before writing anything if the schema was never migrated across.
        $missing = array_values(array_filter(
            self::TABLES,
            fn (string $table): bool => ! $to->getSchemaBuilder()->hasTable($table)
        ));

        if ($missing !== []) {
            $this->components->error(
                'Target is missing tables: '.implode(', ', $missing).'. Run `php artisan migrate` first.'
            );

            return self::FAILURE;
        }

        $pretend = (bool) $this->option('pretend');
        $summary = [];

        try {
            $to->beginTransaction();

            // Children first, so deletes do not trip foreign keys.
            foreach (array_reverse(self::TABLES) as $table) {
                if (! $pretend) {
                    $to->table($table)->delete();
                }
            }

            foreach (self::TABLES as $table) {
                if (! $from->getSchemaBuilder()->hasTable($table)) {
                    $summary[] = [$table, '—', 'absent in source, skipped'];

                    continue;
                }

                $booleans = $this->booleanColumns($to, $table);
                $rows = $from->table($table)->get()
                    ->map(fn ($row): array => $this->coerce((array) $row, $booleans))
                    ->all();

                if ($rows === []) {
                    $summary[] = [$table, 0, 'empty'];

                    continue;
                }

                if (! $pretend) {
                    foreach (array_chunk($rows, 200) as $chunk) {
                        $to->table($table)->insert($chunk);
                    }
                }

                $summary[] = [
                    $table,
                    count($rows),
                    $booleans === [] ? 'copied' : 'copied ('.count($booleans).' bool cast)',
                ];
            }

            if (! $pretend) {
                foreach (self::TABLES as $table) {
                    $this->resyncSequence($to, $table);
                }
            }

            $pretend ? $to->rollBack() : $to->commit();
        } catch (Throwable $e) {
            $to->rollBack();

            $this->components->error('Port failed and was rolled back: '.$e->getMessage());

            return self::FAILURE;
        }

        $this->table(['table', 'rows', 'note'], $summary);

        $pretend
            ? $this->components->warn('Pretend run — everything was rolled back.')
            : $this->components->info('Port complete. Verify with `php artisan portfolio:port-to-pgsql --pretend`.');

        return self::SUCCESS;
    }

    /**
     * Boolean column names on the target, which is the only schema that knows
     * the real types — the source stores all of them as integers.
     *
     * @return list<string>
     */
    private function booleanColumns(Connection $to, string $table): array
    {
        return array_values(array_map(
            fn (array $column): string => $column['name'],
            array_filter(
                $to->getSchemaBuilder()->getColumns($table),
                fn (array $column): bool => in_array($column['type_name'], ['bool', 'boolean'], true)
            )
        ));
    }

    /**
     * @param  array<string, mixed>  $row
     * @param  list<string>  $booleans
     * @return array<string, mixed>
     */
    private function coerce(array $row, array $booleans): array
    {
        foreach ($booleans as $column) {
            if (array_key_exists($column, $row) && $row[$column] !== null) {
                $row[$column] = (bool) $row[$column];
            }
        }

        return $row;
    }

    /**
     * Push the identity sequence past the highest copied id. Without this the
     * next insert reuses id 1 and fails on the primary key.
     */
    private function resyncSequence(Connection $to, string $table): void
    {
        $to->statement(
            "SELECT setval(
                pg_get_serial_sequence(?, 'id'),
                COALESCE((SELECT MAX(id) FROM {$table}), 1),
                (SELECT MAX(id) IS NOT NULL FROM {$table})
            )",
            [$table]
        );
    }
}
