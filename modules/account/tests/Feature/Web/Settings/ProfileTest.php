<?php declare(strict_types=1);

namespace Account\Tests\Feature\Web\Settings;

use Account\Http\Web\Routes\Settings\ProfileRoutes;
use Account\Tests\Feature\TestCase;
use Authentication\Http\Routes\LoginRoutes;
use Authentication\Notifications\VerifyEmailNotification;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;

/**
 * Class     ProfileTest
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class ProfileTest extends TestCase
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
    public function it_redirect_if_user_not_authenticated()
    {
        $this->get(route(ProfileRoutes::PROFILE_INDEX))
             ->assertRedirect(route(LoginRoutes::LOGIN_CREATE));
    }

    /** @test */
    public function it_cannot_update_profile_with_empty_data(): void
    {
        $user = static::createUser();

        $requiredFields = ['email', 'first_name', 'last_name'];

        $this->from(route(ProfileRoutes::PROFILE_INDEX))
             ->actingAs($user)
             ->put(route(ProfileRoutes::PROFILE_UPDATE), [])
             ->assertSessionHasErrors($requiredFields)
             ->assertRedirect(route(ProfileRoutes::PROFILE_INDEX));
    }

    /** @test */
    public function it_cannot_update_profile_with_valid_data(): void
    {
        $user = static::createUser();

        $oldUpdatedAt = $user->updated_at;

        $this->travel(1)->seconds();

        $this->from(route(ProfileRoutes::PROFILE_INDEX))
             ->actingAs($user)
             ->put(route(ProfileRoutes::PROFILE_UPDATE), [
                 'email'      => 'john.doe@gmail.com',
                 'first_name' => 'John',
                 'last_name'  => 'Doe',
             ])
             ->assertSessionHasNoErrors()
             ->assertRedirect(route(ProfileRoutes::PROFILE_INDEX));

        $user->fresh();

        static::assertSame('john.doe@gmail.com', $user->email);
        static::assertSame('John', $user->first_name);
        static::assertSame('DOE', $user->last_name);
        static::assertNotEquals($oldUpdatedAt->toDateTimeString(), $user->updated_at->toDateTimeString());
    }

    /** @test */
    public function it_keeps_email_verified_when_not_updated(): void
    {
        Notification::fake();

        $user = static::createUser();

        static::assertTrue($user->hasVerifiedEmail());

        $this->from(route(ProfileRoutes::PROFILE_INDEX))
             ->actingAs($user)
             ->put(route(ProfileRoutes::PROFILE_UPDATE), $user->only(['email', 'first_name', 'last_name']))
             ->assertSessionHasNoErrors()
             ->assertRedirect(route(ProfileRoutes::PROFILE_INDEX));

        static::assertTrue($user->fresh()->hasVerifiedEmail());

        Notification::assertNotSentTo($user, VerifyEmailNotification::class);
    }

    /** @test */
    public function it_makes_email_unverified_when_changed(): void
    {
        Notification::fake();

        $user = static::createUser();

        static::assertTrue($user->hasVerifiedEmail());

        $this->from(route(ProfileRoutes::PROFILE_INDEX))
            ->actingAs($user)
            ->put(route(ProfileRoutes::PROFILE_UPDATE), [
                'email'      => 'john.doe@gmail.com',
                'first_name' => $user->first_name,
                'last_name'  => $user->last_name,
            ])
            ->assertSessionHasNoErrors()
            ->assertRedirect(route(ProfileRoutes::PROFILE_INDEX));

        static::assertFalse($user->fresh()->hasVerifiedEmail());

        Notification::assertSentTo($user, VerifyEmailNotification::class);
    }
}
