<?php

declare(strict_types=1);

namespace Tests\Feature\Portfolio;

use App\Models\Stat;
use App\Services\Portfolio\PortfolioContentService;
use Illuminate\Support\Facades\Cache;

class StatManagementTest extends PortfolioAdminTestCase
{
    /**
     * @param  array<string, mixed>  $overrides
     * @return array<string, mixed>
     */
    private function payload(array $overrides = []): array
    {
        return [
            'label' => 'OPEN SOURCE RELEASES',
            'value' => '12',
            'is_accent' => false,
            'position' => 4,
            'is_visible' => true,
            'pin' => self::PIN,
            ...$overrides,
        ];
    }

    public function test_a_figure_can_be_added_with_the_pin(): void
    {
        $this->unlockAdmin();

        $this->post(route('admin.stats.store'), $this->payload())
            ->assertRedirect(route('admin.stats.index'))
            ->assertSessionHasNoErrors();

        $this->assertDatabaseHas('stats', ['label' => 'OPEN SOURCE RELEASES']);
    }

    public function test_a_figure_cannot_be_added_without_the_pin(): void
    {
        $this->unlockAdmin();

        $this->post(route('admin.stats.store'), $this->payload(['pin' => '']))
            ->assertSessionHasErrors('pin');

        $this->assertDatabaseMissing('stats', ['label' => 'OPEN SOURCE RELEASES']);
    }

    public function test_a_figure_cannot_be_added_with_the_wrong_pin(): void
    {
        $this->unlockAdmin();

        $this->post(route('admin.stats.store'), $this->payload(['pin' => '111111']))
            ->assertSessionHasErrors('pin');

        $this->assertDatabaseMissing('stats', ['label' => 'OPEN SOURCE RELEASES']);
    }

    public function test_duplicate_labels_are_rejected(): void
    {
        $this->unlockAdmin();

        $this->post(route('admin.stats.store'), $this->payload(['label' => 'COMPANIES']))
            ->assertSessionHasErrors('label');

        $this->assertSame(1, Stat::query()->where('label', 'COMPANIES')->count());
    }

    public function test_a_figure_can_be_renamed(): void
    {
        $this->unlockAdmin();

        $stat = Stat::query()->where('label', 'COMPANIES')->firstOrFail();

        $this->put(route('admin.stats.update', $stat), $this->payload([
            'label' => 'CLIENTS SHIPPED FOR',
            'value' => '9',
        ]))->assertSessionHasNoErrors();

        $this->assertDatabaseHas('stats', [
            'id' => $stat->id,
            'label' => 'CLIENTS SHIPPED FOR',
            'value' => '9',
        ]);
    }

    public function test_a_figure_can_be_deleted_with_the_pin(): void
    {
        $this->unlockAdmin();

        $stat = Stat::query()->where('label', 'COMPANIES')->firstOrFail();

        $this->delete(route('admin.stats.destroy', $stat), ['pin' => self::PIN])
            ->assertSessionHasNoErrors();

        $this->assertDatabaseMissing('stats', ['id' => $stat->id]);
    }

    public function test_a_figure_cannot_be_deleted_without_the_pin(): void
    {
        $this->unlockAdmin();

        $stat = Stat::query()->where('label', 'COMPANIES')->firstOrFail();

        $this->delete(route('admin.stats.destroy', $stat), ['pin' => 'nope'])
            ->assertSessionHasErrors('pin');

        $this->assertDatabaseHas('stats', ['id' => $stat->id]);
    }

    public function test_writing_content_busts_the_public_cache(): void
    {
        $this->unlockAdmin();

        // Warm the cache, then prove the new figure is visible immediately.
        app(PortfolioContentService::class)->published();
        $this->assertTrue(Cache::has(config('portfolio.cache.key')));

        $this->post(route('admin.stats.store'), $this->payload());

        $this->assertFalse(Cache::has(config('portfolio.cache.key')));

        $payload = app(PortfolioContentService::class)->published();

        $this->assertContains(
            'OPEN SOURCE RELEASES',
            array_column($payload['stats'], 'label'),
        );
    }
}
