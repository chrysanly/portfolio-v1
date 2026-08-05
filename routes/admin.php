<?php

declare(strict_types=1);

use App\Http\Controllers\Admin\CapabilityGroupController;
use App\Http\Controllers\Admin\CapabilityItemController;
use App\Http\Controllers\Admin\ContactTileController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ExperienceController;
use App\Http\Controllers\Admin\ExperienceHighlightController;
use App\Http\Controllers\Admin\PageSectionController;
use App\Http\Controllers\Admin\PinSessionController;
use App\Http\Controllers\Admin\ProfileFactController;
use App\Http\Controllers\Admin\SiteSettingController;
use App\Http\Controllers\Admin\StatController;
use App\Http\Controllers\Admin\WorkController;
use App\Http\Middleware\EnsureAdminPinSession;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Portfolio content admin
|--------------------------------------------------------------------------
|
| Every route below the PIN gate requires a confirmed PIN session, and every
| mutating request additionally carries the PIN in its payload (RULES §5.1).
|
*/

Route::prefix('admin')->name('admin.')->group(function (): void {

    // Public by necessity: this is where the PIN is entered. Rate limited.
    Route::middleware('throttle:admin-pin')->group(function (): void {
        Route::get('login', [PinSessionController::class, 'create'])->name('login');
        Route::post('login', [PinSessionController::class, 'store'])->name('login.store');
    });

    Route::post('logout', [PinSessionController::class, 'destroy'])->name('logout');

    Route::middleware(EnsureAdminPinSession::class)->group(function (): void {
        Route::get('/', DashboardController::class)->name('dashboard');

        Route::get('settings', [SiteSettingController::class, 'edit'])->name('settings.edit');
        Route::put('settings', [SiteSettingController::class, 'update'])->name('settings.update');

        Route::get('sections', [PageSectionController::class, 'index'])->name('sections.index');
        Route::put('sections/{page_section}', [PageSectionController::class, 'update'])->name('sections.update');

        Route::resource('stats', StatController::class)->only(['index', 'store', 'update', 'destroy']);

        Route::resource('profile-facts', ProfileFactController::class)
            ->only(['index', 'store', 'update', 'destroy'])
            ->parameters(['profile-facts' => 'profile_fact']);

        Route::resource('capability-groups', CapabilityGroupController::class)
            ->only(['index', 'store', 'update', 'destroy'])
            ->parameters(['capability-groups' => 'capability_group']);

        Route::resource('capability-groups.items', CapabilityItemController::class)
            ->only(['store', 'update', 'destroy'])
            ->parameters(['capability-groups' => 'capability_group'])
            ->scoped();

        Route::resource('experiences', ExperienceController::class)
            ->only(['index', 'store', 'update', 'destroy']);

        Route::resource('experiences.highlights', ExperienceHighlightController::class)
            ->only(['store', 'update', 'destroy'])
            ->scoped();

        Route::resource('works', WorkController::class)->only(['index', 'store', 'update', 'destroy']);

        Route::resource('contact-tiles', ContactTileController::class)
            ->only(['index', 'store', 'update', 'destroy'])
            ->parameters(['contact-tiles' => 'contact_tile']);
    });
});
