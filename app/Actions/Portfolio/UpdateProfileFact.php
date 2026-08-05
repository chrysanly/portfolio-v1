<?php

declare(strict_types=1);

namespace App\Actions\Portfolio;

use App\DTOs\ContentAttributes;
use App\Models\ProfileFact;
use App\Services\Portfolio\ContentWriter;

/**
 * Rewrites a Profile table row.
 */
final readonly class UpdateProfileFact
{
    public function __construct(private ContentWriter $writer) {}

    public function handle(ProfileFact $profileFact, ContentAttributes $attributes): ProfileFact
    {
        return $this->writer->update($profileFact, $attributes->toArray(), __('profile row'));
    }
}
