<?php

declare(strict_types=1);

namespace App\Actions\Portfolio;

use App\DTOs\ContentAttributes;
use App\Models\ExperienceHighlight;
use App\Services\Portfolio\ContentWriter;

/**
 * Adds a bullet under a role.
 */
final readonly class CreateExperienceHighlight
{
    public function __construct(private ContentWriter $writer) {}

    public function handle(ContentAttributes $attributes): ExperienceHighlight
    {
        return $this->writer->create(ExperienceHighlight::class, $attributes->toArray(), __('experience bullet'));
    }
}
