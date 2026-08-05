<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Work;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Work>
 */
final class WorkFactory extends Factory
{
    protected $model = Work::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'eyebrow' => mb_strtoupper($this->faker->words(2, true)),
            'title' => $this->faker->unique()->sentence(3),
            'description' => $this->faker->sentence(12),
            'media_label' => $this->faker->words(3, true),
            'image_path' => null,
            'position' => $this->faker->unique()->numberBetween(1, 50),
            'is_visible' => true,
        ];
    }

    public function hidden(): self
    {
        return $this->state(fn (): array => ['is_visible' => false]);
    }
}
