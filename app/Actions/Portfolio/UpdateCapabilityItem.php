<?php

declare(strict_types=1);

namespace App\Actions\Portfolio;

use App\DTOs\ContentAttributes;
use App\Models\CapabilityItem;
use App\Services\Portfolio\ContentWriter;

/**
 * Rewrites a technology tag.
 */
final readonly class UpdateCapabilityItem
{
    public function __construct(private ContentWriter $writer) {}

    public function handle(CapabilityItem $capabilityItem, ContentAttributes $attributes): CapabilityItem
    {
        return $this->writer->update($capabilityItem, $attributes->toArray(), __('capability tag'));
    }
}
