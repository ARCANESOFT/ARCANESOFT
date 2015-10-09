<?php namespace App\Http\Routes;

use Arcanedev\Support\Bases\RouteRegister;
use Illuminate\Contracts\Routing\Registrar;

/**
 * Class     AuthRoute
 *
 * @package  App\Http\Routes
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class AuthRoute extends RouteRegister
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
        parent::map($router);

        $this->registerLoginAndLogoutRoutes();
    }

    /* ------------------------------------------------------------------------------------------------
     |  Auth Routes
     | ------------------------------------------------------------------------------------------------
     */
    /**
     * Register login and logout routes.
     */
    private function registerLoginAndLogoutRoutes()
    {
        $this->group(['prefix' => 'login'], function () {
            $this->get('/', [
                'as'     => 'login.get',
                'uses'   => function() {
                    return 'Login form';
                }
            ]);

            $this->post('/', [
                'as'     => 'login.post',
                'uses'   => function() {
                    return 'Login form';
                }
            ]);
        });

        $this->get('logout', [
            'as'     => 'logout',
            'uses'   => function() {
                return 'Logout';
            }
        ]);
    }
}
