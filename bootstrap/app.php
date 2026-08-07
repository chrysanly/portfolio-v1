<?php

use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Http\Request;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        /*
         * Vercel terminates TLS at its edge and forwards to the function over
         * plain HTTP, so without trusting the proxy Laravel reads the scheme as
         * http and builds every asset URL as http://. The browser then blocks
         * all of them as mixed content on an https page — fonts, stylesheet and
         * scripts alike — and the site renders as an unstyled blank page.
         *
         * `at: '*'` rather than a fixed list because Vercel's forwarding IPs are
         * dynamic and undocumented. The function is only reachable through that
         * proxy, so there is no untrusted path that could spoof the headers.
         */
        $middleware->trustProxies(at: '*');

        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->shouldRenderJsonWhen(
            fn (Request $request) => $request->is('api/*') || $request->expectsJson(),
        );
    })->create();
