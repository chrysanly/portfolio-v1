<?php

declare(strict_types=1);

use App\Http\Controllers\PortfolioController;
use Illuminate\Support\Facades\Route;

// The portfolio itself: public by design, read-only, rate limited.
Route::get('/', PortfolioController::class)
    ->middleware('throttle:portfolio')
    ->name('home');

/*
|--------------------------------------------------------------------------
| No user-facing authentication
|--------------------------------------------------------------------------
|
| This site has exactly one privileged surface — the PIN-gated content admin
| in routes/admin.php. Fortify's routes (/login, /register, /forgot-password,
| the two-factor challenge) are switched off in FortifyServiceProvider, and the
| authenticated dashboard and settings pages are not registered, so there is no
| password login to attack and nothing that redirects to a missing login route.
|
*/

require __DIR__.'/admin.php';
