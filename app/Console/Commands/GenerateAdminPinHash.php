<?php

declare(strict_types=1);

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Contracts\Hashing\Hasher;

/**
 * Prints the bcrypt hash for a PIN so it can be pasted into `.env`.
 *
 * The PIN is asked for interactively (never a shell argument, which would land
 * in shell history) and never echoed back.
 */
final class GenerateAdminPinHash extends Command
{
    protected $signature = 'portfolio:pin-hash';

    protected $description = 'Hash an admin PIN for PORTFOLIO_ADMIN_PIN_HASH';

    public function handle(Hasher $hasher): int
    {
        $pin = (string) $this->secret('New admin PIN');
        $confirmation = (string) $this->secret('Confirm the PIN');

        if ($pin === '' || $pin !== $confirmation) {
            $this->components->error('The PINs did not match.');

            return self::FAILURE;
        }

        $this->newLine();
        $this->components->info('Add this line to your .env file:');
        $this->line('PORTFOLIO_ADMIN_PIN_HASH="'.$hasher->make($pin).'"');

        return self::SUCCESS;
    }
}
