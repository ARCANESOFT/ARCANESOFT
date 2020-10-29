<?php

use Arcanesoft\Foundation\Authentication\Guard;

return [

    /* -----------------------------------------------------------------
     |  Authentication Defaults
     | -----------------------------------------------------------------
     */

    'defaults' => [
        'guard'     => Guard::WEB_USER,
        'passwords' => 'users',
    ],

    /* -----------------------------------------------------------------
     |  Authentication Guards
     | -----------------------------------------------------------------
     |  Supported drivers: "session", "token"
     */

    'guards' => [
        Guard::WEB_USER => [
            'driver'   => 'session',
            'provider' => 'users',
        ],

        Guard::WEB_ADMINISTRATOR => [
            'driver'   => 'session',
            'provider' => 'administrators',
        ],

        'api'   => [
            'driver'   => 'token',
            'provider' => 'users',
            'hash'     => false,
        ],
    ],

    /* -----------------------------------------------------------------
     |  User Providers
     | -----------------------------------------------------------------
     |  Supported Drivers: "database", "eloquent"
     */

    'providers' => [
        'users' => [
            'driver' => 'eloquent',
            'model'  => App\Models\User::class,
        ],

        'administrators' => [
            'driver' => 'eloquent',
            'model'  => Arcanesoft\Foundation\Authorization\Models\Administrator::class,
        ],

        // 'users' => [
        //     'driver' => 'database',
        //     'table' => 'users',
        // ],
    ],

    /* -----------------------------------------------------------------
     |  Resetting Passwords
     | -----------------------------------------------------------------
     */

    'passwords' => [
        'users' => [
            'provider' => 'users',
            'table'    => 'auth_password_resets',
            'expire'   => 60,
            'throttle' => 60,
        ],

        'administrators' => [
            'provider' => 'administrators',
            'table'    => 'auth_password_resets',
            'expire'   => 60,
            'throttle' => 60,
        ],
    ],

    /* -----------------------------------------------------------------
     |  Password Confirmation Timeout
     | -----------------------------------------------------------------
     */

    'password_timeout' => 10800, // in seconds (= 3 hours)

];
