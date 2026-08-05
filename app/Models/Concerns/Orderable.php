<?php

declare(strict_types=1);

namespace App\Models\Concerns;

use Illuminate\Database\Eloquent\Builder;

/**
 * Shared query scopes for the ordered, publishable content collections.
 *
 * @template TModel of \Illuminate\Database\Eloquent\Model
 */
trait Orderable
{
    /**
     * @param  Builder<TModel>  $query
     * @return Builder<TModel>
     */
    public function scopeVisible(Builder $query): Builder
    {
        return $query->where('is_visible', true);
    }

    /**
     * @param  Builder<TModel>  $query
     * @return Builder<TModel>
     */
    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('position')->orderBy('id');
    }
}
