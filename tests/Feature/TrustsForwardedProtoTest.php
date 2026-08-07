<?php

declare(strict_types=1);

namespace Tests\Feature;

use Database\Seeders\PortfolioContentSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Vercel terminates TLS at the edge and forwards to the function over plain
 * HTTP. If the proxy is not trusted, Laravel reads the scheme as http and emits
 * every asset URL as http://, which a browser on an https page blocks as mixed
 * content — the deployed site renders as a blank unstyled page while everything
 * still returns 200. Nothing about that is visible in local development, so it
 * is pinned here instead.
 */
final class TrustsForwardedProtoTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(PortfolioContentSeeder::class);
    }

    public function test_forwarded_proto_makes_the_request_secure(): void
    {
        $this->get('/', ['X-Forwarded-Proto' => 'https']);

        $this->assertTrue(
            request()->isSecure(),
            'X-Forwarded-Proto was ignored; the proxy is not trusted.'
        );
    }

    public function test_assets_are_emitted_over_https_behind_the_proxy(): void
    {
        $response = $this->get('/', ['X-Forwarded-Proto' => 'https']);

        $response->assertOk();

        preg_match_all('#(?:src|href)="(https?://[^"]+)"#', $response->getContent(), $matches);

        $insecure = preg_grep('#^http://#', array_unique($matches[1]));

        $this->assertSame(
            [],
            array_values($insecure),
            'These would be blocked as mixed content on the deployed site.'
        );
    }
}
