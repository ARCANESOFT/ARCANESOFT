<?php

declare(strict_types=1);

namespace Authentication\Tests\Feature;

use Arcanesoft\Foundation\Authorization\Models\PasswordReset as PasswordResetModel;
use Arcanesoft\Foundation\Authorization\Notifications\Authentication\ResetPassword as ResetPasswordNotification;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\{Hash, Notification};

/**
 * Class     ForgotPasswordTest
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class ForgotPasswordTest extends TestCase
{
    /* -----------------------------------------------------------------
     |  Traits
     | -----------------------------------------------------------------
     */

    use RefreshDatabase;

    /* -----------------------------------------------------------------
     |  Tests
     | -----------------------------------------------------------------
     */

    /** @test */
    public function it_can_show_form_if_user_is_guest(): void
    {
        $this->get(static::passwordRequestUrl())
             ->assertSuccessful()
             ->assertViewIs('auth::passwords.forgot');
    }

    /** @test */
    public function it_cannot_show_form_if_user_is_authenticated(): void
    {
        $user = static::makeUser();

        $this->actingAs($user)
             ->get(static::passwordRequestUrl())
             ->assertRedirect(static::indexPageUrl());
    }

    /** @test */
    public function it_can_send_email_with_a_password_reset_link(): void
    {
        Notification::fake();

        $user = static::createUser([
            'email' => 'john.doe@gmail.com',
        ]);

        $this->post(static::passwordEmailPostUrl(), [
            'email' => $user->email,
        ]);

        $pwdReset = PasswordResetModel::query()->where('email', $user->email)->first();

        static::assertNotNull($pwdReset);

        Notification::assertSentTo($user, ResetPasswordNotification::class, function (ResetPasswordNotification $notification, array $channels) use ($pwdReset) {
            static::assertEquals(['mail'], $channels);

            return Hash::check($notification->token, $pwdReset->token) === true;
        });
    }

    /** @test */
    public function it_must_not_send_email_to_an_unregistered_user(): void
    {
        Notification::fake();

        $data = [
            'email' => 'nobody@example.com',
        ];

        $this->from(static::passwordRequestUrl())
             ->post(static::passwordEmailPostUrl(), $data)
             ->assertRedirect(static::passwordRequestUrl())
             ->assertSessionHasErrors('email');

        Notification::assertNotSentTo(static::makeUser($data), ResetPasswordNotification::class);
    }

    /** @test */
    public function it_requires_email(): void
    {
        $this->from(static::passwordRequestUrl())
             ->post(static::passwordEmailPostUrl(), [])
             ->assertRedirect(static::passwordRequestUrl())
             ->assertSessionHasErrors('email');
    }

    /** @test */
    public function it_requires_valid_email(): void
    {
        $email = 'invalid-email';

        $this->from(static::passwordRequestUrl())
             ->post(static::passwordEmailPostUrl(), compact('email'))
             ->assertRedirect(static::passwordRequestUrl())
             ->assertSessionHasErrors('email')
             ->assertSessionHasInput('email', $email);
    }
}
