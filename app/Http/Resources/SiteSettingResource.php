<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin SiteSetting
 */
final class SiteSettingResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'brandLabel' => $this->brand_label,
            'availabilityLabel' => $this->availability_label,
            'hero' => [
                'eyebrow' => $this->hero_eyebrow,
                'headlineLead' => $this->hero_headline_lead,
                'headlineHighlight' => $this->hero_headline_highlight,
                'summary' => $this->hero_summary,
            ],
            'portrait' => [
                'src' => asset($this->portrait_path),
                'alt' => $this->portrait_alt,
                'badgeStart' => $this->portrait_badge_start,
                'badgeEnd' => $this->portrait_badge_end,
            ],
            'profile' => [
                'lead' => $this->profile_lead,
                'closing' => $this->profile_closing,
            ],
            'contactHeadline' => [
                'lead' => $this->contact_headline_lead,
                'highlight' => $this->contact_headline_highlight,
                'tail' => $this->contact_headline_tail,
            ],
            'footer' => [
                'start' => $this->footer_start,
                'end' => $this->footer_end,
            ],
            'links' => [
                'email' => $this->email,
                'emailHref' => 'mailto:'.$this->email,
                'whatsappUrl' => $this->whatsapp_url,
                'phoneNumber' => $this->phone_number,
                'phoneHref' => 'tel:'.str_replace(' ', '', $this->phone_number),
                'resumeUrl' => asset($this->resume_path),
            ],
            'seo' => [
                'title' => $this->meta_title,
                'description' => $this->meta_description,
            ],
            'theme' => [
                'accentHue' => $this->accent_hue,
                'defaultMode' => $this->default_theme->value,
            ],
        ];
    }
}
