<?php

declare(strict_types=1);

namespace App\Contracts;

/**
 * Verifies a plain-text PIN against the configured secret.
 *
 * Kept as an abstraction so the gate can be faked in tests and so the storage
 * mechanism (hashed env value today, KMS/HSM tomorrow) can change without any
 * caller changing (RULES §3-D).
 */
interface PinVerifier
{
    /**
     * Whether the given plain-text PIN matches the configured secret.
     *
     * Implementations must compare in constant time and must fail closed when
     * no secret is configured.
     */
    public function verify(string $pin): bool;
}
