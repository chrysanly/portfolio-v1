<?php

declare(strict_types=1);

namespace App\Http\Requests\Admin;

use App\Concerns\ConfirmsAdminPin;
use App\Contracts\PinVerifier;
use App\Enums\ContactChannel;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/**
 * Validates a contact tile.
 *
 * Used by both store and update: the shape is identical, and the unique rule
 * ignores the model currently being edited.
 */
final class ContactTileRequest extends FormRequest
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
            'channel' => [
                'required',
                Rule::enum(ContactChannel::class),
                Rule::unique('contact_tiles', 'channel')->ignore($this->route('contact_tile')),
            ],
            'title' => ['required', 'string', 'max:60'],
            'value_label' => ['required', 'string', 'max:160'],
            'href' => ['required', 'string', 'max:255'],
            'badge_label' => ['nullable', 'string', 'max:24'],
            'position' => ['required', 'integer', 'between:0,999'],
            'is_visible' => ['required', 'boolean'],
        ];
    }
}
