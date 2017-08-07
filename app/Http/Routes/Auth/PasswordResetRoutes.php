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
            $this->prefix('password')->name('password.')->group(function () {
                $this->get('reset', 'ForgotPasswordController@showLinkRequestForm')
                     ->name('request'); // auth::password.request

                $this->post('email', 'ForgotPasswordController@sendResetLinkEmail')
                     ->name('email'); // auth::password.email

                $this->get('reset/{token}', 'ResetPasswordController@showResetForm')
                     ->name('reset'); // auth::password.reset

                $this->post('reset', 'ResetPasswordController@reset')
                     ->name('process'); // auth::password.reset
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
        return config('arcanesoft.auth.authentication.password-reset.enabled', false);
    }
}
