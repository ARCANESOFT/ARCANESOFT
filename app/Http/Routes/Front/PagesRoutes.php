<?php namespace App\Http\Routes\Front;

use Arcanedev\Support\Routing\RouteRegistrar;

/**
 * Class     PagesRoutes
 *
 * @package  App\Http\Routes\Front
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class PagesRoutes extends RouteRegistrar
{
    /* ------------------------------------------------------------------------------------------------
     |  Main Functions
     | ------------------------------------------------------------------------------------------------
     */
    /**
     * Map routes.
     */
    public function map()
    {
        $this->name('public::')->group(function () {
            // public::home
            $this->get('/', 'PagesController@home')->name('home');

            // public::welcome
            $this->get('/welcome', 'PagesController@welcome')->middleware('auth')->name('welcome');
        });

        $this->prefix('api')->group(function () {
            $this->get('test', function () {
                return 'Test';
            });
        });
    }
}
