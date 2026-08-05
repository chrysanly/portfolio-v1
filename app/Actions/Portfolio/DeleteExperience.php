<?php

declare(strict_types=1);

namespace App\Actions\Portfolio;

use App\Models\Experience;
use App\Services\Portfolio\ContentWriter;

/**
 * Removes a role and its bullets.
 */
final readonly class DeleteExperience
{
    public function __construct(private ContentWriter $writer) {}

    public function handle(Experience $experience): void
    {
        $this->writer->delete($experience);
    }
}
