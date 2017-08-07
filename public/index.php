<?php

/* ------------------------------------------------------------------------------------------------
 |  Register The Auto Loader
 | ------------------------------------------------------------------------------------------------
 */
require __DIR__.'/../bootstrap/autoload.php';

/* ------------------------------------------------------------------------------------------------
 |  Turn On The Lights
 | ------------------------------------------------------------------------------------------------
 */
/** @var  \Illuminate\Contracts\Foundation\Application  $app */
$app = require_once __DIR__.'/../bootstrap/app.php';

/* ------------------------------------------------------------------------------------------------
 |  Run The Application
 | ------------------------------------------------------------------------------------------------
 */
/** @var  Illuminate\Contracts\Http\Kernel  $kernel */
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

$response = $kernel->handle(
    $request = Illuminate\Http\Request::capture()
);

$response->send();

$kernel->terminate($request, $response);
