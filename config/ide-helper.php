<?php

return [
    /* ------------------------------------------------------------------------------------------------
     |  Filename & Format
     | ------------------------------------------------------------------------------------------------
     */
    'filename'  => '_ide_helper',
    'format'    => 'php',

    /* ------------------------------------------------------------------------------------------------
     |  Helper files to include
     | ------------------------------------------------------------------------------------------------
     */
    'include_helpers' => false,

    'helper_files' => [
        base_path('vendor/laravel/framework/src/Illuminate/Support/helpers.php'),
    ],

    /* ------------------------------------------------------------------------------------------------
     |  Model locations to include
     | ------------------------------------------------------------------------------------------------
     */
    'model_locations' => [
        'app/Models',
    ],

    /* ------------------------------------------------------------------------------------------------
     |  Extra classes
     | ------------------------------------------------------------------------------------------------
     */
    'extra' => [
        'Eloquent' => [
            'Illuminate\Database\Eloquent\Builder',
            'Illuminate\Database\Query\Builder'
        ],
        'Session' => [
            'Illuminate\Session\Store'
        ],
    ],

    'magic' => [
        'Log' => [
            'debug'     => 'Monolog\Logger::addDebug',
            'info'      => 'Monolog\Logger::addInfo',
            'notice'    => 'Monolog\Logger::addNotice',
            'warning'   => 'Monolog\Logger::addWarning',
            'error'     => 'Monolog\Logger::addError',
            'critical'  => 'Monolog\Logger::addCritical',
            'alert'     => 'Monolog\Logger::addAlert',
            'emergency' => 'Monolog\Logger::addEmergency',
        ]
    ],

    /* ------------------------------------------------------------------------------------------------
     |  Interface implementations
     | ------------------------------------------------------------------------------------------------
     */
    'interfaces' => [
        '\Illuminate\Contracts\Auth\Authenticatable' => config('auth.model', App\Models\User::class),
    ],

    /* ------------------------------------------------------------------------------------------------
     |  Support for custom DB types
     | ------------------------------------------------------------------------------------------------
     |  Supported : 'postgresql', 'db2', 'drizzle', 'mysql', 'oracle', 'sqlanywhere', 'sqlite', 'mssql'
     */
    'custom_db_types' => [
        //
    ],
];
