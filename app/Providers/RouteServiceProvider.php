<?php namespace App\Providers;

use App\Bases\Providers\RouteServiceProvider as ServiceProvider;
use App\Http\Routes\ContactRoute;
use App\Http\Routes\PagesRoute;
use Illuminate\Routing\Router;

/**
 * Class     RouteServiceProvider
 *
 * @package  App\Providers
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
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
     * @param  \Illuminate\Routing\Router  $router
     */
    public function boot(Router $router)
    {
        $this->definePatternFilters($router);

        parent::boot($router);
    }

    /**
     * Define the routes for the application.
     *
     * @param  \Illuminate\Routing\Router  $router
     */
    public function map(Router $router)
    {
        $attributes = [
            'as'        => 'public::',
            'namespace' => $this->namespace,
        ];

        $router->group($attributes, function (Router $router) {
            PagesRoute::register($router);
            ContactRoute::register($router);

            require app_path('Http/routes.php');
        });
    }

    /* ------------------------------------------------------------------------------------------------
     |  Other Functions
     | ------------------------------------------------------------------------------------------------
     */
    /**
     * Define route pattern filters.
     *
     * @param  Router  $router
     */
    private function definePatternFilters(Router $router)
    {
        $router->pattern('id',    '\d+');
        $router->pattern('hash',  '[a-z0-9]+');
        $router->pattern('uuid',  '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}');
        $router->pattern('base',  '[a-zA-Z0-9]+');
        $router->pattern('slug',  '[a-z0-9-]+');
        $router->pattern('token', '[a-z0-9-]+');
    }
}
