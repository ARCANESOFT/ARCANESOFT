<?php

declare(strict_types=1);

namespace Arcanesoft\Demo\Http\Controllers;

/**
 * Class     ComponentsController
 *
 * @package  Arcanesoft\Demo\Http\Controllers
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class ComponentsController
{
    public function show(string $name)
    {
        return view("demo::components.{$name}");
    }
}
