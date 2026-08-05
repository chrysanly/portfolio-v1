<?php

declare(strict_types=1);

namespace App\Services\Portfolio;

use Closure;
use Illuminate\Contracts\Cache\Repository as CacheRepository;

/**
 * Owns the public payload cache: one key, one TTL, one flush.
 *
 * Deliberately a plain `remember()` rather than `flexible()`. Stale-while-
 * revalidate keeps serving the previous value while a background refresh runs,
 * which meant a corrected payload could stay invisible for the length of the
 * stale window — a debugging trap far more expensive than the cold rebuild it
 * avoids on a page this small. `remember()` either returns a fresh value or
 * rebuilds synchronously.
 */
final readonly class PortfolioCache
{
    public function __construct(
        private CacheRepository $cache,
        private string $key,
        private int $ttlInSeconds,
    ) {}

    /**
     * @param  Closure(): array<string, mixed>  $callback
     * @return array<string, mixed>
     */
    public function remember(Closure $callback): array
    {
        /** @var array<string, mixed> $payload */
        $payload = $this->cache->remember($this->key, $this->ttlInSeconds, $callback);

        return $payload;
    }

    public function flush(): void
    {
        $this->cache->forget($this->key);
    }
}
