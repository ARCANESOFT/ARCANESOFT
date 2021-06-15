<?php

declare(strict_types=1);

namespace Arcanesoft\Demo\Http\Controllers;

/**
 * Class     ContentController
 *
 * @package  Arcanesoft\Demo\Http\Controllers
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class ContentController
{
    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
     */

    public function show(string $name)
    {
        return view("demo::content.{$name}");
    }
}
