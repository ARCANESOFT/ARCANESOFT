<?php namespace App\Http\Routes\Auth;

use Arcanedev\Support\Routing\RouteRegistrar;

/**
 * Class     AuthenticationRoutes
 *
 * @package  App\Http\Routes\Auth
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class AuthenticationRoutes extends RouteRegistrar
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
        if ($this->isEnabled()) {
            $this->prefix('login')->name('login.')->group(function () {
                $this->get('/', 'LoginController@showLoginForm')->name('get'); // auth::login.get
                $this->post('/', 'LoginController@login')->name('post'); // auth::login.post
            });

            $this->post('logout', 'LoginController@logout')->name('logout'); // auth::logout
        }
    }

    /* ------------------------------------------------------------------------------------------------
     |  Other Methods
     | ------------------------------------------------------------------------------------------------
     */
    /**
     * Check if enabled.
     *
     * @return bool
     */
    protected function isEnabled()
    {
        return config('arcanesoft.auth.authentication.login-logout.enabled', false);
    }
}
