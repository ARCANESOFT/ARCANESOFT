<?php

declare(strict_types=1);

namespace Authentication\Actions\Login;

use Arcanesoft\Foundation\Authentication\Concerns\UseUserGuard;
use Arcanesoft\Foundation\Fortify\Actions\Authentication\Login\RedirectIfTwoFactorWasEnabled as Action;
use Illuminate\Http\Request;

/**
 * Class     RedirectIfTwoFactorWasEnabled
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class RedirectIfTwoFactorWasEnabled extends Action
{
    /* -----------------------------------------------------------------
     |  Traits
     | -----------------------------------------------------------------
     */

    use UseUserGuard;

    /* -----------------------------------------------------------------
     |  Other Methods
     | -----------------------------------------------------------------
     */

    /**
     * Get the two factor redirect url.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return string
     */
    protected function getTwoFactorUrl(Request $request)
    {
        return route('auth::login.two-factor.create');
    }
}
