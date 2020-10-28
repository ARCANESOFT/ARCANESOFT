<?php

declare(strict_types=1);

namespace Api\Providers;

use Api\Http\Routes\ApiRoutes;
use Arcanedev\Support\Routing\Concerns\RegistersRouteClasses;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;

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
     * @return string[]|array
     */
    protected function getRouteClasses(): array
    {
        return [
            ApiRoutes::class,
        ];
    }

    /**
     * Define your route model bindings, pattern filters, etc.
     */
    public function boot(): void
    {
        $this->registerMiddleware($this->app['router']);

        // Register the limiters
        $this->configureRateLimiting();

        // Bind the routes
        static::bindRouteClasses($this->getRouteClasses());

        // Map Routes
        $this->routes(function (): void {
            $this->mapRoutes();
        });
    }

    /* -----------------------------------------------------------------
     |  Other Methods
     | -----------------------------------------------------------------
     */

    /**
     * Register middleware classes.
     *
     * @param  \Illuminate\Routing\Router  $router
     */
    protected function registerMiddleware($router): void
    {
        foreach ((array) config('api.middleware-group') as $group => $middleware) {
            $router->middlewareGroup($group, $middleware);
        }
    }

    /**
     * Define the "api" routes for the application.
     *
     * These routes are typically stateless.
     */
    protected function mapRoutes(): void
    {
        $this->middleware(['api'])->prefix('api')->group(function (): void {
            static::mapRouteClasses($this->getRouteClasses());

            $this->loadRoutesFrom(base_path('routes/api.php'));
        });
    }

    /**
     * Configure the rate limiters for the application.
     */
    protected function configureRateLimiting(): void
    {
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)
                ->by(optional($request->user())->id ?: $request->ip());
        });
    }
}
