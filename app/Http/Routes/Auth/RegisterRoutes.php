<?php namespace App\Http\Routes\Auth;

use Arcanedev\Support\Bases\RouteRegister;
use Illuminate\Contracts\Routing\Registrar;

/**
 * Class     RegisterRoutes
 *
 * @package  App\Http\Routes\Auth
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class RegisterRoutes extends RouteRegister
{
    /* ------------------------------------------------------------------------------------------------
    |  Main Functions
    | ------------------------------------------------------------------------------------------------
    */
    /**
     * Map routes.
     *
     * @param  \Illuminate\Contracts\Routing\Registrar  $router
     */
    public function map(Registrar $router)
    {
        if ($this->isEnabled()) {
            $this->group(['prefix' => 'register', 'as' => 'register.'], function () {
                $this->get('/', 'RegisterController@showRegistrationForm')->name('get'); // auth::register.get

                $this->post('/', 'RegisterController@register')->name('post'); // auth::register.post

                $this->get('confirm/{code}', 'RegisterController@confirm')->name('confirm'); // auth::register.confirm
            });
        }
    }

    /* ------------------------------------------------------------------------------------------------
     |  Other Functions
     | ------------------------------------------------------------------------------------------------
     */
    /**
     * Check if enabled.
     *
     * @return bool
     */
    protected function isEnabled()
    {
        return config('arcanesoft.auth.authentication.register.enabled', false);
    }
}
