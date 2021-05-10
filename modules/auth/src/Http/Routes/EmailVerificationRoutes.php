<?php

declare(strict_types=1);

namespace Authentication\Http\Routes;

use Authentication\Http\Controllers\EmailVerificationController;
use App\Http\Routes\AbstractRouteRegistrar;

/**
 * Class     EmailVerificationRoutes
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class EmailVerificationRoutes extends AbstractRouteRegistrar
{
    /* -----------------------------------------------------------------
     |  Constants
     | -----------------------------------------------------------------
     */

    public const NOTICE = 'auth::email.verification.notice';
    public const SEND   = 'auth::email.verification.send';
    public const VERIFY = 'auth::email.verification.verify';

    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
     */

    /**
     * Map the routes.
     */
    public function map(): void
    {
        $this->prefix('email/verification')->name('email.verification.')->middleware(['auth'])->group(function () {
            // auth::email.verification.notice
            $this->get('/', [EmailVerificationController::class, 'show'])
                 ->name('notice');

            // auth::email.verification.send
            $this->post('/notification', [EmailVerificationController::class, 'send'])
                 ->middleware(['throttle:6,1']) // TODO: Make the throttle configurable
                 ->name('send');

            // auth::email.verification.verify
            $this->get('{id}/{hash}', [EmailVerificationController::class, 'verify'])
                 ->middleware(['signed', 'throttle:6,1']) // TODO: Make the throttle configurable
                 ->name('verify');
        });
    }
}
