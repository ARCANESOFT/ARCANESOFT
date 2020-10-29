<?php

declare(strict_types=1);

namespace Authentication\Http\Controllers;

use Arcanesoft\Foundation\Fortify\Auth\ResetsPasswords;
use Authentication\Http\Requests\ResetPasswordRequest;
use Authentication\Http\Routes\LoginRoutes;
use Illuminate\Http\Request;

/**
 * Class     ResetPasswordController
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class ResetPasswordController
{
    /* -----------------------------------------------------------------
     |  Traits
     | -----------------------------------------------------------------
     */

    use ResetsPasswords;

    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
     */

    /**
     * Show the new password view.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \Illuminate\View\View
     */
    public function edit(Request $request)
    {
        return view()->make('auth::passwords.reset', [
            'token' => $request->route('token'),
            'email' => $request->input('email'),
        ]);
    }

    /**
     * Reset the user's password.
     *
     * @param  \Authentication\Http\Requests\ResetPasswordRequest  $request
     *
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse
     */
    public function update(ResetPasswordRequest $request)
    {
        return $this->resetPassword($request, $request->validated());
    }

    /* -----------------------------------------------------------------
     |  Other Methods
     | -----------------------------------------------------------------
     */

    /**
     * Get the password broker's driver.
     *
     * @return string|null
     */
    protected static function getBrokerDriver(): string
    {
        return 'users';
    }

    /**
     * Get the redirect url.
     *
     * @return string
     */
    protected function getRedirectUrl(): string
    {
        return route(LoginRoutes::LOGIN_CREATE);
    }
}
