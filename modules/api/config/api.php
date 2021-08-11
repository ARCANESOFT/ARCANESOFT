<?php

return [

    /* -----------------------------------------------------------------
     |  HTTP
     | -----------------------------------------------------------------
     */

    'middleware-group' => [

        'api' => [
            Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
            'throttle:api',
            Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],

    ],

    /* -----------------------------------------------------------------
     |  Swagger
     | -----------------------------------------------------------------
     */

    'swagger' => [

        'source' => [
            base_path('modules/api/swagger/api-v1.php'),
            base_path('modules/api/src/Http/Controllers'),
        ],

        'options' => [
            'bootstrap' => base_path('modules/api/swagger/constants.php')
        ],

        'output' => [
            'format' => 'yaml',
            'path'   => public_path('swagger'),
        ],
    ],

];
