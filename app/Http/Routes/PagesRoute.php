<?php namespace App\Http\Routes;

use Arcanedev\Support\Bases\RouteRegister;
use Illuminate\Contracts\Routing\Registrar;

/**
 * Class     PagesRoute
 *
 * @package  App\Http\Routes
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class PagesRoute extends RouteRegister
{
    /* ------------------------------------------------------------------------------------------------
     |  Main Functions
     | ------------------------------------------------------------------------------------------------
     */
    /**
     * Map routes.
     *
     * @param  Registrar  $router
     */
    public function map(Registrar $router)
    {
        $this->setRegister($router);

        $this->get('/', [
            'as'    => 'home',
            'uses'  => 'PagesController@index'
        ]);

        $this->get('about-us', [
            'as'    => 'about.us',
            'uses'  => 'PagesController@aboutUs'
        ]);
    }
}
