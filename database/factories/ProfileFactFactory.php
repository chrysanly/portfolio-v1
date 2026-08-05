<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\ProfileFact;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ProfileFact>
 */
final class ProfileFactFactory extends Factory
{
    protected $model = ProfileFact::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'label' => $this->faker->unique()->words(2, true),
            'value' => $this->faker->sentence(4),
            'is_accent' => false,
            'position' => $this->faker->unique()->numberBetween(1, 50),
            'is_visible' => true,
        ];
    }

    public function hidden(): self
    {
        return $this->state(fn (): array => ['is_visible' => false]);
    }
}
