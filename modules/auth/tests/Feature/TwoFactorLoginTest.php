<?php declare(strict_types=1);

namespace Authentication\Tests\Feature;

use App\Http\Routes\PagesRoutes;
use App\Models\User;
use Authentication\Tests\Concerns\HasTwoFactorAuthentication;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use PragmaRX\Google2FA\Google2FA;

/**
 * Class     TwoFactorLogin
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class TwoFactorLoginTest extends TestCase
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
    public function it_redirect_user_to_challenge_when_using_two_factor_authentication(): void
    {
        static::skipIfTwoFactorIsDisabled();

        static::createUserWithTwoFactor([
            'email' => 'taylor@laravel.com',
            'password' => 'secret',
        ]);

        $this
            ->withoutExceptionHandling()
            ->post(static::loginStoreUrl(), [
                'email'    => 'taylor@laravel.com',
                'password' => 'secret',
            ])
            ->assertRedirect(static::twoFactorCreateUrl());
    }

    /** @test */
    public function it_can_pass_two_factor_challenge_via_code(): void
    {
        static::skipIfTwoFactorIsDisabled();

        $engine = $this->app->make(Google2FA::class);
        $secret = $engine->generateSecretKey();
        $code   = $engine->getCurrentOtp($secret);

        $user = static::createUserWithTwoFactor([
            'email'    => 'taylor@laravel.com',
            'password' => 'secret',
        ], compact('secret'));

        $this->withSession(['login.id' => $user->id, 'login.remember' => false])
             ->withoutExceptionHandling()
             ->post(static::twoFactorPostUrl(), compact('code'))
             ->assertRedirect(PagesRoutes::home());
    }

    /** @test */
    public function it_can_pass_two_factor_challenge_via_recovery_code(): void
    {
        static::skipIfTwoFactorIsDisabled();

        $user = static::createUserWithTwoFactor([
            'email'    => 'taylor@laravel.com',
            'password' => 'secret',
        ], [
            'recovery_codes' => ['valid-code-1', 'valid-code-2'],
        ]);

        $this->withSession(['login.id' => $user->id, 'login.remember' => false])
            ->withoutExceptionHandling()
            ->post(static::twoFactorPostUrl(), [
                'recovery_code' => 'valid-code-2',
            ])
            ->assertRedirect(PagesRoutes::home());

        static::assertNotNull(Auth::user());
        static::assertNotContains('valid-code-2', $user->fresh()->twoFactor->decrypted_recovery_codes);
    }

    /** @test */
    public function it_must_fail_two_factor_challenge_with_invalid_recovery_code(): void
    {
        static::skipIfTwoFactorIsDisabled();

        $user = static::createUserWithTwoFactor([
            'email'    => 'taylor@laravel.com',
            'password' => 'secret',
        ], [
            'recovery_codes' => ['valid-code-1', 'valid-code-2'],
        ]);

        $this->withSession(['login.id' => $user->id, 'login.remember' => false])
             ->withoutExceptionHandling()
             ->post(static::twoFactorPostUrl(), [
                 'recovery_code' => 'invalid-code',
             ])
             ->assertRedirect(static::loginCreateUrl());

        static::assertNull(Auth::user());
    }

    /** @test */
    public function test_two_factor_challenge_requires_a_challenged_user(): void
    {
        static::skipIfTwoFactorIsDisabled();

        $this->get(static::twoFactorCreateUrl())
             ->assertStatus(Response::HTTP_FORBIDDEN);

        static::assertNull(Auth::user());
    }

    /* -----------------------------------------------------------------
     |  Other Methods
     | -----------------------------------------------------------------
     */

    /**
     * Create a user with two factor authentication.
     *
     * @param  array           $attributes
     * @param  array|string[]  $twoFactorAttributes
     *
     * @return \App\Models\User
     */
    protected static function createUserWithTwoFactor(
        array $attributes = [], array $twoFactorAttributes = ['secret' => 'test-secret']
    ): User
    {
        return tap(static::createUser($attributes), function (User $user) use ($twoFactorAttributes) {
            $user->twoFactor()->create($twoFactorAttributes);
        });
    }
}
