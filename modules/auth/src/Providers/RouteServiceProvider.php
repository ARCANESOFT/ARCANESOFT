<?php

declare(strict_types=1);

namespace Authentication\Providers;

use Arcanedev\Support\Routing\Concerns\RegistersRouteClasses;
use Authentication\Http\Routes;
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
            Routes\ConfirmPasswordRoutes::class,
            Routes\EmailVerificationRoutes::class,
            Routes\ImpersonationRoutes::class,
            Routes\LoginRoutes::class,
            Routes\PasswordResetRoutes::class,
            Routes\RegisterRoutes::class,
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
     * Configure the rate limiters for the application.
     */
    protected function configureRateLimiting(): void
    {
        //
    }

    /**
     * Define the auth routes for the application.
     *
     * These routes all receive session state, CSRF protection, etc.
     */
    protected function mapRoutes(): void
    {
        $this->prefix('auth')
             ->name('auth::')
             ->middleware(['web'])
             ->group(function (): void {
                 static::mapRouteClasses($this->getRouteClasses());

                 $this->loadRoutesFrom(dirname(__DIR__, 2).'/routes/auth.php');
             });
    }
}
