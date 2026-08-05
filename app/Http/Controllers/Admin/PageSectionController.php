<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Actions\Portfolio\UpdatePageSection;
use App\DTOs\ContentAttributes;
use App\Http\Controllers\Concerns\RedirectsWithToast;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PageSectionUpdateRequest;
use App\Http\Resources\PageSectionResource;
use App\Models\PageSection;
use App\Services\Portfolio\ContentRepository;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

final class PageSectionController extends Controller
{
    use RedirectsWithToast;

    public function index(ContentRepository $content): Response
    {
        return Inertia::render('admin/sections', [
            'sections' => PageSectionResource::collection($content->sections())->resolve(),
        ]);
    }

    public function update(
        PageSectionUpdateRequest $request,
        PageSection $pageSection,
        UpdatePageSection $action,
    ): RedirectResponse {
        $action->handle($pageSection, ContentAttributes::fromRequest($request));

        return $this->redirectWithToast('admin.sections.index', __('Section saved.'));
    }
}
