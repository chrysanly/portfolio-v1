<?php

declare(strict_types=1);

namespace App\Http\Requests\Admin;

use App\Concerns\ConfirmsAdminPin;
use App\Contracts\PinVerifier;
use Illuminate\Foundation\Http\FormRequest;

final class PageSectionUpdateRequest extends FormRequest
{
    use ConfirmsAdminPin;

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
            'nav_label' => ['required', 'string', 'max:40'],
            'heading' => ['required', 'string', 'max:80'],
            'note' => ['nullable', 'string', 'max:120'],
            'position' => ['required', 'integer', 'between:0,999'],
            'is_visible' => ['required', 'boolean'],
        ];
    }
}
