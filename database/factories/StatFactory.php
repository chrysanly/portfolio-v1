<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Stat;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Stat>
 */
final class StatFactory extends Factory
{
    protected $model = Stat::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'label' => mb_strtoupper($this->faker->unique()->words(2, true)),
            'value' => (string) $this->faker->numberBetween(1, 99).'+',
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
