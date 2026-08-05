<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\ThemeMode;
use App\Models\Concerns\HasPublicId;
use Database\Factories\SiteSettingFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * The single row of page-wide content: header, hero, prose, reachability, SEO.
 *
 * @property int $id
 * @property string $public_id
 * @property string $brand_label
 * @property string $availability_label
 * @property string $hero_eyebrow
 * @property string $hero_headline_lead
 * @property string $hero_headline_highlight
 * @property string $hero_summary
 * @property string $portrait_path
 * @property string $portrait_alt
 * @property string $portrait_badge_start
 * @property string $portrait_badge_end
 * @property string $profile_lead
 * @property string $profile_closing
 * @property string $contact_headline_lead
 * @property string $contact_headline_highlight
 * @property string $contact_headline_tail
 * @property string $footer_start
 * @property string $footer_end
 * @property string $email
 * @property string $whatsapp_url
 * @property string $phone_number
 * @property string $resume_path
 * @property string $meta_title
 * @property string $meta_description
 * @property int $accent_hue
 * @property ThemeMode $default_theme
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable([
    'brand_label',
    'availability_label',
    'hero_eyebrow',
    'hero_headline_lead',
    'hero_headline_highlight',
    'hero_summary',
    'portrait_path',
    'portrait_alt',
    'portrait_badge_start',
    'portrait_badge_end',
    'profile_lead',
    'profile_closing',
    'contact_headline_lead',
    'contact_headline_highlight',
    'contact_headline_tail',
    'footer_start',
    'footer_end',
    'email',
    'whatsapp_url',
    'phone_number',
    'resume_path',
    'meta_title',
    'meta_description',
    'accent_hue',
    'default_theme',
])]
final class SiteSetting extends Model
{
    /** @use HasFactory<SiteSettingFactory> */
    use HasFactory, HasPublicId;

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'accent_hue' => 'integer',
            'default_theme' => ThemeMode::class,
        ];
    }
}
