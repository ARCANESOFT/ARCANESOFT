<?php

return [
    /* ------------------------------------------------------------------------------------------------
     |  Route
     | ------------------------------------------------------------------------------------------------
     */
    'route'              => [
        'prefix' => 'authorization',
    ],

    /* ------------------------------------------------------------------------------------------------
     |  Authentication
     | ------------------------------------------------------------------------------------------------
     */
    'authentication' => [
        'enabled' => [
            'login-logout' => true,
            'register'     => true,
            'password'     => true,
        ],

        'routes' => [
            'global' => [
                'prefix'     => 'auth',
                'as'         => 'auth::',
                'middleware' => 'web',
                'namespace'  => 'Arcanesoft\\Auth\\Http\\Controllers\\Front',
            ],

            'login' => [
                'prefix' => 'login',
                'as'     => 'login.',
            ],

            'logout' => [
                'prefix' => 'logout',
            ],

            'register' => [
                'prefix' => 'register',
                'as'     => 'register.',
            ],

            'password' => [
                'prefix' => 'password',
                'as'     => 'password.',
            ],
        ],
    ],

    /* ------------------------------------------------------------------------------------------------
     |  Database
     | ------------------------------------------------------------------------------------------------
     */
    'database'           => [
        'connection' => config('database.default'),
    ],

    /* ------------------------------------------------------------------------------------------------
     |  Models
     | ------------------------------------------------------------------------------------------------
     */
    'users'              => [
        'table'          => 'users',
        'model'          => \Arcanesoft\Auth\Models\User::class,
        'observer'       => \Arcanesoft\Auth\Models\Observers\UserObserver::class,
        'slug-separator' => '.',
    ],

    'roles'              => [
        'table'          => 'roles',
        'model'          => \Arcanesoft\Auth\Models\Role::class,
        'observer'       => \Arcanesoft\Auth\Models\Observers\RoleObserver::class,
        'slug-separator' => '-',
    ],

    'permissions-groups' => [
        'table'          => 'permissions_groups',
        'model'          => \Arcanesoft\Auth\Models\PermissionsGroup::class,
        'observer'       => \Arcanesoft\Auth\Models\Observers\PermissionsGroupObserver::class,
        'slug-separator' => '-',
    ],

    'permissions'        => [
        'table'          => 'permissions',
        'model'          => \Arcanesoft\Auth\Models\Permission::class,
        'observer'       => \Arcanesoft\Auth\Models\Observers\PermissionObserver::class,
        'slug-separator' => '.',
    ],

    /* ------------------------------------------------------------------------------------------------
     |  User confirmation
     | ------------------------------------------------------------------------------------------------
     */
    'user-confirmation'  => [
        'enabled'   => true,
        'length'    => 30,
    ],

    /* ------------------------------------------------------------------------------------------------
     |  Throttles
     | ------------------------------------------------------------------------------------------------
     */
    'throttles'          => [
        'enabled' => true,
        'table'   => 'throttles',
    ],

    /* ------------------------------------------------------------------------------------------------
     |  Seeds
     | ------------------------------------------------------------------------------------------------
     */
    'seeds'              => [
        'users' => [
            [
                'username'   => 'admin',
                'email'      => env('ADMIN_USER_EMAIL', 'admin@email.com'),
                'password'   => env('ADMIN_USER_PASSWORD', 'password'),
            ],
        ],
    ],

    /* ------------------------------------------------------------------------------------------------
     |  Other stuff
     | ------------------------------------------------------------------------------------------------
     */
    'use-observers'      => true,
];
