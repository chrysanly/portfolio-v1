<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Experience;
use App\Models\ExperienceHighlight;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ExperienceHighlight>
 */
final class ExperienceHighlightFactory extends Factory
{
    protected $model = ExperienceHighlight::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'experience_id' => Experience::factory(),
            'description' => $this->faker->unique()->sentence(),
            'position' => $this->faker->unique()->numberBetween(1, 50),
            'is_visible' => true,
        ];
    }

    public function hidden(): self
    {
        return $this->state(fn (): array => ['is_visible' => false]);
    }
}
