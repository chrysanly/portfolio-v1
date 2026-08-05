<?php

declare(strict_types=1);

namespace Tests\Feature\Portfolio;

use App\Models\Stat;
use Database\Seeders\PortfolioContentSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;

class PortfolioPageTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(PortfolioContentSeeder::class);
    }

    public function test_the_portfolio_renders_the_published_content(): void
    {
        $this->get(route('home'))
            ->assertOk()
            ->assertInertia(fn (AssertableInertia $page) => $page
                ->component('portfolio/show')
                ->where('settings.hero.headlineHighlight', 'grow, not just run.')
                ->has('sections', 6)
                ->has('stats', 3)
                ->has('profileFacts', 8)
                ->has('capabilityGroups', 7)
                ->has('experiences', 5)
                ->has('works', 6)
                ->has('contactTiles', 4),
            );
    }

    public function test_hidden_rows_never_reach_the_page(): void
    {
        Stat::query()->firstOrFail()->update(['is_visible' => false]);

        $this->get(route('home'))
            ->assertOk()
            ->assertInertia(fn (AssertableInertia $page) => $page->has('stats', 2));
    }

    public function test_experience_bullets_are_eager_loaded_in_order(): void
    {
        $this->get(route('home'))
            ->assertOk()
            ->assertInertia(fn (AssertableInertia $page) => $page
                ->where('experiences.0.isCurrent', true)
                ->has('experiences.0.highlights', 9)
                ->where(
                    'experiences.0.highlights.0.description',
                    'Led development of a modular ERP system in Laravel spanning four core modules: Dashboard, Finance, Mobile CIS, and API App',
                ),
            );
    }

    /**
     * Nested collections must arrive as plain arrays, not wrapped in a `data`
     * key. The frontend indexes them directly, so a wrapper would render every
     * capability group with an empty tag list instead of failing loudly.
     */
    public function test_capability_items_are_eager_loaded_as_plain_arrays(): void
    {
        $this->get(route('home'))
            ->assertOk()
            ->assertInertia(fn (AssertableInertia $page) => $page
                ->where('capabilityGroups.0.name', 'Languages & Frameworks')
                ->has('capabilityGroups.0.items', 14)
                ->has('capabilityGroups.0.items.0', fn (AssertableInertia $item) => $item
                    ->hasAll(['id', 'label', 'position', 'isVisible']),
                )
                ->missing('capabilityGroups.0.items.data')
                ->missing('experiences.0.highlights.data'),
            );
    }
}
