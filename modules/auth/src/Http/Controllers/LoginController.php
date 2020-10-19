<?php

declare(strict_types=1);

namespace Authentication\Http\Controllers;

use App\Http\Routes\PagesRoutes;
use Arcanesoft\Foundation\Auth\Auth;
use Arcanesoft\Foundation\Authentication\Concerns\UseUserGuard;
use Arcanesoft\Foundation\Fortify\Http\Controllers\LoginController as Controller;
use Authentication\Actions\Login\AttemptToAuthenticate;
use Authentication\Actions\Login\EnsureLoginIsNotThrottled;
use Authentication\Actions\Login\PrepareAuthenticatedSession;
use Authentication\Actions\Login\RedirectIfTwoFactorWasEnabled;
use Authentication\Http\Requests\LoginRequest;
use Illuminate\Http\{Request, Response};

/**
 * Class     LoginController
 *
 * @package  App\Http\Controllers\Authentication
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class LoginController extends Controller
{
    /* -----------------------------------------------------------------
     |  Traits
     | -----------------------------------------------------------------
     */

    use UseUserGuard;

    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
     */

    /**
     * Show the login view.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \Illuminate\Contracts\View\View
     */
    public function create(Request $request)
    {
        abort_unless(Auth::isLoginEnabled(), Response::HTTP_NOT_FOUND);

        return view('auth::login');
    }

    /**
     * Attempt to authenticate a new session.
     *
     * @param  \Authentication\Http\Requests\LoginRequest  $request
     *
     * @return mixed
     */
    public function store(LoginRequest $request)
    {
        return $this->login($request, [
            EnsureLoginIsNotThrottled::class,
            RedirectIfTwoFactorWasEnabled::class,
            AttemptToAuthenticate::class,
            PrepareAuthenticatedSession::class,
        ]);
    }

    /**
     * Destroy an authenticated session.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        return $this->logout($request);
    }

    /* -----------------------------------------------------------------
     |  Other Methods
     | -----------------------------------------------------------------
     */

    /**
     * Get the redirect url after user was authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return string
     */
    protected function redirectUrlAfterLogin(Request $request): string
    {
        return PagesRoutes::home();
    }

    /**
     * Get the redirect url after user was logout.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return string
     */
    protected function redirectUrlAfterLogout(Request $request): string
    {
        return PagesRoutes::index();
    }
}
