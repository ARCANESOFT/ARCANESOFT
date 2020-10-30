<?php

declare(strict_types=1);

namespace Authentication\Http\Controllers;

use App\Http\Routes\PagesRoutes;
use Arcanesoft\Foundation\Authentication\Concerns\UseUserGuard;
use Arcanesoft\Foundation\Fortify\Auth\PromptsEmailVerification;
use Arcanesoft\Foundation\Fortify\Auth\SendsEmailVerificationNotification;
use Arcanesoft\Foundation\Fortify\Auth\VerifiesEmails;
use Arcanesoft\Foundation\Fortify\Concerns\RetrievesUserFromRequest;
use Authentication\Http\Requests\VerifyEmailRequest;
use Illuminate\Http\{RedirectResponse, Request};

/**
 * Class     EmailVerificationController
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class EmailVerificationController
{
    /* -----------------------------------------------------------------
     |  Traits
     | -----------------------------------------------------------------
     */

    use RetrievesUserFromRequest;
    use UseUserGuard;
    use SendsEmailVerificationNotification;
    use PromptsEmailVerification;
    use VerifiesEmails;

    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
     */

    /**
     * Display the email verification prompt.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\View\View
     */
    public function show(Request $request)
    {
        return $this->promptEmailVerification($request, function () {
            return view()->make('auth::verify-email');
        });
    }

    /**
     * Send a new email verification notification.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\Response
     */
    public function resend(Request $request)
    {
        return $this->sendEmailVerification($request);
    }

    /**
     * Mark the authenticated user's email address as verified.
     *
     * @param  \Authentication\Http\Requests\VerifyEmailRequest  $request
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function verify(VerifyEmailRequest $request)
    {
        return $this->verifyEmail($request);
    }

    /* -----------------------------------------------------------------
     |  Other Methods
     | -----------------------------------------------------------------
     */

    /**
     * Redirected to a specific page if verified.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  array                     $parameters
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    protected function redirectTo(Request $request, array $parameters = []): RedirectResponse
    {
        return redirect()->intended(PagesRoutes::home($parameters));
    }
}
