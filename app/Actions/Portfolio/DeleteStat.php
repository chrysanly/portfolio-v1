<?php

declare(strict_types=1);

namespace App\Actions\Portfolio;

use App\Models\Stat;
use App\Services\Portfolio\ContentWriter;

/**
 * Removes a headline figure from the strip.
 */
final readonly class DeleteStat
{
    public function __construct(private ContentWriter $writer) {}

    public function handle(Stat $stat): void
    {
        $this->writer->delete($stat);
    }
}
