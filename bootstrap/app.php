<?php

/* -----------------------------------------------------------------
 |  Create The Application
 | -----------------------------------------------------------------
 */

$app = new App\Application(
    $_ENV['APP_BASE_PATH'] ?? dirname(__DIR__)
);

/* -----------------------------------------------------------------
 |  Bind Important Interfaces
 | -----------------------------------------------------------------
 */

$app->singleton(
    Illuminate\Contracts\Http\Kernel::class,
    App\Http\Kernel::class
);

$app->singleton(
    Illuminate\Contracts\Console\Kernel::class,
    App\Console\Kernel::class
);

$app->singleton(
    Illuminate\Contracts\Debug\ExceptionHandler::class,
    App\Exceptions\Handler::class
);

/* -----------------------------------------------------------------
 |  Return The Application
 | -----------------------------------------------------------------
 */

return $app;
