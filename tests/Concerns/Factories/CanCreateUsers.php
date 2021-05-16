<?php declare(strict_types=1);

namespace Tests\Concerns\Factories;

use App\Models\User;
use Database\Factories\UserFactory;

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
     * @return \Database\Factories\UserFactory
     */
    protected static function userFactory(): UserFactory
    {
        return UserFactory::new();
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
}
