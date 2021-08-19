<?php declare(strict_types=1);

namespace Authentication\Tests\Feature;

use App\Models\User;
use Authentication\Tests\Concerns\HasLoginFeature;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Response;
use Illuminate\Testing\TestResponse;

/**
 * Class     LoginTest
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class LoginTest extends TestCase
{
    /* -----------------------------------------------------------------
     |  Traits
     | -----------------------------------------------------------------
     */

    use RefreshDatabase,
        HasLoginFeature;

    /* -----------------------------------------------------------------
     |  Tests
     | -----------------------------------------------------------------
     */

    /** @test */
    public function it_can_access_login_form(): void
    {
        static::skipIfLoginIsDisabled();

        $this->get(static::loginCreateUrl())
             ->assertSuccessful()
             ->assertViewIs('auth::login');
    }

    /** @test */
    public function it_can_disable_login_form(): void
    {
        static::skipIfLoginIsDisabled();

        $this->disableLogin();

        $this->get(static::loginCreateUrl())
             ->assertNotFound();

        $this->post(static::loginStoreUrl())
             ->assertStatus(Response::HTTP_FORBIDDEN);
    }

    /** @test */
    public function it_must_hide_login_form_when_user_is_authenticated(): void
    {
        static::skipIfLoginIsDisabled();

        $user = static::createUser();

        $this->actingAs($user)
             ->get(static::loginCreateUrl())
             ->assertRedirect(static::indexPageUrl());

        $this->assertAuthenticatedAs($user);
    }

    /** @test */
    public function it_can_authenticate(): void
    {
        static::skipIfLoginIsDisabled();

        $user = static::createUser();

        $this->from(static::loginCreateUrl())
             ->post(static::loginStoreUrl(), [
                 'email'    => $user->email,
                 'password' => 'password',
             ])
             ->assertRedirect(static::homePageUrl());

        $this->assertAuthenticatedAs($user);
    }

    /** @test */
    public function it_can_authenticate_with_remember_me_functionality(): void
    {
        static::skipIfLoginIsDisabled();

        $user = static::createUser();

        $resp = $this
             ->from(static::loginCreateUrl())
             ->post(static::loginStoreUrl(), [
                 'email'    => $user->email,
                 'password' => 'password',
                 'remember' => 'on',
             ])
             ->assertRedirect(static::homePageUrl());

        $user = $user->fresh();

        $this->assertHasRememberMeCookie($resp, $user);

        $this->assertAuthenticatedAs($user);
    }

    /** @test */
    public function it_cannot_let_user_login_with_incorrect_email(): void
    {
        static::skipIfLoginIsDisabled();

        $resp = $this
            ->from(static::loginCreateUrl())
            ->post(static::loginStoreUrl(), [
                'email'    => 'nobody@example.com',
                'password' => 'invalid-password',
            ])
            ->assertRedirect(static::loginCreateUrl())
            ->assertSessionHasErrors('email')
            ->assertSessionHasInput('email', 'nobody@example.com');

        static::assertFalse($resp->getSession()->hasOldInput('password'));

        $this->assertGuest();
    }

    /** @test */
    public function it_cannot_let_user_login_with_incorrect_password(): void
    {
        static::skipIfLoginIsDisabled();

        $user = static::createUser();

        $resp = $this
            ->from(static::loginCreateUrl())
            ->post(static::loginStoreUrl(), [
                'email'    => $user->email,
                'password' => 'invalid-password',
            ])
            ->assertRedirect(static::loginStoreUrl())
            ->assertSessionHasErrors('email')
            ->assertSessionHasInput('email', $user->email);

        static::assertFalse($resp->getSession()->hasOldInput('password'));
        $this->assertGuest();
    }

    /** @test */
    public function it_can_logout(): void
    {
        $user = static::createUser();

        $this->actingAs($user)
             ->assertAuthenticatedAs($user);

        $this->delete(static::logoutUrl())
             ->assertRedirect(static::indexPageUrl());

        $this->assertGuest();
    }

    /** @test */
    public function it_can_logout_as_json_request(): void
    {
        $user = static::createUser();

        $this->actingAs($user)
             ->assertAuthenticatedAs($user);

        $this->deleteJson(static::logoutUrl())
             ->assertSuccessful()
             ->assertExactJson([
                 'success' => 'Successfully logged out of application',
             ]);

        $this->assertGuest();
    }

    /** @test */
    public function it_cannot_logout_when_user_not_authenticated(): void
    {
        $this->assertGuest();

        $this->delete(static::logoutUrl())
             ->assertRedirect(static::indexPageUrl());

        $this->assertGuest();
    }

    /** @test */
    public function it_cannot_logout_when_user_not_authenticated_as_json_request(): void
    {
        $this->assertGuest();

        $this->deleteJson(static::logoutUrl())
             ->assertSuccessful()
             ->assertExactJson([
                 'success' => 'Successfully logged out of application',
             ]);

        $this->assertGuest();
    }

    /** @test */
    public function it_cannot_allow_more_than_five_attempts_in_one_minute(): void
    {
        static::skipIfLoginIsDisabled();

        $user = static::createUser();
        $data = [
            'email'    => $user->email,
            'password' => 'invalid-password',
        ];

        foreach (range(0, 5) as $index) {
            $resp = $this->from(static::loginCreateUrl())
                         ->post(static::loginStoreUrl(), $data);
        }

        $resp->assertStatus(Response::HTTP_TOO_MANY_REQUESTS);

        $this->assertGuest();
    }

    /* -----------------------------------------------------------------
     |  Other Methods
     | -----------------------------------------------------------------
     */

    /**
     * Get the `too many login attempts` message.
     *
     * @return string
     */
    protected function getTooManyLoginAttemptsMessage(): string
    {
        return sprintf('/^%s$/', str_replace('\:seconds', '\d+', preg_quote(__('auth.throttle'), '/')));
    }

    /* -----------------------------------------------------------------
     |  Custom Assertions
     | -----------------------------------------------------------------
     */

    /**
     * Assert has remember me cookie.
     *
     * @param  \Illuminate\Testing\TestResponse  $resp
     * @param  \App\Models\User|mixed            $user
     */
    protected function assertHasRememberMeCookie(TestResponse $resp, User $user): void
    {
        $name = $this->app->make('auth')->guard()->getRecallerName();

        $resp->assertCookie($name, vsprintf('%s|%s|%s', [
            $user->id,
            $user->getRememberToken(),
            $user->password,
        ]));
    }
}
