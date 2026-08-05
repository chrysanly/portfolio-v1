<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Actions\Portfolio\UpdateSiteSettings;
use App\DTOs\ContentAttributes;
use App\Enums\ThemeMode;
use App\Http\Controllers\Concerns\RedirectsWithToast;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\SiteSettingUpdateRequest;
use App\Http\Resources\SiteSettingResource;
use App\Services\Portfolio\ContentRepository;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

final class SiteSettingController extends Controller
{
    use RedirectsWithToast;

    public function edit(ContentRepository $content): Response
    {
        $settings = $content->settings();

        return Inertia::render('admin/settings', [
            'settings' => SiteSettingResource::make($settings)->resolve(),
            // The form edits raw columns, so it needs the unshaped values too.
            'values' => $settings->only($settings->getFillable()),
            'themeOptions' => ThemeMode::options(),
        ]);
    }

    public function update(
        SiteSettingUpdateRequest $request,
        ContentRepository $content,
        UpdateSiteSettings $action,
    ): RedirectResponse {
        $action->handle($content->settings(), ContentAttributes::fromRequest($request));

        return $this->redirectWithToast('admin.settings.edit', __('Site settings saved.'));
    }
}
