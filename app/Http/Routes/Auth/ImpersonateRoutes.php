<?php namespace App\Http\Routes\Auth;

use Arcanedev\Support\Routing\RouteRegistrar;

/**
 * Class     ImpersonateRoutes
 *
 * @package  App\Http\Routes\Auth
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class ImpersonateRoutes extends RouteRegistrar
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
        $this->prefix('users/impersonate')
             ->name('users.impersonate.')
             ->group(function () {
                 $this->get('stop', 'ImpersonateController@stop')->name('stop'); // auth::users.impersonate.stop
             });
    }
}
