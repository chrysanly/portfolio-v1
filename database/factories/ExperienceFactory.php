<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Experience;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Experience>
 */
final class ExperienceFactory extends Factory
{
    protected $model = Experience::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'period_label' => '2025 — NOW',
            'role' => $this->faker->unique()->jobTitle(),
            'company' => $this->faker->unique()->company(),
            'is_current' => false,
            'is_expanded_by_default' => false,
            'position' => $this->faker->unique()->numberBetween(1, 50),
            'is_visible' => true,
        ];
    }

    public function hidden(): self
    {
        return $this->state(fn (): array => ['is_visible' => false]);
    }
}
