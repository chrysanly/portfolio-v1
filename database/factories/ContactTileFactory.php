<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Enums\ContactChannel;
use App\Models\ContactTile;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ContactTile>
 */
final class ContactTileFactory extends Factory
{
    protected $model = ContactTile::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'channel' => $this->faker->unique()->randomElement(ContactChannel::cases()),
            'title' => $this->faker->word(),
            'value_label' => $this->faker->safeEmail(),
            'href' => 'mailto:'.$this->faker->safeEmail(),
            'badge_label' => null,
            'position' => $this->faker->unique()->numberBetween(1, 50),
            'is_visible' => true,
        ];
    }

    public function hidden(): self
    {
        return $this->state(fn (): array => ['is_visible' => false]);
    }
}
