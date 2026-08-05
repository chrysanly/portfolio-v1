<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Actions\Portfolio\CreateStat;
use App\Actions\Portfolio\DeleteStat;
use App\Actions\Portfolio\UpdateStat;
use App\DTOs\ContentAttributes;
use App\Http\Controllers\Concerns\RedirectsWithToast;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ConfirmPinRequest;
use App\Http\Requests\Admin\StatRequest;
use App\Http\Resources\StatResource;
use App\Models\Stat;
use App\Services\Portfolio\ContentRepository;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Manages the headline figures strip.
 */
final class StatController extends Controller
{
    use RedirectsWithToast;

    public function index(ContentRepository $content): Response
    {
        return Inertia::render('admin/stats', [
            'stats' => StatResource::collection($content->stats())->resolve(),
        ]);
    }

    public function store(StatRequest $request, CreateStat $action): RedirectResponse
    {
        $action->handle(ContentAttributes::fromRequest($request));

        return $this->redirectWithToast('admin.stats.index', __('Headline figure added.'));
    }

    public function update(StatRequest $request, Stat $stat, UpdateStat $action): RedirectResponse
    {
        $action->handle($stat, ContentAttributes::fromRequest($request));

        return $this->redirectWithToast('admin.stats.index', __('Headline figure saved.'));
    }

    public function destroy(ConfirmPinRequest $request, Stat $stat, DeleteStat $action): RedirectResponse
    {
        $action->handle($stat);

        return $this->redirectWithToast('admin.stats.index', __('Headline figure removed.'));
    }
}
