<?php declare(strict_types=1);

namespace Account\Tests\Feature\Web\Settings;

use Account\Tests\Feature\TestCase;
use Authentication\Tests\Concerns\HasTwoFactorAuthentication;
use Illuminate\Foundation\Testing\RefreshDatabase;

/**
 * Class     TwoFactorAuthenticationControllerTest
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class TwoFactorAuthenticationControllerTest extends TestCase
{
    /* -----------------------------------------------------------------
     |  Traits
     | -----------------------------------------------------------------
     */

    use RefreshDatabase,
        HasTwoFactorAuthentication;

    /* -----------------------------------------------------------------
     |  Tests
     | -----------------------------------------------------------------
     */

    /** @test */
    public function it_can_enable_two_factor_authentication(): void
    {
        static::skipIfTwoFactorIsDisabled();

        $user = static::createUser();

        $this->enableTwoFactorAuthenticationRequest($user);

        $user->fresh();

        static::assertNotNull($user->twoFactor->recovery_codes);
        static::assertIsArray($user->twoFactor->decrypted_recovery_codes);
    }

    /** @test */
    public function it_can_disable_two_factor_authentication(): void
    {
        static::skipIfTwoFactorIsDisabled();

        $user = static::createUser();

        $this->enableTwoFactorAuthenticationRequest($user);

        $user->fresh();

        static::assertTrue($user->isTwoFactorEnabled());
        static::assertNotNull($user->twoFactor->recovery_codes);
        static::assertIsArray($user->twoFactor->decrypted_recovery_codes);

        $this->disableTwoFactorAuthenticationRequest($user)
             ->assertOk();

        static::assertFalse($user->isTwoFactorEnabled());
        static::assertNull($user->twoFactor);
    }

    /** @test */
    public function it_can_check_two_factor_status(): void
    {
        static::skipIfTwoFactorIsDisabled();

        $user = static::createUser();

        $this
            ->twoFactorAuthenticationStatusRequest($user)
            ->assertOk()
            ->assertJsonStructure(['enabled', 'recoveryCodes'])
            ->assertJson([
                'enabled'       => false,
                'recoveryCodes' => [],
            ]);

        $this->enableTwoFactorAuthenticationRequest($user);

        $resp = $this
            ->twoFactorAuthenticationStatusRequest($user)
            ->assertOk()
            ->assertJsonStructure(['enabled', 'recoveryCodes']);

        static::assertTrue($resp->json('enabled'));
        static::assertCount(8, $resp->json('recoveryCodes'));
    }

    /** @test */
    public function it_can_regenerate_two_factor_recovery_codes(): void
    {
        static::skipIfTwoFactorIsDisabled();

        $user = static::createUser();

        $resp = $this->enableTwoFactorAuthenticationRequest($user);

        $recoveryCodes = $resp->json('recoveryCodes');

        $resp = $this
            ->withoutExceptionHandling()
            ->actingAs($user)
            ->putJson(route('account::settings.security.two-factor.regenerate'), [], [
                'X-Requested-With' => 'XMLHttpRequest',
            ])
            ->assertOk()
            ->assertJsonStructure(['enabled', 'recoveryCodes']);

        $user->fresh();

        static::assertNotEquals($recoveryCodes, $resp->json('recoveryCodes'));
        static::assertEquals($resp->json('recoveryCodes'), $user->twoFactor->decrypted_recovery_codes);
    }

    /* -----------------------------------------------------------------
     |  Other Methods
     | -----------------------------------------------------------------
     */

    /**
     * Enable the Two Factor Authentication request.
     *
     * @return \Illuminate\Testing\TestResponse
     */
    protected function enableTwoFactorAuthenticationRequest($user)
    {
        return $this
            ->withoutExceptionHandling()
            ->actingAs($user)
            ->postJson(route('account::settings.security.two-factor.enable'), [], [
                'X-Requested-With' => 'XMLHttpRequest',
            ])
            ->assertOk()
            ->assertJsonStructure(['enabled', 'recoveryCodes']);
    }

    /**
     * Disable the Two Factor Authentication request.
     *
     * @param  mixed  $user
     *
     * @return \Illuminate\Testing\TestResponse
     */
    protected function disableTwoFactorAuthenticationRequest($user)
    {
        return $this
            ->withoutExceptionHandling()
            ->actingAs($user)
            ->deleteJson(route('account::settings.security.two-factor.disable'), [], [
                'X-Requested-With' => 'XMLHttpRequest',
            ])
            ->assertJson(['enabled' => false]);
    }

    /**
     * The Two Factor Authentication status request.
     *
     * @param  mixed  $user
     *
     * @return \Illuminate\Testing\TestResponse
     */
    protected function twoFactorAuthenticationStatusRequest($user)
    {
        return $this
            ->withoutExceptionHandling()
            ->actingAs($user)
            ->getJson(route('account::settings.security.two-factor.status'), [
                'X-Requested-With' => 'XMLHttpRequest',
            ]);
    }
}
