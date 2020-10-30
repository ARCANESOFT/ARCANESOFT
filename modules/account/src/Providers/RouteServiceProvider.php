<?php

declare(strict_types=1);

namespace Account\Providers;

use Account\Http\{ApiRoutes, WebRoutes};
use Arcanedev\Support\Routing\Concerns\RegistersRouteClasses;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;

/**
 * Class     RouteServiceProvider
 *
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
     |  Main Methods
     | -----------------------------------------------------------------
     */

    /**
     * Get the route classes.
     *
     * @return string[]
     */
    protected function getRouteClasses(): array
    {
        return [
            WebRoutes::class,
            ApiRoutes::class,
        ];
    }

    /**
     * Define your route model bindings, pattern filters, etc.
     */
    public function boot(): void
    {
        // Register the limiters
        $this->configureRateLimiting();

        // Bind the routes
        static::bindRouteClasses($this->getRouteClasses());

        // Map the routes
        $this->routes(function (): void {
            static::mapRouteClasses($this->getRouteClasses());
        });
    }

    /* -----------------------------------------------------------------
     |  Other Methods
     | -----------------------------------------------------------------
     */

    /**
     * Configure the rate limiters for the application.
     */
    protected function configureRateLimiting(): void
    {
        //
    }
}
