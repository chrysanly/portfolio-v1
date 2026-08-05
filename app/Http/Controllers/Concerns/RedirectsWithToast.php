<?php

declare(strict_types=1);

namespace App\Http\Controllers\Concerns;

use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

/**
 * One place that decides what a successful content write looks like to the
 * admin: a flash toast plus a redirect back to the managing screen.
 */
trait RedirectsWithToast
{
    /**
     * @param  array<string, mixed>  $parameters
     */
    protected function redirectWithToast(string $routeName, string $message, array $parameters = []): RedirectResponse
    {
        Inertia::flash('toast', ['type' => 'success', 'message' => $message]);

        return to_route($routeName, $parameters);
    }
}
