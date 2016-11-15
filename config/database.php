<?php

return [

    /* ------------------------------------------------------------------------------------------------
     |  PDO Fetch Style
     | ------------------------------------------------------------------------------------------------
     */
    'fetch' => PDO::FETCH_OBJ,

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
            'database' => env('DB_DATABASE', database_path('database.sqlite')),
            'prefix'   => '',
        ],

        'mysql'  => [
            'driver'    => 'mysql',
            'host'      => env('DB_HOST',     '127.0.0.1'),
            'port'      => env('DB_PORT',     '3306'),
            'database'  => env('DB_DATABASE', 'forge'),
            'username'  => env('DB_USERNAME', 'forge'),
            'password'  => env('DB_PASSWORD', ''),
            'charset'   => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix'    => '',
            'strict'    => true,
            'engine'    => null,
        ],

        'pgsql'  => [
            'driver'   => 'pgsql',
            'host'     => env('DB_HOST',     '127.0.0.1'),
            'port'     => env('DB_PORT',     '5432'),
            'database' => env('DB_DATABASE', 'forge'),
            'username' => env('DB_USERNAME', 'forge'),
            'password' => env('DB_PASSWORD', ''),
            'charset'  => 'utf8',
            'prefix'   => '',
            'schema'   => 'public',
            'sslmode'  => 'prefer',
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
        'client'  => env('REDIS_CLIENT', 'predis'),

        'cluster' => false,

        'default' => [
            'host'     => env('REDIS_HOST', 'localhost'),
            'password' => env('REDIS_PASSWORD', null),
            'port'     => env('REDIS_PORT', 6379),
            'database' => 0,
        ],

    ],

];
