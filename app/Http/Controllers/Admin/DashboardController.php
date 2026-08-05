<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Portfolio\ContentRepository;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Landing screen: what is published, and where to go to change it.
 */
final class DashboardController extends Controller
{
    public function __invoke(ContentRepository $content): Response
    {
        return Inertia::render('admin/dashboard', [
            'counts' => [
                'sections' => $content->sections()->count(),
                'stats' => $content->stats()->count(),
                'profileFacts' => $content->profileFacts()->count(),
                'capabilityGroups' => $content->capabilityGroups()->count(),
                'experiences' => $content->experiences()->count(),
                'works' => $content->works()->count(),
                'contactTiles' => $content->contactTiles()->count(),
            ],
            'updatedAt' => $content->settings()->updated_at?->toIso8601String(),
        ]);
    }
}
