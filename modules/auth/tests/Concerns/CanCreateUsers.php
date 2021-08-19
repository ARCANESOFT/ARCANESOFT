<?php declare(strict_types=1);

namespace Authentication\Tests\Concerns;

use App\Models\User;

/**
 * Trait     CanCreateUsers
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
trait CanCreateUsers
{
    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
     */

    /**
     * Get the user factory builder.
     *
     * @return \Database\Factories\UserFactory|mixed
     */
    protected static function userFactory()
    {
        return User::factory();
    }

    /**
     * Create a new user.
     *
     * @param  array  $attributes
     *
     * @return \App\Models\User|mixed
     */
    protected static function createUser(array $attributes = []): User
    {
        return static::userFactory()->create($attributes);
    }

    /**
     * Make a new user.
     *
     * @param  array  $attributes
     *
     * @return \App\Models\User|mixed
     */
    protected static function makeUser(array $attributes = []): User
    {
        return static::userFactory()->make($attributes);
    }

    /**
     * Create an unverified user.
     *
     * @param  array  $attributes
     *
     * @return \Illuminate\Database\Eloquent\Collection|\Illuminate\Database\Eloquent\Model|mixed
     */
    protected static function createUnverifiedUser(array $attributes = [])
    {
        return static::userFactory()->unverified()->create($attributes);
    }
}
