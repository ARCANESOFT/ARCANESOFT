<?php namespace App\Providers;

use App\Http\Routes;
use Arcanedev\LaravelAuth\Services\SocialAuthenticator;
use Arcanedev\Support\Providers\RouteServiceProvider as ServiceProvider;

/**
 * Class     RouteServiceProvider
 *
 * @package  App\Providers
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class RouteServiceProvider extends ServiceProvider
{
    /* -----------------------------------------------------------------
     |  Properties
     | -----------------------------------------------------------------
     */

    /**
     * This namespace is applied to your controller routes.
     *
     * In addition, it is set as the URL generator's root namespace.
     *
     * @var string
     */
    protected $namespace = 'App\\Http\\Controllers';

    /**
     * The web middlewares.
     *
     * @var array
     */
    protected $webMiddlewares = [
        'web',
//        'tracking',
//        'impersonate',
    ];

    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
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
        $this->mapWebRoutes();
        $this->mapAuthRoutes();
        $this->mapApiRoutes();

        //
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
    protected function mapWebRoutes()
    {
        $this->middleware($this->webMiddlewares)
             ->group(function () {
                 $this->namespace($this->namespace)->group(function () {
                     Routes\Front\PagesRoutes::register();
                     Routes\Front\ProfileRoutes::register();

                     require base_path('routes/web.php');
                 });

                 \Arcanesoft\Blog\Blog::routes();
             });
    }

    /**
     * Define the auth routes for the application.
     */
    protected function mapAuthRoutes()
    {
        $this->middleware($this->webMiddlewares)
             ->namespace($this->namespace.'\\Auth')
             ->prefix('auth')
             ->as('auth::')
             ->group(function () {
                 Routes\Auth\AuthenticationRoutes::register();
                 Routes\Auth\RegisterRoutes::register();
                 Routes\Auth\PasswordResetRoutes::register();

                 if (impersonator()->isEnabled())
                     Routes\Auth\ImpersonateRoutes::register();

                 if (SocialAuthenticator::isEnabled())
                     Routes\Auth\SocialiteRoutes::register();
             });
    }

    /**
     * Define the "api" routes for the application.
     *
     * These routes are typically stateless.
     */
    protected function mapApiRoutes()
    {
        $this->middleware('api')
             ->namespace($this->namespace)
             ->prefix('api')
             ->as('api::')
             ->group(function () {
                 require base_path('routes/api.php');
             });
    }
}
