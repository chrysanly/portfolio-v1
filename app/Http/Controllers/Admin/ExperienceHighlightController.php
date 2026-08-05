<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Actions\Portfolio\CreateExperienceHighlight;
use App\Actions\Portfolio\DeleteExperienceHighlight;
use App\Actions\Portfolio\UpdateExperienceHighlight;
use App\DTOs\ContentAttributes;
use App\Http\Controllers\Concerns\RedirectsWithToast;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ConfirmPinRequest;
use App\Http\Requests\Admin\ExperienceHighlightRequest;
use App\Models\Experience;
use App\Models\ExperienceHighlight;
use Illuminate\Http\RedirectResponse;

/**
 * Manages the bullets under one experience entry.
 *
 * Routes are scope-bound, so a child can only ever be reached through its own
 * parent (ARCHITECTURE §5, RULES §5.4).
 */
final class ExperienceHighlightController extends Controller
{
    use RedirectsWithToast;

    public function store(ExperienceHighlightRequest $request, Experience $experience, CreateExperienceHighlight $action): RedirectResponse
    {
        $action->handle(
            ContentAttributes::fromRequest($request)->with('experience_id', $experience->id),
        );

        return $this->redirectWithToast('admin.experiences.index', __('Bullet added.'));
    }

    public function update(
        ExperienceHighlightRequest $request,
        Experience $experience,
        ExperienceHighlight $highlight,
        UpdateExperienceHighlight $action,
    ): RedirectResponse {
        $action->handle($highlight, ContentAttributes::fromRequest($request));

        return $this->redirectWithToast('admin.experiences.index', __('Bullet saved.'));
    }

    public function destroy(
        ConfirmPinRequest $request,
        Experience $experience,
        ExperienceHighlight $highlight,
        DeleteExperienceHighlight $action,
    ): RedirectResponse {
        $action->handle($highlight);

        return $this->redirectWithToast('admin.experiences.index', __('Bullet removed.'));
    }
}
