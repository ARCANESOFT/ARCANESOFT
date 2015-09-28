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
        'password'       => bcrypt(str_random(10)),
        'username'       => $faker->userName,
        'last_name'      => $faker->lastName,
        'first_name'     => $faker->firstName,
        'type'           => $faker->randomElement(['member', 'admin']),
        'active'         => rand(0, 1),
        'remember_token' => str_random(10),
    ];
});
