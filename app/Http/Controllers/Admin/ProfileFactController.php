<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Actions\Portfolio\CreateProfileFact;
use App\Actions\Portfolio\DeleteProfileFact;
use App\Actions\Portfolio\UpdateProfileFact;
use App\DTOs\ContentAttributes;
use App\Http\Controllers\Concerns\RedirectsWithToast;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ConfirmPinRequest;
use App\Http\Requests\Admin\ProfileFactRequest;
use App\Http\Resources\ProfileFactResource;
use App\Models\ProfileFact;
use App\Services\Portfolio\ContentRepository;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Manages the Profile table rows.
 */
final class ProfileFactController extends Controller
{
    use RedirectsWithToast;

    public function index(ContentRepository $content): Response
    {
        return Inertia::render('admin/profile-facts', [
            'profileFacts' => ProfileFactResource::collection($content->profileFacts())->resolve(),
        ]);
    }

    public function store(ProfileFactRequest $request, CreateProfileFact $action): RedirectResponse
    {
        $action->handle(ContentAttributes::fromRequest($request));

        return $this->redirectWithToast('admin.profile-facts.index', __('Profile row added.'));
    }

    public function update(ProfileFactRequest $request, ProfileFact $profileFact, UpdateProfileFact $action): RedirectResponse
    {
        $action->handle($profileFact, ContentAttributes::fromRequest($request));

        return $this->redirectWithToast('admin.profile-facts.index', __('Profile row saved.'));
    }

    public function destroy(ConfirmPinRequest $request, ProfileFact $profileFact, DeleteProfileFact $action): RedirectResponse
    {
        $action->handle($profileFact);

        return $this->redirectWithToast('admin.profile-facts.index', __('Profile row removed.'));
    }
}
