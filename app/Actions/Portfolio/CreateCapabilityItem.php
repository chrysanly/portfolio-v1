<?php

declare(strict_types=1);

namespace App\Actions\Portfolio;

use App\DTOs\ContentAttributes;
use App\Models\CapabilityItem;
use App\Services\Portfolio\ContentWriter;

/**
 * Adds a technology tag to a capability row.
 */
final readonly class CreateCapabilityItem
{
    public function __construct(private ContentWriter $writer) {}

    public function handle(ContentAttributes $attributes): CapabilityItem
    {
        return $this->writer->create(CapabilityItem::class, $attributes->toArray(), __('capability tag'));
    }
}
