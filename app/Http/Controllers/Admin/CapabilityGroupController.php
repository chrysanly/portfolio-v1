<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Actions\Portfolio\CreateCapabilityGroup;
use App\Actions\Portfolio\DeleteCapabilityGroup;
use App\Actions\Portfolio\UpdateCapabilityGroup;
use App\DTOs\ContentAttributes;
use App\Enums\AccentMarker;
use App\Http\Controllers\Concerns\RedirectsWithToast;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CapabilityGroupRequest;
use App\Http\Requests\Admin\ConfirmPinRequest;
use App\Http\Resources\CapabilityGroupResource;
use App\Models\CapabilityGroup;
use App\Services\Portfolio\ContentRepository;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Manages the capability rows and, through the nested controller, their tags.
 */
final class CapabilityGroupController extends Controller
{
    use RedirectsWithToast;

    public function index(ContentRepository $content): Response
    {
        return Inertia::render('admin/capabilities', [
            // ->resolve() is required, as in every other admin controller: without
            // it Inertia serialises the collection under a `data` key, the page
            // calls groups.map() on an object, and the screen renders blank.
            'groups' => CapabilityGroupResource::collection(
                $content->capabilityGroups()
            )->resolve(),
            'markerOptions' => AccentMarker::options(),
        ]);
    }

    public function store(CapabilityGroupRequest $request, CreateCapabilityGroup $action): RedirectResponse
    {
        $action->handle(ContentAttributes::fromRequest($request));

        return $this->redirectWithToast('admin.capability-groups.index', __('Capability row added.'));
    }

    public function update(CapabilityGroupRequest $request, CapabilityGroup $capabilityGroup, UpdateCapabilityGroup $action): RedirectResponse
    {
        $action->handle($capabilityGroup, ContentAttributes::fromRequest($request));

        return $this->redirectWithToast('admin.capability-groups.index', __('Capability row saved.'));
    }

    public function destroy(ConfirmPinRequest $request, CapabilityGroup $capabilityGroup, DeleteCapabilityGroup $action): RedirectResponse
    {
        $action->handle($capabilityGroup);

        return $this->redirectWithToast('admin.capability-groups.index', __('Capability row removed.'));
    }
}
