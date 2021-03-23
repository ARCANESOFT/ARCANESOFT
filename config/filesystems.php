<?php

return [

    /* -----------------------------------------------------------------
     |  Default Filesystem Disk
     | -----------------------------------------------------------------
     */

    'default' => env('FILESYSTEM_DRIVER', 'local'),

    /* -----------------------------------------------------------------
     |  Filesystem Disks
     | -----------------------------------------------------------------
     |  Supported Drivers: "local", "ftp", "sftp", "s3"
     */

    'disks' => [

        'local' => [
            'driver' => 'local',
            'root'   => storage_path('app'),
        ],

        'public' => [
            'driver'     => 'local',
            'root'       => storage_path('app/public'),
            'url'        => env('APP_URL').'/storage',
            'visibility' => 'public',
        ],

        's3' => [
            'driver'   => 's3',
            'key'      => env('AWS_ACCESS_KEY_ID'),
            'secret'   => env('AWS_SECRET_ACCESS_KEY'),
            'region'   => env('AWS_DEFAULT_REGION'),
            'bucket'   => env('AWS_BUCKET'),
            'url'      => env('AWS_URL'),
            'endpoint' => env('AWS_ENDPOINT'),
        ],

    ],

    /* -----------------------------------------------------------------
     |  Symbolic Links
     | -----------------------------------------------------------------
     |  Here you may configure the symbolic links that will be created when the
     |  `storage:link` Artisan command is executed. The array keys should be
     |  the locations of the links and the values should be their targets.
     */

    'links' => [
        public_path('storage') => storage_path('app/public'),
    ],

];
