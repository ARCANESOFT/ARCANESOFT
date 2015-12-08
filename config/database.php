<?php

return [

    /* ------------------------------------------------------------------------------------------------
     |  PDO Fetch Style
     | ------------------------------------------------------------------------------------------------
     | http://php.net/manual/en/pdo.constants.php
     */
    'fetch' => PDO::FETCH_CLASS,

    /* ------------------------------------------------------------------------------------------------
     |  Default Database Connection Name
     | ------------------------------------------------------------------------------------------------
     */
    'default' => env('DB_CONNECTION', 'mysql'),

    /* ------------------------------------------------------------------------------------------------
     |  Database Connections
     | ------------------------------------------------------------------------------------------------
     */
    'connections' => [
        'sqlite' => [
            'driver'   => 'sqlite',
            'database' => database_path('database.sqlite'),
            'prefix'   => '',
        ],

        'mysql' => [
            'driver'    => 'mysql',
            'host'      => env('DB_HOST', '127.0.0.1'),
            'database'  => env('DB_DATABASE', 'forge'),
            'username'  => env('DB_USERNAME', 'forge'),
            'password'  => env('DB_PASSWORD', ''),
            'charset'   => 'utf8',
            'collation' => 'utf8_general_ci',
            'prefix'    => '',
            'strict'    => false,
        ],

        'pgsql' => [
            'driver'   => 'pgsql',
            'host'     => env('DB_HOST', 'localhost'),
            'database' => env('DB_DATABASE', 'forge'),
            'username' => env('DB_USERNAME', 'forge'),
            'password' => env('DB_PASSWORD', ''),
            'charset'  => 'utf8',
            'prefix'   => '',
            'schema'   => 'public',
        ],
    ],

    /* ------------------------------------------------------------------------------------------------
     |  Migration Repository Table
     | ------------------------------------------------------------------------------------------------
     */
    'migrations' => 'migrations',

    /* ------------------------------------------------------------------------------------------------
     |  Redis Databases
     | ------------------------------------------------------------------------------------------------
     */
    'redis' => [
        'cluster' => false,

        'default' => [
            'host'     => env('REDIS_HOST', 'localhost'),
            'password' => env('REDIS_PASSWORD', null),
            'port'     => env('REDIS_PORT', 6379),
            'database' => 0,
        ],
    ],
];
