<?php

declare(strict_types=1);

namespace Authentication\Http\Controllers;

use App\Http\Routes\PagesRoutes;
use Arcanesoft\Foundation\Authentication\Concerns\UseUserGuard;
use Arcanesoft\Foundation\Fortify\Auth\ConfirmsPasswords;
use Illuminate\Http\Request;

/**
 * Class     ConfirmPasswordController
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class ConfirmPasswordController
{
    /* -----------------------------------------------------------------
     |  Traits
     | -----------------------------------------------------------------
     */

    use ConfirmsPasswords;
    use UseUserGuard;

    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
     */

    /**
     * Show the confirm password view.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \Illuminate\View\View
     */
    public function show(Request $request)
    {
        return view()->make('auth::passwords.confirm');
    }

    /**
     * Confirm the user's password.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        return $this->confirm($request);
    }

    /* -----------------------------------------------------------------
     |  Other Methods
     | -----------------------------------------------------------------
     */

    /**
     * Get the redirect URL.
     *
     * @return string
     */
    protected function getRedirectUrl(): string
    {
        return PagesRoutes::home();
    }
}
