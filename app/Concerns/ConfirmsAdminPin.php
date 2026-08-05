<?php

declare(strict_types=1);

namespace App\Concerns;

use App\Contracts\PinVerifier;
use App\Rules\MatchesAdminPin;

/**
 * Shared PIN rule for every admin FormRequest.
 *
 * One source of truth for the field name and its rules, so a new admin screen
 * cannot accidentally ship without the PIN gate (DRY, RULES §3).
 */
trait ConfirmsAdminPin
{
    /**
     * @return array<string, array<int, mixed>>
     */
    protected function adminPinRules(PinVerifier $pinVerifier): array
    {
        return [
            'pin' => ['required', 'string', 'max:64', new MatchesAdminPin($pinVerifier)],
        ];
    }
}
