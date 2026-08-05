<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Actions\Portfolio\CreateExperience;
use App\Actions\Portfolio\DeleteExperience;
use App\Actions\Portfolio\UpdateExperience;
use App\DTOs\ContentAttributes;
use App\Http\Controllers\Concerns\RedirectsWithToast;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ConfirmPinRequest;
use App\Http\Requests\Admin\ExperienceRequest;
use App\Http\Resources\ExperienceResource;
use App\Models\Experience;
use App\Services\Portfolio\ContentRepository;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Manages the experience accordion entries.
 */
final class ExperienceController extends Controller
{
    use RedirectsWithToast;

    public function index(ContentRepository $content): Response
    {
        return Inertia::render('admin/experiences', [
            'experiences' => ExperienceResource::collection($content->experiences())->resolve(),
        ]);
    }

    public function store(ExperienceRequest $request, CreateExperience $action): RedirectResponse
    {
        $action->handle(ContentAttributes::fromRequest($request));

        return $this->redirectWithToast('admin.experiences.index', __('Experience entry added.'));
    }

    public function update(ExperienceRequest $request, Experience $experience, UpdateExperience $action): RedirectResponse
    {
        $action->handle($experience, ContentAttributes::fromRequest($request));

        return $this->redirectWithToast('admin.experiences.index', __('Experience entry saved.'));
    }

    public function destroy(ConfirmPinRequest $request, Experience $experience, DeleteExperience $action): RedirectResponse
    {
        $action->handle($experience);

        return $this->redirectWithToast('admin.experiences.index', __('Experience entry removed.'));
    }
}
