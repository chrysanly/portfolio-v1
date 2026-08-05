<?php

declare(strict_types=1);

namespace Tests\Feature\Portfolio;

use App\Contracts\PinVerifier;
use Database\Seeders\PortfolioContentSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

/**
 * Shared setup for the content-admin tests: real seeded content and a known PIN.
 */
abstract class PortfolioAdminTestCase extends TestCase
{
    use RefreshDatabase;

    protected const PIN = '010121';

    protected function setUp(): void
    {
        parent::setUp();

        config(['portfolio.admin.pin_hash' => Hash::make(self::PIN)]);

        // The verifier is a singleton built from config; drop any instance the
        // framework resolved before the line above ran.
        $this->app->forgetInstance(PinVerifier::class);

        $this->seed(PortfolioContentSeeder::class);
    }

    /**
     * Open a confirmed PIN session the way a real browser does.
     */
    protected function unlockAdmin(): void
    {
        $this->post(route('admin.login.store'), ['pin' => self::PIN])
            ->assertRedirect(route('admin.dashboard'));
    }
}
