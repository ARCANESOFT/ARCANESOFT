<?php

declare(strict_types=1);

namespace Authentication\Tests\Feature;

use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Contracts\Auth\StatefulGuard;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\{
    Auth,
    Event,
    Hash};

/**
 * Class     RegisterTest
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class RegisterTest extends TestCase
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
    public function it_can_view_a_registration_form_when_user_is_guest(): void
    {
        $this->get(static::registerGetUrl())
             ->assertSuccessful()
             ->assertViewIs('auth::register');
    }

    /** @test */
    public function it_cannot_view_a_registration_form_when_user_is_authenticated(): void
    {
        $user = static::makeUser();

        $this->actingAs($user)
            ->get(static::registerGetUrl())
            ->assertRedirect(static::indexPageUrl());
    }

    /** @test */
    public function it_can_register(): void
    {
        Event::fake();

        $data = [
            'first_name'            => 'John',
            'last_name'             => 'DOE',
            'email'                 => 'john.doe@example.com',
            'password'              => 'password',
            'password_confirmation' => 'password',
        ];

        $this->post(static::registerPostUrl(), $data)
             ->assertRedirect(static::indexPageUrl());

        $users = User::all();

        static::assertCount(1, $users);

        /** @var  \App\Models\User  $user */
        $user = $users->first();

        $this->assertAuthenticatedAs($user);

        static::assertSame('John', $user->first_name);
        static::assertSame('DOE', $user->last_name);
        static::assertSame('john.doe@example.com', $user->email);
        static::assertTrue(Hash::check('password', $user->password));

        Event::assertDispatched(Registered::class, function (Registered $e) use ($user) {
            return $e->user->getAuthIdentifier() === $user->getAuthIdentifier();
        });
    }

    /** @test */
    public function it_cannot_register_without_full_name(): void
    {
        $data = [
            'email'                 => 'john.doe@example.com',
            'password'              => 'password',
            'password_confirmation' => 'password',
        ];

        $resp = $this->from(static::registerGetUrl())
                     ->post(static::registerPostUrl(), $data)
                     ->assertRedirect(static::registerGetUrl())
                     ->assertSessionHasErrors('first_name')
                     ->assertSessionHasErrors('last_name')
                     ->assertSessionHasInput('email', 'john.doe@example.com');

        static::assertFalse($resp->getSession()->hasOldInput('password'));

        static::assertNoUserRegistered();

        $this->assertGuest();
    }

    /** @test */
    public function it_cannot_register_without_email(): void
    {
        $data = [
            'first_name'            => 'John',
            'last_name'             => 'DOE',
            'email'                 => '',
            'password'              => 'password',
            'password_confirmation' => 'password',
        ];

        $resp = $this->from(static::registerGetUrl())
                     ->post(static::registerPostUrl(), $data)
                     ->assertRedirect(static::registerGetUrl())
                     ->assertSessionHasErrors('email')
                     ->assertSessionHasInput('email_name', '')
                     ->assertSessionHasInput('first_name', 'John')
                     ->assertSessionHasInput('last_name', 'DOE');

        static::assertFalse($resp->getSession()->hasOldInput('password'));

        static::assertNoUserRegistered();

        $this->assertGuest();
    }

    /** @test */
    public function it_cannot_register_with_invalid_email(): void
    {
        $data = [
            'first_name'            => 'John',
            'last_name'             => 'DOE',
            'email'                 => 'invalid-email',
            'password'              => 'password',
            'password_confirmation' => 'password',
        ];

        $resp = $this->from(static::registerGetUrl())
                     ->post(static::registerPostUrl(), $data)
                     ->assertRedirect(static::registerGetUrl())
                     ->assertSessionHasInput('first_name', $data['first_name'])
                     ->assertSessionHasInput('last_name', $data['last_name'])
                     ->assertSessionHasInput('email', $data['email'])
                     ->assertSessionHasErrors('email');

        static::assertFalse($resp->getSession()->hasOldInput('password'));

        static::assertNoUserRegistered();

        $this->assertGuest();
    }

    /** @test */
    public function it_cannot_register_without_password(): void
    {
        $data = [
            'first_name'            => 'John',
            'last_name'             => 'DOE',
            'email'                 => 'john.doe@example.com',
            'password'              => '',
            'password_confirmation' => '',
        ];

        $resp = $this->from(static::registerGetUrl())
                     ->post(static::registerPostUrl(), $data)
                     ->assertRedirect(static::registerGetUrl())
                     ->assertSessionHasInput('first_name', $data['first_name'])
                     ->assertSessionHasInput('last_name', $data['last_name'])
                     ->assertSessionHasInput('email', $data['email'])
                     ->assertSessionHasErrors('password');

        static::assertNoUserRegistered();
        static::assertFalse($resp->getSession()->hasOldInput('password'));

        $this->assertGuest();
    }

    /** @test */
    public function it_cannot_register_without_a_confirmed_password(): void
    {
        $data = [
            'first_name'            => 'John',
            'last_name'             => 'DOE',
            'email'                 => 'john.doe@example.com',
            'password'              => 'password',
            'password_confirmation' => '',
        ];

        $resp = $this->from(static::registerGetUrl())
                     ->post(static::registerPostUrl(), $data)
                     ->assertRedirect(static::registerGetUrl())
                     ->assertSessionHasInput('first_name', $data['first_name'])
                     ->assertSessionHasInput('last_name', $data['last_name'])
                     ->assertSessionHasInput('email', $data['email'])
                     ->assertSessionHasErrors('password');

        static::assertNoUserRegistered();
        static::assertFalse($resp->getSession()->hasOldInput('password'));

        $this->assertGuest();
    }

    /** @test */
    public function it_cannot_register_with_a_unconfirmed_password(): void
    {
        $data = [
            'first_name'            => 'John',
            'last_name'             => 'DOE',
            'email'                 => 'john.doe@example.com',
            'password'              => 'password',
            'password_confirmation' => 'Pa$$w0rd',
        ];

        $resp = $this->from(static::registerGetUrl())
                     ->post(static::registerPostUrl(), $data)
                     ->assertRedirect(static::registerGetUrl())
                     ->assertSessionHasInput('first_name', $data['first_name'])
                     ->assertSessionHasInput('last_name', $data['last_name'])
                     ->assertSessionHasInput('email', $data['email'])
                     ->assertSessionHasErrors('password');

        static::assertNoUserRegistered();
        static::assertFalse($resp->getSession()->hasOldInput('password'));

        $this->assertGuest();
    }

    public function test_users_can_be_created_and_redirected_to_intended_url()
    {
        $data = [
            'first_name'            => 'John',
            'last_name'             => 'DOE',
            'email'                 => 'john.doe@example.com',
            'password'              => 'password',
            'password_confirmation' => 'password',
        ];

        $this->withSession(['url.intended' => 'http://foo.com/bar'])
             ->post(static::registerPostUrl(), $data)
             ->assertRedirect('http://foo.com/bar');
    }

    /* -----------------------------------------------------------------
     |  Other Methods
     | -----------------------------------------------------------------
     */

    /**
     * Get the users count.
     *
     * @return int
     */
    protected static function getUsersCount(): int
    {
        return User::query()->count();
    }

    /* -----------------------------------------------------------------
     |  Custom assertions
     | -----------------------------------------------------------------
     */

    /**
     * Assert no users was registered in the database.
     */
    protected static function assertNoUserRegistered(): void
    {
        static::assertSame(0, static::getUsersCount());
    }
}
