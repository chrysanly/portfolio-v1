<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Services\Portfolio\PortfolioContentService;
use Inertia\Inertia;
use Inertia\Response;

/**
 * The public portfolio page.
 *
 * Intentionally public (RULES §5.1): this is the site's front door. It is
 * read-only, rate limited at the route, and served from the content cache.
 */
final class PortfolioController extends Controller
{
    public function __invoke(PortfolioContentService $content): Response
    {
        return Inertia::render('portfolio/show', $content->published());
    }
}
