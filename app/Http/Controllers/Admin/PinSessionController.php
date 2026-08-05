<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AdminPinLoginRequest;
use App\Services\Auth\AdminPinSession;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Opens and closes the admin PIN session.
 */
final class PinSessionController extends Controller
{
    public function create(AdminPinSession $pinSession): Response|RedirectResponse
    {
        if ($pinSession->isConfirmed()) {
            return to_route('admin.dashboard');
        }

        return Inertia::render('admin/login');
    }

    /**
     * The PIN is validated inside the FormRequest, so reaching this method means
     * it was correct.
     */
    public function store(AdminPinLoginRequest $request, AdminPinSession $pinSession): RedirectResponse
    {
        $pinSession->confirm();

        return to_route('admin.dashboard');
    }

    public function destroy(AdminPinSession $pinSession): RedirectResponse
    {
        $pinSession->forget();

        return to_route('admin.login');
    }
}
