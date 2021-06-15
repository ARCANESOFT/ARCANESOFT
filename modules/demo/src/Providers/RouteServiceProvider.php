<?php

namespace Arcanesoft\Demo\Providers;

use Arcanedev\Support\Routing\Concerns\RegistersRouteClasses;
use Arcanesoft\Demo\Http\Routes;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;

/**
 * Class     RouteServiceProvider
 *
 * @package  Arcanesoft\Demo\Providers
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class RouteServiceProvider extends ServiceProvider
{
    /* -----------------------------------------------------------------
     |  Traits
     | -----------------------------------------------------------------
     */

    use RegistersRouteClasses;

    /* -----------------------------------------------------------------
     |  Properties
     | -----------------------------------------------------------------
     */

    protected $routes = [
        Routes\DashboardRoutes::class,
        Routes\ContentRoutes::class,
        Routes\FormsRoutes::class,
        Routes\ComponentsRoutes::class,
    ];

    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
     */

    /**
     * Define your route model bindings, pattern filters, etc.
     */
    public function boot(): void
    {
        parent::boot();

        static::bindRouteClasses($this->routes);
    }

    /**
     * Define the routes for the application.
     */
    public function map(): void
    {
        static::mapRouteClasses($this->routes);

        //
    }
}
