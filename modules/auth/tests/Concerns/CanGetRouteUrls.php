<?php

declare(strict_types=1);

namespace Authentication\Tests\Concerns;

use App\Models\User;
use Authentication\Http\Routes\EmailVerificationRoutes;
use Authentication\Http\Routes\LoginRoutes;
use Authentication\Http\Routes\PasswordResetRoutes;
use Authentication\Http\Routes\RegisterRoutes;
use Illuminate\Support\Facades\URL;

/**
 * Trait     CanGetRouteUrls
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
trait CanGetRouteUrls
{
    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
     */

    /**
     * Get the login `CREATE` URL.
     *
     * @return string
     */
    protected static function loginCreateUrl(): string
    {
        return route(LoginRoutes::LOGIN_CREATE);
    }

    /**
     * Get the login `STORE` URL.
     *
     * @return string
     */
    protected static function loginStoreUrl(): string
    {
        return route(LoginRoutes::LOGIN_STORE);
    }

    /**
     * Get the logout URL.
     *
     * @return string
     */
    protected static function logoutUrl(): string
    {
        return route(LoginRoutes::LOGOUT);
    }

    /**
     * Get the password reset `GET` URL.
     *
     * @param  string  $token
     *
     * @return string
     */
    protected static function passwordResetGetUrl(string $token): string
    {
        return route(PasswordResetRoutes::RESET, compact('token'));
    }

    /**
     * Get the password reset `POST` URL.
     *
     * @return string
     */
    protected static function passwordResetPostUrl(): string
    {
        return route(PasswordResetRoutes::UPDATE);
    }

    /**
     * Get the valid/signed verification URL.
     *
     * @param  \App\Models\User  $user
     *
     * @return string
     */
    protected static function validVerificationVerifyUrl(User $user): string
    {
        return URL::signedRoute(EmailVerificationRoutes::VERIFY, [
            'id'   => $user->getKey(),
            'hash' => sha1($user->getEmailForVerification()),
        ]);
    }

    /**
     * Get the invalid the verification URL.
     *
     * @param  \App\Models\User|mixed  $user
     *
     * @return string
     */
    protected static function invalidVerificationVerifyUrl(User $user): string
    {
        return route(EmailVerificationRoutes::VERIFY, [
            'id'   => $user->getAuthIdentifier(),
            'hash' => 'invalid-hash',
        ]);
    }

    /**
     * Get the verification `notice` URL.
     *
     * @return string
     */
    protected function verificationNoticeUrl(): string
    {
        return route(EmailVerificationRoutes::NOTICE);
    }

    /**
     * Get the verification `resend` URL.
     *
     * @return string
     */
    protected static function verificationResendUrl(): string
    {
        return route(EmailVerificationRoutes::RESEND);
    }

    /**
     * Get the password request URL.
     *
     * @return string
     */
    protected static function passwordRequestUrl(): string
    {
        return route(PasswordResetRoutes::REQUEST);
    }

    /**
     * Get the password email URL.
     *
     * @return string
     */
    protected static function passwordEmailPostUrl(): string
    {
        return route(PasswordResetRoutes::EMAIL);
    }

    /**
     * Get the register `CREATE` URL.
     *
     * @return string
     */
    protected static function registerGetUrl(): string
    {
        return route(RegisterRoutes::REGISTER_CREATE);
    }

    /**
     * GEt the register `STORE` URL.
     *
     * @return string
     */
    protected static function registerPostUrl(): string
    {
        return route(RegisterRoutes::REGISTER_STORE);
    }
}
