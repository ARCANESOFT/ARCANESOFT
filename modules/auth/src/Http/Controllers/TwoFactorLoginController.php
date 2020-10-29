<?php

declare(strict_types=1);

namespace Authentication\Http\Controllers;

use App\Http\Routes\PagesRoutes;
use Arcanesoft\Foundation\Authentication\Concerns\UseUserGuard;
use Arcanesoft\Foundation\Fortify\Auth\AuthenticatesWithTwoFactorChallenge;
use Authentication\Http\Requests\TwoFactorLoginRequest;
use Authentication\Http\Routes\LoginRoutes;
use Illuminate\Http\Request;

/**
 * Class     TwoFactorLoginController
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class TwoFactorLoginController
{
    /* -----------------------------------------------------------------
     |  Traits
     | -----------------------------------------------------------------
     */

    use AuthenticatesWithTwoFactorChallenge;
    use UseUserGuard;

    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
     */

    /**
     * Show the two factor authentication challenge view.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \Illuminate\View\View|mixed
     */
    public function create(Request $request)
    {
        return $this->form('auth::two-factor-challenge', $request);
    }

    /**
     * Attempt to authenticate a new session using the two factor authentication code.
     *
     * @param  \Authentication\Http\Requests\TwoFactorLoginRequest  $request
     *
     * @return mixed
     */
    public function store(TwoFactorLoginRequest $request)
    {
        return $this->login($request);
    }

    /* -----------------------------------------------------------------
     |  Other Methods
     | -----------------------------------------------------------------
     */

    /**
     * Get the two factor's redirect url after login.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  mixed                     $user
     *
     * @return string
     */
    protected function getRedirectUrlAfterLogin(Request $request, $user): string
    {
        return PagesRoutes::home();
    }

    /**
     * Get the failed two factor's redirect url.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return string
     */
    protected function getFailedTwoFactorRedirectUrl(Request $request): string
    {
        return route(LoginRoutes::LOGIN_CREATE);
    }
}
