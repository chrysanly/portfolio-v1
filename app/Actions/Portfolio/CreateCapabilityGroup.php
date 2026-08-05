<?php

declare(strict_types=1);

namespace App\Actions\Portfolio;

use App\DTOs\ContentAttributes;
use App\Models\CapabilityGroup;
use App\Services\Portfolio\ContentWriter;

/**
 * Adds a capability row.
 */
final readonly class CreateCapabilityGroup
{
    public function __construct(private ContentWriter $writer) {}

    public function handle(ContentAttributes $attributes): CapabilityGroup
    {
        return $this->writer->create(CapabilityGroup::class, $attributes->toArray(), __('capability group'));
    }
}
