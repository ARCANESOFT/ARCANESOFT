<?php namespace App\Http\Routes\Auth;

use Arcanedev\Support\Routing\RouteRegistrar;

/**
 * Class     PasswordResetRoutes
 *
 * @package  App\Http\Routes\Auth
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class PasswordResetRoutes extends RouteRegistrar
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
        if ($this->isEnabled()) {
            $this->prefix('password')->name('password.')->group(function () {
                $this->get('reset', 'ForgotPasswordController@showLinkRequestForm')->name('get'); // auth::password.get

                $this->post('email', 'ForgotPasswordController@sendResetLinkEmail')->name('email'); // auth::password.email

                $this->get('reset/{token}', 'ResetPasswordController@showResetForm')->name('token'); // auth::password.token

                $this->post('reset', 'ResetPasswordController@reset')->name('post'); // auth::password.post
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
        return config('arcanesoft.auth.authentication.password-reset.enabled', false);
    }
}
