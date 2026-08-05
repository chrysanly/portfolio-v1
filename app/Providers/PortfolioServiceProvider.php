<?php

declare(strict_types=1);

namespace App\Providers;

use App\Contracts\PinVerifier;
use App\Services\Auth\AdminPinSession;
use App\Services\Auth\HashedPinVerifier;
use App\Services\Portfolio\PortfolioCache;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Contracts\Cache\Repository as CacheRepository;
use Illuminate\Contracts\Hashing\Hasher;
use Illuminate\Contracts\Session\Session;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

/**
 * Wires the portfolio's own services and rate limiters.
 *
 * Configuration is read here — the one place `config()` belongs — so nothing
 * downstream needs to know where the PIN hash or the cache TTLs live
 * (RULES §5.8, §10).
 */
final class PortfolioServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton(PinVerifier::class, fn ($app): HashedPinVerifier => new HashedPinVerifier(
            $app->make(Hasher::class),
            (string) config('portfolio.admin.pin_hash'),
            explainsMisconfiguration: ! $app->isProduction(),
        ));

        $this->app->bind(AdminPinSession::class, fn ($app): AdminPinSession => new AdminPinSession(
            $app->make(Session::class),
            (string) config('portfolio.admin.session_key'),
            (int) config('portfolio.admin.session_lifetime'),
        ));

        $this->app->singleton(PortfolioCache::class, fn ($app): PortfolioCache => new PortfolioCache(
            $app->make(CacheRepository::class),
            (string) config('portfolio.cache.key'),
            (int) config('portfolio.cache.ttl'),
        ));
    }

    public function boot(): void
    {
        // Brute-forcing a six-digit PIN has to be expensive (RULES §5.6).
        RateLimiter::for('admin-pin', fn (Request $request): Limit => Limit::perMinute(5)->by($request->ip()));

        RateLimiter::for('portfolio', fn (Request $request): Limit => Limit::perMinute(120)->by($request->ip()));
    }
}
