<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\User;
use Arcanesoft\Foundation\Auth\Database\Factories\UserFactory as Factory;

/**
 * Class     UserFactory
 *
 * @package  Database\Factories
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class UserFactory extends Factory
{
    /* -----------------------------------------------------------------
     |  Properties
     | -----------------------------------------------------------------
     */

    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = User::class;
}
