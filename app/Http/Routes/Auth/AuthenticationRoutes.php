<?php namespace App\Http\Routes\Auth;

use Arcanedev\Support\Bases\RouteRegister;
use Illuminate\Contracts\Routing\Registrar;

class AuthenticationRoutes extends RouteRegister
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
            $this->mapLoginRoutes();
            $this->mapLogoutRoute();
        }
    }

    /**
     * Map the login routes.
     */
    protected function mapLoginRoutes()
    {
        $this->group([
            'prefix' => 'login',
            'as'     => 'login.',
        ], function () {
            $this->get('/', 'LoginController@showLoginForm')->name('get'); // auth::login.get
            $this->post('/', 'LoginController@login')->name('post'); // auth::login.post
        });
    }

    /**
     * Map the logout routes
     */
    protected function mapLogoutRoute()
    {
        $this->get('logout', 'LoginController@logout')->name('logout'); // auth::logout
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
        return config('arcanesoft.auth.authentication.login-logout.enabled', false);
    }
}
