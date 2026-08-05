<?php

declare(strict_types=1);

namespace App\Actions\Portfolio;

use App\DTOs\ContentAttributes;
use App\Models\Stat;
use App\Services\Portfolio\ContentWriter;

/**
 * Rewrites a headline figure.
 */
final readonly class UpdateStat
{
    public function __construct(private ContentWriter $writer) {}

    public function handle(Stat $stat, ContentAttributes $attributes): Stat
    {
        return $this->writer->update($stat, $attributes->toArray(), __('headline figure'));
    }
}
