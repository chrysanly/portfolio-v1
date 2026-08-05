<?php

declare(strict_types=1);

namespace App\Http\Requests\Admin;

use App\Concerns\ConfirmsAdminPin;
use App\Contracts\PinVerifier;
use App\Enums\ThemeMode;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

final class SiteSettingUpdateRequest extends FormRequest
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

            'brand_label' => ['required', 'string', 'max:80'],
            'availability_label' => ['required', 'string', 'max:60'],

            'hero_eyebrow' => ['required', 'string', 'max:80'],
            'hero_headline_lead' => ['required', 'string', 'max:200'],
            'hero_headline_highlight' => ['required', 'string', 'max:80'],
            'hero_summary' => ['required', 'string', 'max:1000'],

            'portrait_path' => ['required', 'string', 'max:255'],
            'portrait_alt' => ['required', 'string', 'max:160'],
            'portrait_badge_start' => ['required', 'string', 'max:24'],
            'portrait_badge_end' => ['required', 'string', 'max:24'],

            'profile_lead' => ['required', 'string', 'max:1000'],
            'profile_closing' => ['required', 'string', 'max:1000'],

            'contact_headline_lead' => ['required', 'string', 'max:160'],
            'contact_headline_highlight' => ['required', 'string', 'max:60'],
            'contact_headline_tail' => ['required', 'string', 'max:160'],

            'footer_start' => ['required', 'string', 'max:200'],
            'footer_end' => ['required', 'string', 'max:120'],

            'email' => ['required', 'email', 'max:255'],
            'whatsapp_url' => ['required', 'url', 'max:255'],
            'phone_number' => ['required', 'string', 'max:20'],
            'resume_path' => ['required', 'string', 'max:255'],

            'meta_title' => ['required', 'string', 'max:120'],
            'meta_description' => ['required', 'string', 'max:255'],

            'accent_hue' => ['required', 'integer', 'between:0,360'],
            'default_theme' => ['required', Rule::enum(ThemeMode::class)],
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'phone_number' => is_string($this->input('phone_number'))
                ? trim($this->string('phone_number')->toString())
                : $this->input('phone_number'),
        ]);
    }
}
