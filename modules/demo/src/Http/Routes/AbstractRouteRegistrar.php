<?php

declare(strict_types=1);

namespace Arcanesoft\Demo\Http\Routes;

use Arcanedev\Support\Routing\RouteRegistrar;
use Closure;

/**
 * Class     AbstractRouteRegistrar
 *
 * @package  Arcanesoft\Demo\Http\Routes
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
abstract class AbstractRouteRegistrar extends RouteRegistrar
{
    protected function demoGroup(Closure $callback): void
    {
        $this->name('demo::')
             ->prefix('demo')
             ->middleware(['web'])
             ->group($callback);
    }
}
