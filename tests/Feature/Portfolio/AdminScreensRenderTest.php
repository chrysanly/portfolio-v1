<?php

declare(strict_types=1);

namespace Tests\Feature\Portfolio;

use Inertia\Testing\AssertableInertia;

/**
 * Every admin screen must render with its collection props as plain arrays.
 *
 * A resource collection passed to Inertia without ->resolve() serialises under a
 * `data` key. Nothing fails server-side — the page still returns 200 — but the
 * React page calls .map() on an object and renders a blank screen. That is what
 * happened to the capability-groups screen, so each listing prop is asserted to
 * be a real array here rather than merely present.
 */
final class AdminScreensRenderTest extends PortfolioAdminTestCase
{
    /**
     * @return array<string, array{string, string, string, int}>
     */
    public static function screens(): array
    {
        return [
            'capability groups' => ['admin.capability-groups.index', 'admin/capabilities', 'groups', 7],
            'experiences' => ['admin.experiences.index', 'admin/experiences', 'experiences', 5],
            'stats' => ['admin.stats.index', 'admin/stats', 'stats', 3],
            'profile facts' => ['admin.profile-facts.index', 'admin/profile-facts', 'profileFacts', 8],
            'works' => ['admin.works.index', 'admin/works', 'works', 6],
            'contact tiles' => ['admin.contact-tiles.index', 'admin/contact-tiles', 'contactTiles', 4],
            'sections' => ['admin.sections.index', 'admin/sections', 'sections', 6],
        ];
    }

    #[\PHPUnit\Framework\Attributes\DataProvider('screens')]
    public function test_the_screen_renders_its_rows_as_a_plain_array(
        string $route,
        string $component,
        string $prop,
        int $expected,
    ): void {
        $this->unlockAdmin();

        $this->get(route($route))
            ->assertOk()
            ->assertInertia(fn (AssertableInertia $page) => $page
                ->component($component)
                // has($prop, n) only counts an array; a `data`-wrapped object fails.
                ->has($prop, $expected)
                ->missing($prop.'.data'),
            );
    }

    public function test_nested_capability_tags_also_arrive_as_a_plain_array(): void
    {
        $this->unlockAdmin();

        $this->get(route('admin.capability-groups.index'))
            ->assertOk()
            ->assertInertia(fn (AssertableInertia $page) => $page
                ->has('groups.0.items', 14)
                ->missing('groups.0.items.data'),
            );
    }
}
