<?php

declare(strict_types=1);

namespace App\Rules;

use App\Contracts\PinVerifier;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

/**
 * Validation rule guarding every content mutation: the request must carry the
 * admin PIN, and it must match (RULES §5.1 — authorization on every route,
 * re-proven per write rather than trusted from the session alone).
 */
final readonly class MatchesAdminPin implements ValidationRule
{
    public function __construct(private PinVerifier $pinVerifier) {}

    /**
     * @param  Closure(string): void  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (! is_string($value) || ! $this->pinVerifier->verify($value)) {
            $fail(__('That PIN is not correct.'));
        }
    }
}
