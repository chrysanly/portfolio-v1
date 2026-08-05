<?php

declare(strict_types=1);

namespace App\Http\Requests\Admin;

use App\Concerns\ConfirmsAdminPin;
use App\Contracts\PinVerifier;
use Illuminate\Foundation\Http\FormRequest;

/**
 * The only payload a delete needs: proof of the PIN.
 */
final class ConfirmPinRequest extends FormRequest
{
    use ConfirmsAdminPin;

    /**
     * Route access is already gated by EnsureAdminPinSession; the PIN rule below
     * re-proves intent for this specific write.
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
