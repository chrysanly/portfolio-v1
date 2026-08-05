<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Actions\Portfolio\CreateCapabilityItem;
use App\Actions\Portfolio\DeleteCapabilityItem;
use App\Actions\Portfolio\UpdateCapabilityItem;
use App\DTOs\ContentAttributes;
use App\Http\Controllers\Concerns\RedirectsWithToast;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CapabilityItemRequest;
use App\Http\Requests\Admin\ConfirmPinRequest;
use App\Models\CapabilityGroup;
use App\Models\CapabilityItem;
use Illuminate\Http\RedirectResponse;

/**
 * Manages the technology tags inside one capability row.
 *
 * Routes are scope-bound, so a child can only ever be reached through its own
 * parent (ARCHITECTURE §5, RULES §5.4).
 */
final class CapabilityItemController extends Controller
{
    use RedirectsWithToast;

    public function store(CapabilityItemRequest $request, CapabilityGroup $capabilityGroup, CreateCapabilityItem $action): RedirectResponse
    {
        $action->handle(
            ContentAttributes::fromRequest($request)->with('capability_group_id', $capabilityGroup->id),
        );

        return $this->redirectWithToast('admin.capability-groups.index', __('Tag added.'));
    }

    public function update(
        CapabilityItemRequest $request,
        CapabilityGroup $capabilityGroup,
        CapabilityItem $item,
        UpdateCapabilityItem $action,
    ): RedirectResponse {
        $action->handle($item, ContentAttributes::fromRequest($request));

        return $this->redirectWithToast('admin.capability-groups.index', __('Tag saved.'));
    }

    public function destroy(
        ConfirmPinRequest $request,
        CapabilityGroup $capabilityGroup,
        CapabilityItem $item,
        DeleteCapabilityItem $action,
    ): RedirectResponse {
        $action->handle($item);

        return $this->redirectWithToast('admin.capability-groups.index', __('Tag removed.'));
    }
}
