<?php

// ini_set('xdebug.max_nesting_level', 120);

define('LARAVEL_START', microtime(true));

/* ------------------------------------------------------------------------------------------------
 |  Register The Composer Auto Loader
 | ------------------------------------------------------------------------------------------------
 */
require __DIR__ . '/../vendor/autoload.php';

/* ------------------------------------------------------------------------------------------------
 |  Include The Compiled Class File
 | ------------------------------------------------------------------------------------------------
 */
$compiledPath = __DIR__ . '/cache/compiled.php';

if (file_exists($compiledPath)) {
    require $compiledPath;
}
