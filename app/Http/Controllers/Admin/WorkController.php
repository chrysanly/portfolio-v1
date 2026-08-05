<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Actions\Portfolio\CreateWork;
use App\Actions\Portfolio\DeleteWork;
use App\Actions\Portfolio\UpdateWork;
use App\DTOs\ContentAttributes;
use App\Http\Controllers\Concerns\RedirectsWithToast;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ConfirmPinRequest;
use App\Http\Requests\Admin\WorkRequest;
use App\Http\Resources\WorkResource;
use App\Models\Work;
use App\Services\Portfolio\ContentRepository;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Manages the Selected work cards.
 */
final class WorkController extends Controller
{
    use RedirectsWithToast;

    public function index(ContentRepository $content): Response
    {
        return Inertia::render('admin/works', [
            'works' => WorkResource::collection($content->works())->resolve(),
        ]);
    }

    public function store(WorkRequest $request, CreateWork $action): RedirectResponse
    {
        $action->handle(ContentAttributes::fromRequest($request));

        return $this->redirectWithToast('admin.works.index', __('Work card added.'));
    }

    public function update(WorkRequest $request, Work $work, UpdateWork $action): RedirectResponse
    {
        $action->handle($work, ContentAttributes::fromRequest($request));

        return $this->redirectWithToast('admin.works.index', __('Work card saved.'));
    }

    public function destroy(ConfirmPinRequest $request, Work $work, DeleteWork $action): RedirectResponse
    {
        $action->handle($work);

        return $this->redirectWithToast('admin.works.index', __('Work card removed.'));
    }
}
