<?php namespace App\Http\Routes\Auth;

use Arcanedev\Support\Routing\RouteRegistrar;

/**
 * Class     SocialiteRoutes
 *
 * @package  App\Http\Routes\Auth
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class SocialiteRoutes extends RouteRegistrar
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
        $this->prefix('social/{social_provider}')
             ->name('social.')
             ->group(function () {
                $this->get('/', 'SocialAuthController@redirectToProvider')
                     ->name('redirect'); // auth::social.redirect

                $this->get('callback', 'SocialAuthController@handleCallback')
                     ->name('callback'); // auth::social.callback
             });
    }
}
