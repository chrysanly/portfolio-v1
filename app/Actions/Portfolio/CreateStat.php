<?php

declare(strict_types=1);

namespace App\Actions\Portfolio;

use App\DTOs\ContentAttributes;
use App\Models\Stat;
use App\Services\Portfolio\ContentWriter;

/**
 * Adds a tile to the headline figures strip.
 */
final readonly class CreateStat
{
    public function __construct(private ContentWriter $writer) {}

    public function handle(ContentAttributes $attributes): Stat
    {
        return $this->writer->create(Stat::class, $attributes->toArray(), __('headline figure'));
    }
}
