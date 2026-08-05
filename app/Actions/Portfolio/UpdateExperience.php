<?php

declare(strict_types=1);

namespace App\Actions\Portfolio;

use App\DTOs\ContentAttributes;
use App\Models\Experience;
use App\Services\Portfolio\ContentWriter;

/**
 * Rewrites a role in the experience accordion.
 */
final readonly class UpdateExperience
{
    public function __construct(private ContentWriter $writer) {}

    public function handle(Experience $experience, ContentAttributes $attributes): Experience
    {
        return $this->writer->update($experience, $attributes->toArray(), __('experience entry'));
    }
}
