<?php

/**
 * To fix the `Maximum function nesting level of '100' reached, aborting!`
 *   uncomment the line below
 *   Or add to your php.ini file this line `xdebug.max_nesting_level = 500`
 */
// ini_set('xdebug.max_nesting_level', 500);

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
