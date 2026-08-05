<?php

declare(strict_types=1);

namespace App\Services\Auth;

use Illuminate\Contracts\Session\Session;
use Illuminate\Support\Facades\Date;

/**
 * The single owner of "is this browser inside a confirmed PIN session".
 *
 * Controllers and middleware ask this class instead of reaching into the
 * session bag directly, so the storage key and the expiry rule live once.
 */
final readonly class AdminPinSession
{
    public function __construct(
        private Session $session,
        private string $key,
        private int $lifetimeInMinutes,
    ) {}

    public function confirm(): void
    {
        $this->session->put($this->key, Date::now()->getTimestamp());
        $this->session->regenerate();
    }

    public function isConfirmed(): bool
    {
        $confirmedAt = $this->session->get($this->key);

        if (! is_int($confirmedAt)) {
            return false;
        }

        return Date::createFromTimestamp($confirmedAt)
            ->addMinutes($this->lifetimeInMinutes)
            ->isFuture();
    }

    public function forget(): void
    {
        $this->session->forget($this->key);
        $this->session->regenerate();
    }
}
