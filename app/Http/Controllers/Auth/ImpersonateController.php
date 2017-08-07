<?php namespace App\Http\Controllers\Auth;

use Arcanedev\LaravelImpersonator\Contracts\Impersonator;

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
     * @param  \Arcanedev\LaravelImpersonator\Contracts\Impersonator  $impersonator
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function stop(Impersonator $impersonator)
    {
        if ( ! $impersonator->isImpersonating())
            self::pageNotFound();

        $impersonator->stop();

        return redirect()->route('public::home');
    }
}
