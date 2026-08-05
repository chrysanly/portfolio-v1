<?php

declare(strict_types=1);

namespace App\Actions\Portfolio;

use App\Models\CapabilityGroup;
use App\Services\Portfolio\ContentWriter;

/**
 * Removes a capability row and its tags.
 */
final readonly class DeleteCapabilityGroup
{
    public function __construct(private ContentWriter $writer) {}

    public function handle(CapabilityGroup $capabilityGroup): void
    {
        $this->writer->delete($capabilityGroup);
    }
}
