<?php

declare(strict_types=1);

namespace App\Actions\Portfolio;

use App\DTOs\ContentAttributes;
use App\Models\ExperienceHighlight;
use App\Services\Portfolio\ContentWriter;

/**
 * Rewrites a bullet under a role.
 */
final readonly class UpdateExperienceHighlight
{
    public function __construct(private ContentWriter $writer) {}

    public function handle(ExperienceHighlight $experienceHighlight, ContentAttributes $attributes): ExperienceHighlight
    {
        return $this->writer->update($experienceHighlight, $attributes->toArray(), __('experience bullet'));
    }
}
