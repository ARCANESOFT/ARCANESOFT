<?php namespace App\Http\Routes;

use Arcanedev\Support\Bases\RouteRegister;
use Illuminate\Contracts\Routing\Registrar;

/**
 * Class     ContactRoute
 *
 * @package  App\Http\Routes
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class ContactRoute extends RouteRegister
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
        $this->group(['prefix' => 'contact'], function () {
            $this->get('/', [
                'as'    => 'contact.get',
                'uses'  => 'ContactController@getForm'
            ]);

            $this->post('/', [
                'as'    => 'contact.post',
                'uses'  => 'ContactController@postForm'
            ]);
        });
    }
}
