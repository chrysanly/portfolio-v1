<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\CapabilityGroup;
use App\Models\CapabilityItem;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<CapabilityItem>
 */
final class CapabilityItemFactory extends Factory
{
    protected $model = CapabilityItem::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'capability_group_id' => CapabilityGroup::factory(),
            'label' => $this->faker->unique()->word(),
            'position' => $this->faker->unique()->numberBetween(1, 50),
            'is_visible' => true,
        ];
    }

    public function hidden(): self
    {
        return $this->state(fn (): array => ['is_visible' => false]);
    }
}
