<?php

return [
    /* ------------------------------------------------------------------------------------------------
     |  Default Queue Driver
     | ------------------------------------------------------------------------------------------------
     |  Supported: 'null', 'sync', 'database', 'beanstalkd', 'sqs', 'iron', redis'
     */
    'default' => env('QUEUE_DRIVER', 'sync'),

    /* ------------------------------------------------------------------------------------------------
     |  Queue Connections
     | ------------------------------------------------------------------------------------------------
     */
    'connections' => [
        'sync' => [
            'driver' => 'sync',
        ],

        'database'  => [
            'driver'     => 'database',
            'table'      => 'jobs',
            'queue'      => 'default',
            'expire'     => 60,
        ],

        'beanstalkd' => [
            'driver'     => 'beanstalkd',
            'host'       => 'localhost',
            'queue'      => 'default',
            'ttr'        => 60,
        ],

        'sqs'       => [
            'driver'     => 'sqs',
            'key'        => 'your-public-key',
            'secret'     => 'your-secret-key',
            'queue'      => 'your-queue-url',
            'region'     => 'us-east-1',
        ],

        'iron'      => [
            'driver'     => 'iron',
            'host'       => 'mq-aws-us-east-1.iron.io',
            'token'      => 'your-token',
            'project'    => 'your-project-id',
            'queue'      => 'your-queue-name',
            'encrypt'    => true,
        ],

        'redis'     => [
            'driver'     => 'redis',
            'connection' => 'default',
            'queue'      => 'default',
            'expire'     => 60,
        ],
    ],

    /* ------------------------------------------------------------------------------------------------
     |  Failed Queue Jobs
     | ------------------------------------------------------------------------------------------------
     */
    'failed'    => [
        'database'  => 'mysql',
        'table'     => 'failed_jobs',
    ],
];
