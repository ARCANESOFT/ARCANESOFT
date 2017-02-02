<?php namespace App\Providers;

use App\Http\Routes;
use Arcanedev\LaravelAuth\Services\SocialAuthenticator;
use Arcanedev\LaravelAuth\Services\UserImpersonator;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Routing\Router;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /* ------------------------------------------------------------------------------------------------
     |  Properties
     | ------------------------------------------------------------------------------------------------
     */
    /**
     * This namespace is applied to your controller routes.
     *
     * In addition, it is set as the URL generator's root namespace.
     *
     * @var string
     */
    protected $namespace = 'App\\Http\\Controllers';

    /* ------------------------------------------------------------------------------------------------
     |  Main Functions
     | ------------------------------------------------------------------------------------------------
     */
    /**
     * Define your route model bindings, pattern filters, etc.
     */
    public function boot()
    {
        //

        parent::boot();
    }

    /**
     * Define the routes for the application.
     */
    public function map()
    {
        $this->mapApiRoutes();

        $this->mapWebRoutes();

        $this->mapAuthRoutes();

        //
    }

    /* ------------------------------------------------------------------------------------------------
     |  Other Functions
     | ------------------------------------------------------------------------------------------------
     */
    /**
     * Define the "web" routes for the application.
     *
     * These routes all receive session state, CSRF protection, etc.
     */
    protected function mapWebRoutes()
    {
        Route::middleware(['web', 'impersonate', 'tracking'])
             ->namespace($this->namespace)
             ->group(function ($router) {
                 Routes\Front\PagesRoutes::register($router);
                 Routes\Front\ProfileRoutes::register($router);

                 require_once base_path('routes/web.php');
             });
    }

    /**
     * Define the "api" routes for the application.
     *
     * These routes are typically stateless.
     */
    protected function mapApiRoutes()
    {
        Route::middleware('api')
             ->namespace($this->namespace)
             ->prefix('api')
             ->group(base_path('routes/api.php'));
    }

    /**
     * Define the auth routes for the application.
     */
    private function mapAuthRoutes()
    {
        $attributes = [
            'prefix'     => 'auth',
            'as'         => 'auth::',
            'namespace'  => $this->namespace.'\\Auth',
            'middleware' => ['web', 'impersonate', 'tracking'],
        ];

        Route::group($attributes, function (Router $router) {
            Routes\Auth\AuthenticationRoutes::register($router);
            Routes\Auth\RegisterRoutes::register($router);
            Routes\Auth\PasswordResetRoutes::register($router);

            if (UserImpersonator::isEnabled())
                Routes\Auth\ImpersonateRoutes::register($router);

            if (SocialAuthenticator::isEnabled())
                Routes\Auth\SocialiteRoutes::register($router);
        });
    }
}
