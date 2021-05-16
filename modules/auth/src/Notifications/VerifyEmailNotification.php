<?php declare(strict_types=1);

namespace Authentication\Notifications;

use Arcanesoft\Foundation\Fortify\Notifications\VerifyEmailNotification as Notification;
use Authentication\Http\Routes\EmailVerificationRoutes;

/**
 * Class     VerifyEmailNotification
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class VerifyEmailNotification extends Notification
{
    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
     */

    /**
     * Get the verification route.
     *
     * @return string
     */
    protected function getVerificationRoute(): string
    {
        return EmailVerificationRoutes::VERIFY;
    }
}
