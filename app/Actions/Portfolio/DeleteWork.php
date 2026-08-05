<?php

declare(strict_types=1);

namespace App\Actions\Portfolio;

use App\Models\Work;
use App\Services\Portfolio\ContentWriter;

/**
 * Removes a card from the Selected work grid.
 */
final readonly class DeleteWork
{
    public function __construct(private ContentWriter $writer) {}

    public function handle(Work $work): void
    {
        $this->writer->delete($work);
    }
}
