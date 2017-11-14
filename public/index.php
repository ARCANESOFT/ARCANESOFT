<?php

/**
 * To fix the `Maximum function nesting level of '100' reached, aborting!` uncomment the line below
 * Or add to your php.ini file this line `xdebug.max_nesting_level = 500`
 */
// ini_set('xdebug.max_nesting_level', 500);

define('LARAVEL_START', microtime(true));

/* -----------------------------------------------------------------
 |  Register The Auto Loader
 | -----------------------------------------------------------------
 */

require __DIR__.'/../vendor/autoload.php';

/* -----------------------------------------------------------------
 |  Turn On The Lights
 | -----------------------------------------------------------------
 */

/** @var  \Illuminate\Contracts\Foundation\Application  $app */
$app = require_once __DIR__.'/../bootstrap/app.php';

/* -----------------------------------------------------------------
 |  Run The Application
 | -----------------------------------------------------------------
 */

/** @var  Illuminate\Contracts\Http\Kernel  $kernel */
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

$response = $kernel->handle(
    $request = Illuminate\Http\Request::capture()
);

$response->send();

$kernel->terminate($request, $response);
