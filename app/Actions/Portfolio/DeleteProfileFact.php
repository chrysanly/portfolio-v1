<?php

declare(strict_types=1);

namespace App\Actions\Portfolio;

use App\Models\ProfileFact;
use App\Services\Portfolio\ContentWriter;

/**
 * Removes a row from the Profile table.
 */
final readonly class DeleteProfileFact
{
    public function __construct(private ContentWriter $writer) {}

    public function handle(ProfileFact $profileFact): void
    {
        $this->writer->delete($profileFact);
    }
}
