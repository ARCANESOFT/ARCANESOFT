<?php

declare(strict_types=1);

namespace Authentication\Http\Routes;

use Authentication\Http\Controllers\ConfirmPasswordController;
use App\Http\Routes\AbstractRouteRegistrar;

/**
 * Class     ConfirmPasswordRoutes
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class ConfirmPasswordRoutes extends AbstractRouteRegistrar
{
    /* -----------------------------------------------------------------
     |  Constants
     | -----------------------------------------------------------------
     */

    public const SHOW   = 'auth::password.confirm.show';
    public const STORE  = 'auth::password.confirm.store';
    public const STATUS = 'auth::password.confirm.status';

    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
     */

    /**
     * Map the routes.
     */
    public function map(): void
    {
        $this->prefix('password/confirm')->name('password.confirm.')->middleware(['auth'])->group(function () {
            // auth::password.confirm.show
            $this->get('/', [ConfirmPasswordController::class, 'show'])
                 ->name('show');

            // auth::password.confirm.store
            $this->post('/', [ConfirmPasswordController::class, 'store'])
                 ->name('store');

            // auth::password.confirm.status
            $this->get('status', [ConfirmPasswordController::class, 'status'])
                 ->name('status');
        });
    }
}
