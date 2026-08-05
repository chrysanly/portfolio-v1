<?php

declare(strict_types=1);

namespace App\Actions\Portfolio;

use App\DTOs\ContentAttributes;
use App\Models\ContactTile;
use App\Services\Portfolio\ContentWriter;

/**
 * Rewrites a contact tile.
 */
final readonly class UpdateContactTile
{
    public function __construct(private ContentWriter $writer) {}

    public function handle(ContactTile $contactTile, ContentAttributes $attributes): ContactTile
    {
        return $this->writer->update($contactTile, $attributes->toArray(), __('contact tile'));
    }
}
