<?php

declare(strict_types=1);

namespace App\Services\Auth;

use App\Contracts\PinVerifier;
use Illuminate\Contracts\Hashing\Hasher;
use RuntimeException;

/**
 * Verifies the admin PIN against a one-way bcrypt hash.
 *
 * The plain PIN never exists in configuration, in the database, or in logs.
 */
final readonly class HashedPinVerifier implements PinVerifier
{
    public function __construct(
        private Hasher $hasher,
        private string $hash,
        /**
         * Outside production a misconfigured gate throws with instructions;
         * in production it fails closed and stays quiet.
         */
        private bool $explainsMisconfiguration = false,
    ) {}

    public function verify(string $pin): bool
    {
        if ($this->hash === '' || $pin === '') {
            return false;   // fail closed: an unconfigured gate is a locked gate
        }

        // The hasher throws "This password does not use the Bcrypt algorithm" on
        // anything that is not a bcrypt digest — a plain PIN pasted into
        // PORTFOLIO_ADMIN_PIN_HASH by mistake, or a value mangled by the shell.
        // Checking first turns a 500 into an actionable message.
        if (! $this->isBcryptHash()) {
            if ($this->explainsMisconfiguration) {
                throw new RuntimeException(
                    'PORTFOLIO_ADMIN_PIN_HASH does not contain a bcrypt hash. '
                    .'Generate one with `php artisan portfolio:pin-hash` and paste the '
                    .'whole PORTFOLIO_ADMIN_PIN_HASH="..." line into .env (keep the '
                    .'double quotes), then run `php artisan config:clear`. '
                    .'The PIN itself must never be stored there.',
                );
            }

            return false;
        }

        return $this->hasher->check($pin, $this->hash);
    }

    private function isBcryptHash(): bool
    {
        /** @var array{algoName?: string} $info */
        $info = $this->hasher->info($this->hash);

        return ($info['algoName'] ?? 'unknown') === 'bcrypt';
    }
}
