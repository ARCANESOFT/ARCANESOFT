<?php

use Arcanesoft\Auth\Models\Role;
use Arcanesoft\Auth\Policies;

return [
    'title'       => 'Authorization',
    'name'        => 'auth',
    'icon'        => 'fa fa-fw fa-key',
    'roles'       => [Role::ADMINISTRATOR],
    'permissions' => [],
    'children'    => [
        [
            'title'       => 'Statistics',
            'name'        => 'auth-dashboard',
            'route'       => 'auth::foundation.dashboard',
            'icon'        => 'fa fa-fw fa-bar-chart',
            'roles'       => [Role::ADMINISTRATOR],
            'permissions' => [
                Policies\DashboardPolicy::PERMISSION_STATS
            ],
        ],
        [
            'title'       => 'Users',
            'name'        => 'auth-users',
            'route'       => 'auth::foundation.users.index',
            'icon'        => 'fa fa-fw fa-users',
            'roles'       => [Role::ADMINISTRATOR],
            'permissions' => [
                Policies\UsersPolicy::PERMISSION_LIST,
            ],
        ],
        [
            'title'       => 'Roles',
            'name'        => 'auth-roles',
            'route'       => 'auth::foundation.roles.index',
            'icon'        => 'fa fa-fw fa-lock',
            'roles'       => [Role::ADMINISTRATOR],
            'permissions' => [
                Policies\RolesPolicy::PERMISSION_LIST,
            ],
        ],
        [
            'title'       => 'Permissions',
            'name'        => 'auth-permissions',
            'route'       => 'auth::foundation.permissions.index',
            'icon'        => 'fa fa-fw fa-check-circle',
            'roles'       => [Role::ADMINISTRATOR],
            'permissions' => [
                Policies\PermissionsPolicy::PERMISSION_LIST,
            ],
        ],
        [
            'title'       => 'Password Resets',
            'name'        => 'auth-password-resets',
            'route'       => 'auth::foundation.password-resets.index',
            'icon'        => 'fa fa-fw fa-refresh',
            'roles'       => [Role::ADMINISTRATOR],
            'permissions' => [
                Policies\PasswordResetsPolicy::PERMISSION_LIST,
            ],
        ],
    ],
];
