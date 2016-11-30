<?php

return [
    /* ------------------------------------------------------------------------------------------------
     |  Environments
     | ------------------------------------------------------------------------------------------------
     | The allowed environments to register the DevServiceProvider.
     */
    'environments' => ['local', 'testing'],

    /* ------------------------------------------------------------------------------------------------
     |  Autoloaded Service Providers
     | ------------------------------------------------------------------------------------------------
     */
    'providers' => [
        Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider::class,
        Barryvdh\Debugbar\ServiceProvider::class,
    ],
];