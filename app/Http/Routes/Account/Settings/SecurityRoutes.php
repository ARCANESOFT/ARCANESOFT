<?php

declare(strict_types=1);

namespace App\Http\Routes\Account\Settings;

use App\Http\Controllers\Account\Settings\SecurityController;
use App\Http\Routes\AbstractRouteRegistrar;

/**
 * Class     SecurityRoutes
 *
 * @package  App\Http\Routes\Account\Settings
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class SecurityRoutes extends AbstractRouteRegistrar
{
    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
     */

    /**
     * Map the routes.
     */
    public function map(): void
    {
        $this->name('security.')->prefix('security')->group(function () {
            $this->get('/', [SecurityController::class, 'index'])
                 ->name('index'); // account::settings.security.index

            $this->name('password.')->prefix('password')->group(function () {
                $this->put('update', [SecurityController::class, 'updatePassword'])
                     ->name('update'); // account::settings.security.password.update
            });
        });
    }
}
