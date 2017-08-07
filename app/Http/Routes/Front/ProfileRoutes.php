<?php namespace App\Http\Routes\Front;

use Arcanedev\Support\Routing\RouteRegistrar;

/**
 * Class     ProfileRoutes
 *
 * @package  App\Http\Routes\Front
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class ProfileRoutes extends RouteRegistrar
{
    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
     */
    /**
     * Map routes.
     */
    public function map()
    {
        $this->middleware('auth')
             ->prefix('account')
             ->as('account::')
             ->group(function () {
                 $this->get('/', 'ProfileController@index')
                      ->name('index'); // account::index
             });
    }
}
