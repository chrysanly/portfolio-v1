<?php

declare(strict_types=1);

namespace App\Actions\Portfolio;

use App\DTOs\ContentAttributes;
use App\Models\Experience;
use App\Services\Portfolio\ContentWriter;

/**
 * Adds a role to the experience accordion.
 */
final readonly class CreateExperience
{
    public function __construct(private ContentWriter $writer) {}

    public function handle(ContentAttributes $attributes): Experience
    {
        return $this->writer->create(Experience::class, $attributes->toArray(), __('experience entry'));
    }
}
