<?php

declare(strict_types=1);

namespace App\Actions\Portfolio;

use App\DTOs\ContentAttributes;
use App\Models\Work;
use App\Services\Portfolio\ContentWriter;

/**
 * Rewrites a Selected work card.
 */
final readonly class UpdateWork
{
    public function __construct(private ContentWriter $writer) {}

    public function handle(Work $work, ContentAttributes $attributes): Work
    {
        return $this->writer->update($work, $attributes->toArray(), __('work card'));
    }
}
