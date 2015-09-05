<?php

return [
    /* ------------------------------------------------------------------------------------------------
     |  Debugbar Settings
     | ------------------------------------------------------------------------------------------------
     */
    'enabled' => null,

    /* ------------------------------------------------------------------------------------------------
     |  Storage settings
     | ------------------------------------------------------------------------------------------------
     */
    'storage' => [
        'enabled'       => true,
        'driver'        => 'file',                   // redis, file, pdo
        'path'          => storage_path('debugbar'), // For file driver
        'connection'    => null,                     // Leave null for default connection (Redis/PDO)
    ],

    /* ------------------------------------------------------------------------------------------------
     |  Vendors
     | ------------------------------------------------------------------------------------------------
     */
    'include_vendors'   => true,

    /* ------------------------------------------------------------------------------------------------
     |  Capture Ajax Requests
     | ------------------------------------------------------------------------------------------------
     */
    'capture_ajax'      => true,

    /* ------------------------------------------------------------------------------------------------
     |  DataCollectors
     | ------------------------------------------------------------------------------------------------
     |  Enable/disable DataCollectors
     */
    'collectors' => [
        'phpinfo'         => true,  // Php version
        'messages'        => true,  // Messages
        'time'            => true,  // Time Datalogger
        'memory'          => true,  // Memory usage
        'exceptions'      => true,  // Exception displayer
        'log'             => true,  // Logs from Monolog (merged in messages if enabled)
        'db'              => true,  // Show database (PDO) queries and bindings
        'views'           => true,  // Views with their data
        'route'           => true,  // Current route information
        'laravel'         => false, // Laravel version and environment
        'events'          => false, // All events fired
        'default_request' => false, // Regular or special Symfony request logger
        'symfony_request' => true,  // Only one can be enabled..
        'mail'            => true,  // Catch mail messages
        'logs'            => false, // Add the latest log messages
        'files'           => false, // Show the included files
        'config'          => false, // Display config settings
        'auth'            => false, // Display Laravel authentication status
        'session'         => true,  // Display session data
    ],

    /* ------------------------------------------------------------------------------------------------
     |  Extra options
     | ------------------------------------------------------------------------------------------------
     */
    'options' => [
        'auth'  => ['show_name' => false],  // Also show the users name/email in the debugbar
        'db'    => [
            'with_params'       => true,    // Render SQL with the parameters substituted
            'timeline'          => false,   // Add the queries to the timeline
            'backtrace'         => false,   // EXPERIMENTAL: Use a backtrace to find the origin of the query in your files.
            'explain' => [                  // EXPERIMENTAL: Show EXPLAIN output on queries
                'enabled' => false,
                'types' => ['SELECT'],      // ['SELECT', 'INSERT', 'UPDATE', 'DELETE'] for MySQL 5.6.3+
            ],
            'hints'             => true,    // Show hints for common mistakes
        ],
        'mail'  => ['full_log'  => false],
        'views' => ['data'      => false],  //Note: Can slow down the application, because the data can be quite large..
        'route' => ['label'     => true],   // show complete route on bar
        'logs'  => ['file'      => null],
    ],

    /* ------------------------------------------------------------------------------------------------
     |  Inject Debugbar in Response
     | ------------------------------------------------------------------------------------------------
     */
    'inject' => true,

    /* ------------------------------------------------------------------------------------------------
     |  DebugBar route prefix
     | ------------------------------------------------------------------------------------------------
     */
    'route_prefix' => '_debugbar',
];
