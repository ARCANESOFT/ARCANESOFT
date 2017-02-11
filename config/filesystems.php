<?php

return [

    /* ------------------------------------------------------------------------------------------------
     |  Default Filesystem Disk
     | ------------------------------------------------------------------------------------------------
     | Supported: "local", "ftp", "s3", "rackspace"
     */
    'default' => 'local',

    /* ------------------------------------------------------------------------------------------------
     |  Default Cloud Filesystem Disk
     | ------------------------------------------------------------------------------------------------
     */
    'cloud' => 's3',

    /* ------------------------------------------------------------------------------------------------
     |  Filesystem Disks
     | ------------------------------------------------------------------------------------------------
     */
    'disks' => [

        'local'  => [
            'driver' => 'local',
            'root'   => storage_path('app'),
        ],

        'public' => [
            'driver'     => 'local',
            'root'       => storage_path('app/public'),
            'url'        => env('APP_URL').'/storage',
            'visibility' => 'public',
        ],

        's3'     => [
            'driver' => 's3',
            'key'    => env('AWS_KEY'),
            'secret' => env('AWS_SECRET'),
            'region' => env('AWS_REGION'),
            'bucket' => env('AWS_BUCKET'),
        ],

        'backup'  => [
            'driver' => 'local',
            'root'   => storage_path('app/backups'),
        ],
    ],

];
