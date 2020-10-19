<?php

declare(strict_types=1);

namespace App\Providers;

use App\Http\Routes;
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
            // Public
            Routes\PagesRoutes::class,

            // Account
            Routes\AccountRoutes::class,
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
            $this->mapRoutes();
        });
    }

    /* -----------------------------------------------------------------
     |  Other Methods
     | -----------------------------------------------------------------
     */

    /**
     * Define the "web" routes for the application.
     *
     * These routes all receive session state, CSRF protection, etc.
     */
    protected function mapRoutes(): void
    {
        $this->middleware(['web'])->group(function (): void {
            static::mapRouteClasses($this->getRouteClasses());

            $this->loadRoutesFrom(base_path('routes/web.php'));
        });
    }

    /**
     * Configure the rate limiters for the application.
     */
    protected function configureRateLimiting(): void
    {
        //
    }
}
