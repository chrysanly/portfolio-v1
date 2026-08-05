<?php

declare(strict_types=1);

namespace App\Actions\Portfolio;

use App\DTOs\ContentAttributes;
use App\Models\ProfileFact;
use App\Services\Portfolio\ContentWriter;

/**
 * Adds a label/value row to the Profile table.
 */
final readonly class CreateProfileFact
{
    public function __construct(private ContentWriter $writer) {}

    public function handle(ContentAttributes $attributes): ProfileFact
    {
        return $this->writer->create(ProfileFact::class, $attributes->toArray(), __('profile row'));
    }
}
