<?php

declare(strict_types=1);

namespace Tests\Feature\Portfolio;

use App\Models\SiteSetting;

class SiteSettingUpdateTest extends PortfolioAdminTestCase
{
    /**
     * @param  array<string, mixed>  $overrides
     * @return array<string, mixed>
     */
    private function payload(array $overrides = []): array
    {
        $settings = SiteSetting::query()->firstOrFail();

        return [
            ...$settings->only($settings->getFillable()),
            'default_theme' => $settings->default_theme->value,
            'pin' => self::PIN,
            ...$overrides,
        ];
    }

    public function test_the_hero_headline_can_be_rewritten(): void
    {
        $this->unlockAdmin();

        $this->put(route('admin.settings.update'), $this->payload([
            'hero_headline_highlight' => 'hold under load.',
        ]))->assertSessionHasNoErrors();

        $this->assertDatabaseHas('site_settings', [
            'hero_headline_highlight' => 'hold under load.',
        ]);
    }

    public function test_the_wrong_pin_leaves_the_settings_untouched(): void
    {
        $this->unlockAdmin();

        $this->put(route('admin.settings.update'), $this->payload([
            'hero_headline_highlight' => 'should not save',
            'pin' => '000000',
        ]))->assertSessionHasErrors('pin');

        $this->assertDatabaseMissing('site_settings', [
            'hero_headline_highlight' => 'should not save',
        ]);
    }

    public function test_an_out_of_range_accent_hue_is_rejected(): void
    {
        $this->unlockAdmin();

        $this->put(route('admin.settings.update'), $this->payload(['accent_hue' => 400]))
            ->assertSessionHasErrors('accent_hue');
    }

    public function test_a_malformed_email_is_rejected(): void
    {
        $this->unlockAdmin();

        $this->put(route('admin.settings.update'), $this->payload(['email' => 'not-an-email']))
            ->assertSessionHasErrors('email');
    }
}
