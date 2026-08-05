<?php

declare(strict_types=1);

namespace App\Actions\Portfolio;

use App\DTOs\ContentAttributes;
use App\Models\PageSection;
use App\Services\Portfolio\ContentWriter;

/**
 * Renames a section's nav label and heading, or hides the section entirely.
 */
final readonly class UpdatePageSection
{
    public function __construct(private ContentWriter $writer) {}

    public function handle(PageSection $pageSection, ContentAttributes $attributes): PageSection
    {
        return $this->writer->update($pageSection, $attributes->toArray(), __('page section'));
    }
}
