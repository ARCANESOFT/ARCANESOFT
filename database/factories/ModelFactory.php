<?php

use App\Models\User;
use Illuminate\Database\Eloquent\Factory;

/* ------------------------------------------------------------------------------------------------
 |  Model Factories
 | ------------------------------------------------------------------------------------------------
 */
/** @var Factory $factory */
$factory->define(User::class, function (Faker\Generator $faker) {
    return [
        'email'          => $faker->email,
        'username'       => $faker->userName,
        'last_name'      => $faker->lastName,
        'first_name'     => $faker->firstName,
        'password'       => bcrypt(str_random(10)),
        'remember_token' => str_random(10),
        'type'           => 'member',
        'active'         => rand(0, 1),
    ];
});
