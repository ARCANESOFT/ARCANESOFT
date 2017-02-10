<?php namespace App\Http\Routes\Auth;

use Arcanedev\Support\Routing\RouteRegistrar;

/**
 * Class     RegisterRoutes
 *
 * @package  App\Http\Routes\Auth
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class RegisterRoutes extends RouteRegistrar
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
            $this->prefix('register')->name('register.')->group(function () {
                $this->get('/', 'RegisterController@showRegistrationForm')->name('get'); // auth::register.get

                $this->post('/', 'RegisterController@register')->name('post'); // auth::register.post

                $this->get('confirm/{code}', 'RegisterController@confirm')->name('confirm'); // auth::register.confirm
            });
        }
    }

    /* -----------------------------------------------------------------
     |  Other Methods
     | -----------------------------------------------------------------
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
