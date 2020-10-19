<?php

declare(strict_types=1);

namespace Authentication\Tests\Feature;

use Authentication\Notifications\VerifyEmailNotification;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;

/**
 * Class     EmailVerificationTest
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class EmailVerificationTest extends TestCase
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
    public function it_cannot_let_guest_to_see_the_verification_notice(): void
    {
        $this->get(static::verificationNoticeUrl())
             ->assertRedirect(static::loginCreateUrl());
    }

    /** @test */
    public function it_can_let_authenticated_user_sees_the_verification_notice_when_not_verified(): void
    {
        $user = static::createUnverifiedUser();

        $this->actingAs($user)
             ->get(static::verificationNoticeUrl())
             ->assertSuccessful()
             ->assertViewIs('auth::verify-email');
    }

    /** @test */
    public function it_must_redirect_verified_user_to_home_when_visiting_verification_notice_route(): void
    {
        $user = static::createUser();

        $this->actingAs($user)
             ->get(static::verificationNoticeUrl())
             ->assertRedirect(static::homePageUrl());
    }

    /** @test */
    public function it_cannot_let_guests_sees_the_verification_verify_route(): void
    {
        $user = static::createUnverifiedUser();

        $this->get(static::validVerificationVerifyUrl($user))
             ->assertRedirect(static::loginCreateUrl());
    }

    /** @test */
    public function it_cannot_let_a_user_to_verify_other_users(): void
    {
        $user = static::createUnverifiedUser(['id' => 1]);

        $unrelatedUser = static::createUnverifiedUser(['id' => 2]);

        $this->actingAs($user)
             ->get(static::validVerificationVerifyUrl($unrelatedUser))
             ->assertForbidden();

        static::assertFalse($unrelatedUser->fresh()->hasVerifiedEmail());
    }

    /** @test */
    public function it_must_redirect_user_to_correct_route_when_already_verified(): void
    {
        $user = static::createUser();

        $this->actingAs($user)
             ->get(static::validVerificationVerifyUrl($user))
             ->assertRedirect(static::homePageUrl(['verified' => '1']));
    }

    /** @test */
    public function it_must_forbid_invalid_signature_in_verification(): void
    {
        $user = static::createUser();

        $this->actingAs($user)
             ->get(static::invalidVerificationVerifyUrl($user))
             ->assertStatus(403);
    }

    /** @test */
    public function it_can_let_user_verify_themselves(): void
    {
        $user = static::createUnverifiedUser();

        $this->actingAs($user)
             ->get(static::validVerificationVerifyUrl($user))
             ->assertRedirect(static::homePageUrl(['verified' => '1']));

        static::assertNotNull($user->fresh()->email_verified_at);
    }

    /** @test */
    public function it_cannot_let_guest_resend_a_verification_email(): void
    {
        $this->post(static::verificationResendUrl())
             ->assertRedirect(static::loginCreateUrl());
    }

    /** @test */
    public function it_redirects_user_to_correct_route_if_already_verified(): void
    {
        $user = static::createUser();

        $this->actingAs($user)
             ->post(static::verificationResendUrl())
             ->assertRedirect(static::homePageUrl());
    }

    /** @test */
    public function it_can_let_user_resend_a_verification_email(): void
    {
        Notification::fake();

        $user = static::createUnverifiedUser();

        $this->actingAs($user)
             ->from(static::verificationNoticeUrl())
             ->post(static::verificationResendUrl())
             ->assertRedirect(static::verificationNoticeUrl());

        Notification::assertSentTo($user, VerifyEmailNotification::class);
    }
}
