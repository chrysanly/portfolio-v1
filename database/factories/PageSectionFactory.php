<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Enums\SectionKey;
use App\Models\PageSection;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<PageSection>
 */
final class PageSectionFactory extends Factory
{
    protected $model = PageSection::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'key' => $this->faker->unique()->randomElement(SectionKey::cases()),
            'nav_label' => mb_strtoupper($this->faker->word()),
            'heading' => $this->faker->words(2, true),
            'note' => null,
            'position' => $this->faker->unique()->numberBetween(1, 50),
            'is_visible' => true,
        ];
    }

    public function hidden(): self
    {
        return $this->state(fn (): array => ['is_visible' => false]);
    }
}
