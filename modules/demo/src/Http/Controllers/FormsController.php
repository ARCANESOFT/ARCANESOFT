<?php

declare(strict_types=1);

namespace Arcanesoft\Demo\Http\Controllers;

/**
 * Class     FormsController
 *
 * @package  Arcanesoft\Demo\Http\Controllers
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class FormsController
{
    public function show(string $name)
    {
        return view("demo::forms.{$name}");
    }
}
