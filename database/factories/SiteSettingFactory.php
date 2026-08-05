<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Enums\ThemeMode;
use App\Models\SiteSetting;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<SiteSetting>
 */
final class SiteSettingFactory extends Factory
{
    protected $model = SiteSetting::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'brand_label' => 'CJ ROMA — ENGINEERING PROFILE',
            'availability_label' => 'AVAILABLE FOR HIRE',
            'hero_eyebrow' => 'SENIOR FULL-STACK DEVELOPER',
            'hero_headline_lead' => 'Chrysanly John C. Roma builds systems that',
            'hero_headline_highlight' => 'grow, not just run.',
            'hero_summary' => $this->faker->paragraph(),
            'portrait_path' => 'images/cj-portrait.jpeg',
            'portrait_alt' => 'Chrysanly John C. Roma',
            'portrait_badge_start' => 'ID · CJR',
            'portrait_badge_end' => 'STABLE',
            'profile_lead' => $this->faker->paragraph(),
            'profile_closing' => $this->faker->paragraph(),
            'contact_headline_lead' => 'Got a system that needs to',
            'contact_headline_highlight' => 'hold up',
            'contact_headline_tail' => 'under real load?',
            'footer_start' => 'CHRYSANLY JOHN C. ROMA · SENIOR FULL-STACK DEVELOPER',
            'footer_end' => 'DUBAI, UAE · 2026',
            'email' => $this->faker->safeEmail(),
            'whatsapp_url' => 'https://wa.me/971529258013',
            'phone_number' => '+971 52 925 8013',
            'resume_path' => 'CJ_Roma_Resume.pdf',
            'meta_title' => 'CJ Roma | Senior Full-Stack Developer',
            'meta_description' => $this->faker->sentence(),
            'accent_hue' => 170,
            'default_theme' => ThemeMode::System,
        ];
    }
}
