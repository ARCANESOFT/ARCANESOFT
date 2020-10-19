<?php

declare(strict_types=1);
namespace App\Http\Routes\Account;

use App\Http\Routes\AbstractRouteRegistrar;

/**
 * Class     SettingsRoutes
 *
 * @package  App\Http\Routes\Account
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class SettingsRoutes extends AbstractRouteRegistrar
{
    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
     */

    /**
     * Register the routes.
     */
    public function map(): void
    {
        $this->prefix('settings')
             ->name('settings.')
             ->middleware(['password.confirm'])
             ->group(function () {
                 static::mapRouteClasses([
                     Settings\ProfileRoutes::class,
                     Settings\SecurityRoutes::class,
                     Settings\LinkedAccountsRoutes::class,
                 ]);
             });
    }
}
