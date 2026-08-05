<?php

declare(strict_types=1);

namespace App\Actions\Portfolio;

use App\DTOs\ContentAttributes;
use App\Models\CapabilityGroup;
use App\Services\Portfolio\ContentWriter;

/**
 * Rewrites a capability row.
 */
final readonly class UpdateCapabilityGroup
{
    public function __construct(private ContentWriter $writer) {}

    public function handle(CapabilityGroup $capabilityGroup, ContentAttributes $attributes): CapabilityGroup
    {
        return $this->writer->update($capabilityGroup, $attributes->toArray(), __('capability group'));
    }
}
