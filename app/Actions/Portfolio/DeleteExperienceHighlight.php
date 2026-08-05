<?php

declare(strict_types=1);

namespace App\Actions\Portfolio;

use App\Models\ExperienceHighlight;
use App\Services\Portfolio\ContentWriter;

/**
 * Removes a bullet from a role.
 */
final readonly class DeleteExperienceHighlight
{
    public function __construct(private ContentWriter $writer) {}

    public function handle(ExperienceHighlight $experienceHighlight): void
    {
        $this->writer->delete($experienceHighlight);
    }
}
