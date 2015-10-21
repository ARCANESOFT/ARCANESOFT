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
     * Define the routes for the application.
     *
     * @param  Router  $router
     */
    public function map(Router $router)
    {
        $attributes = [
            'as'        => 'public::',
            'namespace' => $this->namespace,
        ];

        $router->group($attributes, function (Router $router) {
            (new PagesRoute)->map($router);
            (new ContactRoute)->map($router);

            require app_path('Http/routes.php');
        });
    }
}
