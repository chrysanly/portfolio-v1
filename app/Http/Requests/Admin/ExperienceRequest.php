<?php

declare(strict_types=1);

namespace App\Http\Requests\Admin;

use App\Concerns\ConfirmsAdminPin;
use App\Contracts\PinVerifier;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/**
 * Validates a role in the experience accordion.
 *
 * Used by both store and update: the shape is identical, and the unique rule
 * ignores the model currently being edited.
 */
final class ExperienceRequest extends FormRequest
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
            'period_label' => ['required', 'string', 'max:24'],
            'role' => [
                'required', 'string', 'max:100',
                Rule::unique('experiences', 'role')->where('company', $this->input('company'))->ignore($this->route('experience')),
            ],
            'company' => ['required', 'string', 'max:200'],
            'is_current' => ['required', 'boolean'],
            'is_expanded_by_default' => ['required', 'boolean'],
            'position' => ['required', 'integer', 'between:0,999'],
            'is_visible' => ['required', 'boolean'],
        ];
    }
}
