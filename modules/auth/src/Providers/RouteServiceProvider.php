<?php declare(strict_types=1);

namespace Authentication\Providers;

use Arcanedev\Support\Routing\Concerns\RegistersRouteClasses;
use Arcanesoft\Foundation\Authorization\Auth;
use Authentication\Http\Routes;
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
     * @return array
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
        RateLimiter::for('login', function (Request $request): Limit {
            return Limit::perMinute(5)->by($request->{Auth::username()}.$request->ip());
        });

        RateLimiter::for('two-factor', function (Request $request): Limit {
            return Limit::perMinute(5)->by($request->session()->get('login.id'));
        });
    }

    /**
     * Define the auth routes for the application.
     *
     * These routes all receive session state, CSRF protection, etc.
     */
    protected function mapRoutes(): void
    {
        $this->prefix('auth')->name('auth::')->middleware(['web'])->group(function (): void {
            static::mapRouteClasses($this->getRouteClasses());

            $this->loadRoutesFrom(dirname(__DIR__, 2).'/routes/auth.php');
        });
    }
}
