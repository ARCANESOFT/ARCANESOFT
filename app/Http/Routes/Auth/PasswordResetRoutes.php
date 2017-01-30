<?php namespace App\Http\Routes\Auth;

use Arcanedev\Support\Bases\RouteRegister;
use Illuminate\Contracts\Routing\Registrar;

class PasswordResetRoutes extends RouteRegister
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
            $this->group(['prefix' => 'password', 'as' => 'password.'], function () {
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
