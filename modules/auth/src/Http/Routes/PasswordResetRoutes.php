<?php

declare(strict_types=1);

namespace Authentication\Http\Routes;

use Authentication\Http\Controllers\{PasswordResetLinkController, ResetPasswordController};
use App\Http\Routes\AbstractRouteRegistrar;

/**
 * Class     PasswordResetRoutes
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class PasswordResetRoutes extends AbstractRouteRegistrar
{
    /* -----------------------------------------------------------------
     |  Constants
     | -----------------------------------------------------------------
     */

    public const REQUEST = 'auth::password.request';
    public const EMAIL   = 'auth::password.email';
    public const RESET   = 'auth::password.reset';
    public const UPDATE  = 'auth::password.update';

    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
     */

    /**
     * Map the routes.
     */
    public function map(): void
    {
        $this->prefix('password')->name('password.')->middleware(['guest:web'])->group(function () {
             // auth::password.request
             $this->get('forgotten', [PasswordResetLinkController::class, 'create'])
                  ->name('request');

             // auth::password.email
             $this->post('forgotten', [PasswordResetLinkController::class, 'store'])
                  ->name('email');

             // auth::password.reset
             $this->get('reset/{token}', [ResetPasswordController::class, 'edit'])
                  ->name('reset');

             // auth::password.update
             $this->post('reset', [ResetPasswordController::class, 'update'])
                  ->name('update');
        });
    }
}
