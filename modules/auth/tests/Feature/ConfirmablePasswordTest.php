<?php

declare(strict_types=1);

namespace Authentication\Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;

/**
 * Class     ConfirmablePasswordTest
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class ConfirmablePasswordTest extends TestCase
{
    /* -----------------------------------------------------------------
     |  Traits
     | -----------------------------------------------------------------
     */

    use RefreshDatabase;

    /* -----------------------------------------------------------------
     |  Properties
     | -----------------------------------------------------------------
     */

    /** @var  \App\Models\User */
    protected $user;

    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
     */

    /**
     * Setup the test environment.
     */
    protected function setUp(): void
    {
        parent::setUp();

        $this->user = static::createUser([
            'first_name' => 'Taylor',
            'last_name'  => 'Otwell',
            'email'      => 'taylor@laravel.com',
            'password'  => 'secret',
        ]);
    }

    /* -----------------------------------------------------------------
     |  Tests
     | -----------------------------------------------------------------
     */

    /** @test */
    public function it_confirms_password_via_a_view_form(): void
    {
        $this->withoutExceptionHandling()
             ->actingAs($this->user)
             ->get(route('auth::password.confirm.show'))
             ->assertOk()
             ->assertSeeText('Confirm Password');
    }

    /** @test */
    public function it_allows_password_to_be_confirmed(): void
    {
        $this->withoutExceptionHandling()
             ->actingAs($this->user)
             ->withSession(['url.intended' => 'http://foo.com/bar'])
             ->post(
                 route('auth::password.confirm.store'),
                 ['password' => 'secret']
             )
             ->assertSessionHas('auth.password_confirmed_at')
             ->assertRedirect('http://foo.com/bar');
    }

    /** @test */
    public function it_fails_password_confirmation_with_an_invalid_password(): void
    {
        $response = $this->withoutExceptionHandling()
            ->actingAs($this->user)
            ->withSession(['url.intended' => 'http://foo.com/bar'])
            ->post(
                route('auth::password.confirm.store'),
                ['password' => 'invalid']
            )
            ->assertSessionHasErrors(['password'])
            ->assertSessionMissing(['auth.password_confirmed_at'])
            ->assertRedirect();

        static::assertNotEquals($response->getTargetUrl(), 'http://foo.com/bar');
    }

    /** @test */
    public function it_fails_password_confirmation_without_a_password(): void
    {
        $response = $this
            ->withoutExceptionHandling()
            ->actingAs($this->user)
            ->withSession(['url.intended' => 'http://foo.com/bar'])
            ->post(
                route('auth::password.confirm.store'),
                ['password' => null]
            )
            ->assertSessionHasErrors(['password'])
            ->assertSessionMissing(['auth.password_confirmed_at'])
            ->assertRedirect();

        static::assertNotEquals($response->getTargetUrl(), 'http://foo.com/bar');
    }

    /** @test */
    public function it_confirms_password_with_json(): void
    {
        $this->actingAs($this->user)
             ->postJson(
                 route('auth::password.confirm.store'),
                 ['password' => 'secret']
             )
            ->assertStatus(201);
    }

    /** @test */
    public function it_fails_password_confirmation_with_json(): void
    {
        $this->actingAs($this->user)
             ->postJson(
                 route('auth::password.confirm.store'),
                 ['password' => 'invalid']
             )
             ->assertJsonValidationErrors('password');
    }
}
