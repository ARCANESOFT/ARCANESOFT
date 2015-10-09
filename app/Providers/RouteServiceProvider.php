<?php namespace App\Providers;

use App\Http\Routes\AuthRoute;
use App\Http\Routes\ContactRoute;
use App\Http\Routes\PagesRoute;
use Illuminate\Routing\Router;
use App\Bases\Providers\RouteServiceProvider as ServiceProvider;

/**
 * Class RouteServiceProvider
 * @package App\Providers
 */
class RouteServiceProvider extends ServiceProvider
{
    /* ------------------------------------------------------------------------------------------------
     |  Properties
     | ------------------------------------------------------------------------------------------------
     */
    /**
     * This namespace is applied to the controller routes in your routes file.
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
     *
     * @param  Router  $router
     */
    public function boot(Router $router)
    {
        parent::boot($router);
    }

    /**
     * Define the routes for the application.
     *
     * @param  Router  $router
     */
    public function map(Router $router)
    {
        $this->registerPublicRoutes($router);
        $this->registerAuthRoutes($router);
    }

    /* ------------------------------------------------------------------------------------------------
     |  Route register Functions
     | ------------------------------------------------------------------------------------------------
     */
    /**
     * Register public routes.
     *
     * @param  Router  $router
     */
    private function registerPublicRoutes(Router $router)
    {
        $attributes = [
            'as'        => 'public::',
            'namespace' => $this->namespace,
        ];

        $router->group($attributes, function (Router $router) {
            (new PagesRoute)->map($router);
            (new ContactRoute)->map($router);

            // the old Fashion way...
            require app_path('Http/routes.php');
        });
    }

    /**
     * Register auth routes.
     *
     * @param  Router  $router
     */
    private function registerAuthRoutes(Router $router)
    {
        $attributes = [
            'prefix'    => 'auth',
            'as'        => 'auth::',
        ];

        $router->group($attributes, function(Router $router) {
            (new AuthRoute)->map($router);
        });
    }
}
