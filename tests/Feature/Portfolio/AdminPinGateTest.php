<?php

declare(strict_types=1);

namespace Tests\Feature\Portfolio;

use App\Contracts\PinVerifier;

class AdminPinGateTest extends PortfolioAdminTestCase
{
    public function test_the_admin_is_closed_without_a_pin_session(): void
    {
        $this->get(route('admin.dashboard'))
            ->assertRedirect(route('admin.login'));
    }

    public function test_a_wrong_pin_does_not_open_a_session(): void
    {
        $this->post(route('admin.login.store'), ['pin' => '999999'])
            ->assertSessionHasErrors('pin');

        $this->get(route('admin.dashboard'))
            ->assertRedirect(route('admin.login'));
    }

    public function test_the_correct_pin_opens_the_admin(): void
    {
        $this->unlockAdmin();

        $this->get(route('admin.dashboard'))->assertOk();
    }

    public function test_locking_the_admin_closes_the_session(): void
    {
        $this->unlockAdmin();

        $this->post(route('admin.logout'))->assertRedirect(route('admin.login'));

        $this->get(route('admin.dashboard'))
            ->assertRedirect(route('admin.login'));
    }

    public function test_an_unconfigured_pin_hash_locks_everyone_out(): void
    {
        config(['portfolio.admin.pin_hash' => '']);
        $this->app->forgetInstance(PinVerifier::class);

        $this->post(route('admin.login.store'), ['pin' => self::PIN])
            ->assertSessionHasErrors('pin');
    }
}
