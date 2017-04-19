<?php namespace App\Http\Controllers\Auth;

use Arcanedev\LaravelAuth\Services\UserImpersonator;

/**
 * Class     ImpersonateController
 *
 * @package  Arcanesoft\Auth\Http\Controllers\Front
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class ImpersonateController extends AuthController
{
    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
     */

    /**
     * Stop the impersonation.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function stop()
    {
        if ( ! UserImpersonator::isImpersonating())
            self::pageNotFound();

        UserImpersonator::stop();

        return redirect()->route('public::home');
    }
}
