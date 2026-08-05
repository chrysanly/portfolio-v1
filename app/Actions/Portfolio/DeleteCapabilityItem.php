<?php

declare(strict_types=1);

namespace App\Actions\Portfolio;

use App\Models\CapabilityItem;
use App\Services\Portfolio\ContentWriter;

/**
 * Removes a technology tag.
 */
final readonly class DeleteCapabilityItem
{
    public function __construct(private ContentWriter $writer) {}

    public function handle(CapabilityItem $capabilityItem): void
    {
        $this->writer->delete($capabilityItem);
    }
}
