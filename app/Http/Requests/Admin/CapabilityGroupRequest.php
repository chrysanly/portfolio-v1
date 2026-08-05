<?php

declare(strict_types=1);

namespace App\Http\Requests\Admin;

use App\Concerns\ConfirmsAdminPin;
use App\Contracts\PinVerifier;
use App\Enums\AccentMarker;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/**
 * Validates a capability row.
 *
 * Used by both store and update: the shape is identical, and the unique rule
 * ignores the model currently being edited.
 */
final class CapabilityGroupRequest extends FormRequest
{
    use ConfirmsAdminPin;

    /**
     * Route access is gated by EnsureAdminPinSession; the PIN rule re-proves
     * intent for this specific write (RULES §5.1).
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
        return [
            ...$this->adminPinRules($pinVerifier),
            'name' => ['required', 'string', 'max:80', Rule::unique('capability_groups', 'name')->ignore($this->route('capability_group'))],
            'marker' => ['required', Rule::enum(AccentMarker::class)],
            'position' => ['required', 'integer', 'between:0,999'],
            'is_visible' => ['required', 'boolean'],
        ];
    }
}
