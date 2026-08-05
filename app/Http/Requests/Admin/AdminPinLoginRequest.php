<?php

declare(strict_types=1);

namespace App\Http\Requests\Admin;

use App\Concerns\ConfirmsAdminPin;
use App\Contracts\PinVerifier;
use Illuminate\Foundation\Http\FormRequest;

/**
 * Opens a PIN session. Throttled at the route (RULES §5.6).
 */
final class AdminPinLoginRequest extends FormRequest
{
    use ConfirmsAdminPin;

    /**
     * The PIN itself is the credential — the route is intentionally public.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, array<int, mixed>>
     */
    public function rules(PinVerifier $pinVerifier): array
    {
        return $this->adminPinRules($pinVerifier);
    }
}
