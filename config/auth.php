<?php

return [

    /* -----------------------------------------------------------------
     |  Authentication Defaults
     | -----------------------------------------------------------------
     */

    'defaults' => [
        'guard'     => 'web',
        'passwords' => 'users',
    ],

    /* -----------------------------------------------------------------
     |  Authentication Guards
     | -----------------------------------------------------------------
     | Supported: "session", "token"
     */

    'guards' => [
        'web' => [
            'driver'   => 'session',
            'provider' => 'users',
        ],

        'api' => [
            'driver'   => 'token',
            'provider' => 'users',
        ],
    ],

    /* -----------------------------------------------------------------
     |  User Providers
     | -----------------------------------------------------------------
     | Supported: "database", "eloquent"
     */

    'providers' => [
        'users' => [
            'driver' => 'eloquent',
            'model'  => \App\Models\User::class,
        ],

        // 'users' => [
        //     'driver' => 'database',
        //     'table'  => 'users',
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
        ],
    ],

];
