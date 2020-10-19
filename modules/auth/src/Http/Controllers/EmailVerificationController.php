<?php

declare(strict_types=1);

namespace Authentication\Http\Controllers;

use App\Http\Routes\PagesRoutes;
use Arcanesoft\Foundation\Authentication\Concerns\UseUserGuard;
use Authentication\Http\Requests\VerifyEmailRequest;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\{RedirectResponse, Request, Response};

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

    use UseUserGuard;

    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
     */

    /**
     * Show the email verification notice.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\View\View
     */
    public function show(Request $request)
    {
        $user = $this->getUserFromRequest($request);

        if ($user->hasVerifiedEmail()) {
            return $this->redirectHome();
        }

        return view('auth::verify-email');
    }

    /**
     * Resend the email verification notification.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\Response
     */
    public function resend(Request $request)
    {
        $user = $this->getUserFromRequest($request);

        if ($user->hasVerifiedEmail()) {
            return $this->getResendSkippedResponse($request);
        }

        $user->sendEmailVerificationNotification();

        return $this->getResendSuccessResponse($request);
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
        $user = $this->getUserFromRequest($request);

        if ($user->hasVerifiedEmail()) {
            return $this->redirectHome(['verified' => '1']);
        }

        if ($user->markEmailAsVerified()) {
            event(new Verified($user));
        }

        return $this->redirectHome(['verified' => '1']);
    }

    /* -----------------------------------------------------------------
     |  Other Methods
     | -----------------------------------------------------------------
     */

    /**
     * Get the authenticated user from request.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \App\Models\User|mixed
     */
    protected function getUserFromRequest(Request $request)
    {
        return $request->user($this->getGuardName());
    }

    /**
     * Get the 'skipped' success response.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\Response
     */
    protected function getResendSkippedResponse(Request $request)
    {
        if ($request->wantsJson()) {
            return new Response('', Response::HTTP_NO_CONTENT);
        }

        return $this->redirectHome();
    }

    /**
     * Get the 'resend' success response.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\Response
     */
    protected function getResendSuccessResponse(Request $request)
    {
        if ($request->wantsJson()) {
            return new Response('', Response::HTTP_ACCEPTED);
        }

        return redirect()
            ->back()
            ->with('status', 'verification-link-sent');
    }

    /**
     * Redirected to home page.
     *
     * @param  array  $parameters
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    protected function redirectHome(array $parameters = []): RedirectResponse
    {
        return redirect()->to(PagesRoutes::home($parameters));
    }
}
