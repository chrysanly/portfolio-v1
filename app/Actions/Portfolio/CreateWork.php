<?php

declare(strict_types=1);

namespace App\Actions\Portfolio;

use App\DTOs\ContentAttributes;
use App\Models\Work;
use App\Services\Portfolio\ContentWriter;

/**
 * Adds a card to the Selected work grid.
 */
final readonly class CreateWork
{
    public function __construct(private ContentWriter $writer) {}

    public function handle(ContentAttributes $attributes): Work
    {
        return $this->writer->create(Work::class, $attributes->toArray(), __('work card'));
    }
}
