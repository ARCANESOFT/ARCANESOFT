<?php namespace App\Http\Routes\Auth;

use Arcanedev\Support\Bases\RouteRegister;
use Illuminate\Contracts\Routing\Registrar;

/**
 * Class     SocialiteRoutes
 *
 * @package  App\Http\Routes\Auth
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class SocialiteRoutes extends RouteRegister
{
    /* ------------------------------------------------------------------------------------------------
     |  Main Functions
     | ------------------------------------------------------------------------------------------------
     */
    /**
     * Map routes.
     *
     * @param  \Illuminate\Contracts\Routing\Registrar $router
     */
    public function map(Registrar $router)
    {
        $this->group(['prefix' => 'social/{social_provider}', 'as' => 'social.'], function () {
            $this->get('/', 'SocialAuthController@redirectToProvider')->name('redirect'); // auth::social.redirect

            $this->get('callback', 'SocialAuthController@handleCallback')->name('callback'); // auth::social.callback
        });
    }
}
