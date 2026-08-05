<?php

declare(strict_types=1);

namespace App\Actions\Portfolio;

use App\DTOs\ContentAttributes;
use App\Models\ContactTile;
use App\Services\Portfolio\ContentWriter;

/**
 * Adds a tile to the contact strip.
 */
final readonly class CreateContactTile
{
    public function __construct(private ContentWriter $writer) {}

    public function handle(ContentAttributes $attributes): ContactTile
    {
        return $this->writer->create(ContactTile::class, $attributes->toArray(), __('contact tile'));
    }
}
