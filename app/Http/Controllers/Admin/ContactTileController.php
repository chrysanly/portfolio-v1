<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Actions\Portfolio\CreateContactTile;
use App\Actions\Portfolio\DeleteContactTile;
use App\Actions\Portfolio\UpdateContactTile;
use App\DTOs\ContentAttributes;
use App\Enums\ContactChannel;
use App\Http\Controllers\Concerns\RedirectsWithToast;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ConfirmPinRequest;
use App\Http\Requests\Admin\ContactTileRequest;
use App\Http\Resources\ContactTileResource;
use App\Models\ContactTile;
use App\Services\Portfolio\ContentRepository;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Manages the contact strip tiles.
 */
final class ContactTileController extends Controller
{
    use RedirectsWithToast;

    public function index(ContentRepository $content): Response
    {
        return Inertia::render('admin/contact-tiles', [
            'contactTiles' => ContactTileResource::collection($content->contactTiles())->resolve(),
            'channelOptions' => ContactChannel::options(),
        ]);
    }

    public function store(ContactTileRequest $request, CreateContactTile $action): RedirectResponse
    {
        $action->handle(ContentAttributes::fromRequest($request));

        return $this->redirectWithToast('admin.contact-tiles.index', __('Contact tile added.'));
    }

    public function update(ContactTileRequest $request, ContactTile $contactTile, UpdateContactTile $action): RedirectResponse
    {
        $action->handle($contactTile, ContentAttributes::fromRequest($request));

        return $this->redirectWithToast('admin.contact-tiles.index', __('Contact tile saved.'));
    }

    public function destroy(ConfirmPinRequest $request, ContactTile $contactTile, DeleteContactTile $action): RedirectResponse
    {
        $action->handle($contactTile);

        return $this->redirectWithToast('admin.contact-tiles.index', __('Contact tile removed.'));
    }
}
