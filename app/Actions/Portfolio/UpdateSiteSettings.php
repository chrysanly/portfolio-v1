<?php

declare(strict_types=1);

namespace App\Actions\Portfolio;

use App\DTOs\ContentAttributes;
use App\Models\SiteSetting;
use App\Services\Portfolio\ContentWriter;

/**
 * Rewrites the page-wide content: header, hero, prose, reachability, SEO, theme.
 */
final readonly class UpdateSiteSettings
{
    public function __construct(private ContentWriter $writer) {}

    public function handle(SiteSetting $settings, ContentAttributes $attributes): SiteSetting
    {
        return $this->writer->update($settings, $attributes->toArray(), __('site settings'));
    }
}
