<?php

return [

    /* -----------------------------------------------------------------
     |  HTTP
     | -----------------------------------------------------------------
     */

    'middleware-group' => [

        'api' => [
            'throttle:api',
            Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],

    ],

];
