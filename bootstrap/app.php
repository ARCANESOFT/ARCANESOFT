<?php

/* ------------------------------------------------------------------------------------------------
 |  Create The Application
 | ------------------------------------------------------------------------------------------------
 */
$paths = require_once __DIR__ . '/paths.php';
$app   = new Illuminate\Foundation\Application($paths['base']);

/* ------------------------------------------------------------------------------------------------
 |  Bind Important Interfaces
 | ------------------------------------------------------------------------------------------------
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

/* ------------------------------------------------------------------------------------------------
 |  Set the public path to this directory
 | ------------------------------------------------------------------------------------------------
 */
$app->bind('path.public', function() use ($paths) {
    return $paths['public'];
});

/* ------------------------------------------------------------------------------------------------
 |  Return The Application
 | ------------------------------------------------------------------------------------------------
 */
return $app;
