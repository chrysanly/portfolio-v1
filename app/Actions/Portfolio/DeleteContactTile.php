<?php

declare(strict_types=1);

namespace App\Actions\Portfolio;

use App\Models\ContactTile;
use App\Services\Portfolio\ContentWriter;

/**
 * Removes a tile from the contact strip.
 */
final readonly class DeleteContactTile
{
    public function __construct(private ContentWriter $writer) {}

    public function handle(ContactTile $contactTile): void
    {
        $this->writer->delete($contactTile);
    }
}
