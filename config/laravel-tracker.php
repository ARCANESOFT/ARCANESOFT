<?php

use Arcanedev\LaravelTracker\Models;

return [
    /* ------------------------------------------------------------------------------------------------
     |  Enabled
     | ------------------------------------------------------------------------------------------------
     */
    'enabled' => false,

    /* ------------------------------------------------------------------------------------------------
     |  Database
     | ------------------------------------------------------------------------------------------------
     */
    'database' => [
        'connection' => null,

        'prefix'     => 'tracker_',
    ],

    /* ------------------------------------------------------------------------------------------------
     |  Models
     | ------------------------------------------------------------------------------------------------
     */
    'models' => [
        Models\AbstractModel::MODEL_AGENT                => Models\Agent::class,
        Models\AbstractModel::MODEL_COOKIE               => Models\Cookie::class,
        Models\AbstractModel::MODEL_DEVICE               => Models\Device::class,
        Models\AbstractModel::MODEL_DOMAIN               => Models\Domain::class,
        Models\AbstractModel::MODEL_ERROR                => Models\Error::class,
        Models\AbstractModel::MODEL_GEOIP                => Models\GeoIp::class,
        Models\AbstractModel::MODEL_LANGUAGE             => Models\Language::class,
        Models\AbstractModel::MODEL_PATH                 => Models\Path::class,
        Models\AbstractModel::MODEL_QUERY                => Models\Query::class,
        Models\AbstractModel::MODEL_REFERER              => Models\Referer::class,
        Models\AbstractModel::MODEL_REFERER_SEARCH_TERM  => Models\RefererSearchTerm::class,
        Models\AbstractModel::MODEL_ROUTE                => Models\Route::class,
        Models\AbstractModel::MODEL_ROUTE_PATH           => Models\RoutePath::class,
        Models\AbstractModel::MODEL_ROUTE_PATH_PARAMETER => Models\RoutePathParameter::class,
        Models\AbstractModel::MODEL_SESSION              => Models\Session::class,
        Models\AbstractModel::MODEL_SESSION_ACTIVITY     => Models\SessionActivity::class,
        Models\AbstractModel::MODEL_USER                 => App\Models\User::class,
    ],

    /* ------------------------------------------------------------------------------------------------
     |  Tracking
     | ------------------------------------------------------------------------------------------------
     */
    'tracking' => [
        'cookies'      => true,
        'devices'      => true,
        'errors'       => true,
        'geoip'        => true,
        'languages'    => true,
        'paths'        => true,
        'path-queries' => true,
        'referers'     => true,
        'users'        => true,
        'user-agents'  => true,
    ],

    /* ------------------------------------------------------------------------------------------------
     |  Auth
     | ------------------------------------------------------------------------------------------------
     */
    'auth' => [
        'bindings' => ['auth'],

        'methods'  => [
            'check' => 'check', // The auth `check` method
            'user'  => 'user',  // The auth `user` method
        ],

        'columns'  => [
            'id'     => 'id',
            'custom' => 'email',
        ],
    ],

    /* ------------------------------------------------------------------------------------------------
     |  Cookie
     | ------------------------------------------------------------------------------------------------
     */
    'cookie' => [
        /**
         * A cookie may be created on your visitor device, so you can have
         * information on everything made using that device on your site.
         */
        'name' => null
    ],

    /* ------------------------------------------------------------------------------------------------
     |  Session
     | ------------------------------------------------------------------------------------------------
     */
    'session' => [
        'name' => 'tracker_session'
    ],

    /* ------------------------------------------------------------------------------------------------
     |  Routes
     | ------------------------------------------------------------------------------------------------
     */
    'routes' => [
        'ignore' => [
            'names' => [
                // route names like 'blog.*'
            ],
            'uris'  => [
                // URIs like 'admin', 'admin/*' (both to ignore uri starting with `admin`)
                'dashboard', 'dashboard/*'
            ],
        ],

        'model-columns' => ['id'],
    ],
];
