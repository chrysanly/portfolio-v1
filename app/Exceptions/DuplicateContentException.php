<?php

declare(strict_types=1);

namespace App\Exceptions;

use DomainException;

/**
 * Raised when a database uniqueness constraint rejects a content write.
 *
 * Validation catches the common case; this converts the race-condition case
 * into a friendly 422 instead of a 500 (RULES §5.5, SCHEMA §A4).
 */
final class DuplicateContentException extends DomainException
{
    public static function for(string $subject): self
    {
        return new self(__('That :subject already exists — give it a different name.', [
            'subject' => $subject,
        ]));
    }
}
