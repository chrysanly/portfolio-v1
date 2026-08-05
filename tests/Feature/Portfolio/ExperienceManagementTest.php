<?php

declare(strict_types=1);

namespace Tests\Feature\Portfolio;

use App\Models\Experience;

class ExperienceManagementTest extends PortfolioAdminTestCase
{
    public function test_a_bullet_can_be_added_to_a_role(): void
    {
        $this->unlockAdmin();

        $experience = Experience::query()->where('is_current', true)->firstOrFail();

        $this->post(route('admin.experiences.highlights.store', $experience), [
            'description' => 'Introduced queue-backed PDF generation for finance exports',
            'position' => 6,
            'is_visible' => true,
            'pin' => self::PIN,
        ])->assertSessionHasNoErrors();

        $this->assertDatabaseHas('experience_highlights', [
            'experience_id' => $experience->id,
            'description' => 'Introduced queue-backed PDF generation for finance exports',
        ]);
    }

    public function test_the_same_bullet_cannot_be_added_twice_to_one_role(): void
    {
        $this->unlockAdmin();

        $experience = Experience::query()->where('is_current', true)->firstOrFail();
        $existing = $experience->highlights()->firstOrFail();

        $this->post(route('admin.experiences.highlights.store', $experience), [
            'description' => $existing->description,
            'position' => 7,
            'is_visible' => true,
            'pin' => self::PIN,
        ])->assertSessionHasErrors('description');
    }

    public function test_a_bullet_cannot_be_edited_through_another_role(): void
    {
        $this->unlockAdmin();

        $owner = Experience::query()->where('is_current', true)->firstOrFail();
        $other = Experience::query()->where('is_current', false)->firstOrFail();
        $highlight = $owner->highlights()->firstOrFail();

        // Scoped bindings make this a 404 rather than a cross-parent edit.
        $this->put(
            route('admin.experiences.highlights.update', [$other, $highlight]),
            [
                'description' => 'Rewritten through the wrong parent',
                'position' => 1,
                'is_visible' => true,
                'pin' => self::PIN,
            ],
        )->assertNotFound();
    }

    public function test_deleting_a_role_removes_its_bullets(): void
    {
        $this->unlockAdmin();

        $experience = Experience::query()->where('is_current', false)->firstOrFail();

        $this->delete(route('admin.experiences.destroy', $experience), [
            'pin' => self::PIN,
        ])->assertSessionHasNoErrors();

        $this->assertDatabaseMissing('experiences', ['id' => $experience->id]);
        $this->assertDatabaseMissing('experience_highlights', [
            'experience_id' => $experience->id,
        ]);
    }
}
