<?php

declare(strict_types=1);

namespace Authentication\Tests\Feature;

use Arcanesoft\Foundation\Authorization\Models\PasswordReset as PasswordResetModel;
use Arcanesoft\Foundation\Authorization\Notifications\Authentication\ResetPassword as ResetPasswordNotification;
use Arcanesoft\Foundation\Fortify\Concerns\HasPasswordBroker;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\{Event, Hash, Notification};

/**
 * Class     ResetPasswordTest
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class ResetPasswordTest extends TestCase
{
    /* -----------------------------------------------------------------
     |  Traits
     | -----------------------------------------------------------------
     */

    use HasPasswordBroker;
    use RefreshDatabase;

    /* -----------------------------------------------------------------
     |  Test
     | -----------------------------------------------------------------
     */

    /** @test */
    public function it_can_show_password_reset_form(): void
    {
        $user  = static::createUser();
        $token = static::broker()->createToken($user);

        $this->get(static::passwordResetGetUrl($token))
             ->assertSuccessful()
             ->assertViewIs('auth::passwords.reset')
             ->assertViewHas('token', $token);
    }

    /** @test */
    public function it_cannot_show_password_reset_form_when_user_is_authenticated(): void
    {
        $user  = static::createUser();
        $token = static::broker()->createToken($user);

        $this->actingAs($user)
             ->get(static::passwordResetGetUrl($token))
             ->assertRedirect(static::indexPageUrl());
    }

    /** @test */
    public function it_can_reset_password_with_valid_token()
    {
        $user = static::createUser();

        Event::fake();

        $data = [
            'token'                 => static::broker()->createToken($user),
            'email'                 => $email = $user->email,
            'password'              => 'new-password',
            'password_confirmation' => 'new-password',
        ];

        $this->post(static::passwordResetPostUrl(), $data)
             ->assertRedirect(static::loginCreateUrl());

        $user = $user->fresh();

        static::assertEquals($email, $user->email);
        static::assertTrue(Hash::check('new-password', $user->getAuthPassword()));

        Event::assertDispatched(PasswordReset::class, function (PasswordReset $e) use ($user) {
            return $e->user->getAuthIdentifier() === $user->getAuthIdentifier();
        });
    }

    /** @test */
    public function it_cannot_reset_password_with_invalid_token()
    {
        $user = static::createUser([
            'password' => 'old-password',
        ]);

        $data = [
            'token'                 => $token = 'invalid-token',
            'email'                 => $email = $user->email,
            'password'              => 'new-password',
            'password_confirmation' => 'new-password',
        ];

        $this->from(static::passwordResetGetUrl($token))
             ->post(static::passwordResetPostUrl(), $data)
             ->assertRedirect(static::passwordResetGetUrl($token));

        $user = $user->fresh();

        static::assertEquals($email, $user->email);
        static::assertTrue(Hash::check('old-password', $user->password));

        $this->assertGuest();
    }

    /** @test */
    public function it_cannot_reset_password_without_providing_a_valid_email(): void
    {
        $user = static::createUser([
            'email'    => 'john.doe@gmail.com',
            'password' => 'old-password',
        ]);

        $data = [
            'token'                 => $token = static::broker()->createToken($user),
            'email'                 => '',
            'password'              => 'new-awesome-password',
            'password_confirmation' => 'new-awesome-password',
        ];

        $resp = $this->from(static::passwordResetGetUrl($token))
                     ->post(static::passwordResetPostUrl(), $data)
                     ->assertRedirect(static::passwordResetGetUrl($token))
                     ->assertSessionHasErrors('email');

        $user = $user->fresh();

        static::assertFalse($resp->getSession()->hasOldInput('password'));
        static::assertEquals('john.doe@gmail.com', $user->email);
        static::assertTrue(Hash::check('old-password', $user->password));

        $this->assertGuest();
    }

    /** @test */
    public function it_cannot_reset_password_without_providing_a_new_password(): void
    {
        $user = static::createUser([
            'password' => 'old-password',
        ]);

        $data  = [
            'token'                 => $token = static::broker()->createToken($user),
            'email'                 => $email = $user->email,
            'password'              => '',
            'password_confirmation' => '',
        ];

        $resp = $this->from(static::passwordResetGetUrl($token))
                     ->post(static::passwordResetPostUrl(), $data)
                     ->assertRedirect(static::passwordResetGetUrl($token))
                     ->assertSessionHasErrors('password')
                     ->assertSessionHasInput('email', $email);

        static::assertFalse($resp->getSession()->hasOldInput('password'));

        $user = $user->fresh();

        static::assertEquals($email, $user->email);
        static::assertTrue(Hash::check('old-password', $user->password));

        $this->assertGuest();
    }

    /** @test */
    public function it_send_an_email_with_a_password_reset_link(): void
    {
        Notification::fake();

        $user = static::createUser();
        $data = [
            'email' => $user->email,
        ];

        $this->post(route('auth::password.email'), $data)
             ->assertRedirect(static::indexPageUrl())
             ->assertSessionHas('status', __('We have emailed your password reset link!'));

        /** @var  \Arcanesoft\Foundation\Authorization\Models\PasswordReset  $pwdReset */
        $pwdReset = PasswordResetModel::query()->where('email', $user->email)->first();

        static::assertNotNull($pwdReset);

        Notification::assertSentTo($user, ResetPasswordNotification::class, function (ResetPasswordNotification $notification, $channels) use ($pwdReset) {
            static::assertEquals(['mail'], $channels);

            return Hash::check($notification->token, $pwdReset->token) === true;
        });
    }

    /* -----------------------------------------------------------------
     |  Other Methods
     | -----------------------------------------------------------------
     */

    /**
     * Get the password broker's driver.
     *
     * @return string|null
     */
    protected static function getBrokerDriver(): ?string
    {
        return 'users';
    }
}
