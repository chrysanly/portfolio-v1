<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Enums\AccentMarker;
use App\Models\CapabilityGroup;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<CapabilityGroup>
 */
final class CapabilityGroupFactory extends Factory
{
    protected $model = CapabilityGroup::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->unique()->words(2, true),
            'marker' => AccentMarker::Primary,
            'position' => $this->faker->unique()->numberBetween(1, 50),
            'is_visible' => true,
        ];
    }

    public function hidden(): self
    {
        return $this->state(fn (): array => ['is_visible' => false]);
    }
}
