<?php

declare(strict_types=1);

namespace App\Models\Concerns;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

/**
 * Gives a model a ULID public identifier and routes by it, so admin URLs never
 * expose (or allow enumeration of) auto-increment keys (SCHEMA §A2).
 */
trait HasPublicId
{
    public static function bootHasPublicId(): void
    {
        static::creating(static function (Model $model): void {
            if (blank($model->getAttribute('public_id'))) {
                $model->setAttribute('public_id', (string) Str::ulid());
            }
        });
    }

    public function getRouteKeyName(): string
    {
        return 'public_id';
    }
}
