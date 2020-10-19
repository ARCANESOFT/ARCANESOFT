<?php

declare(strict_types=1);

namespace App\Http\Routes;

/**
 * Class     AccountRoutes
 *
 * @package  App\Http\Routes
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class AccountRoutes extends AbstractRouteRegistrar
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
        $this->name('account::')->prefix('account')->middleware(['auth', 'verified'])->group(function () {
            static::mapRouteClasses([
                Account\ProfileRoutes::class,
                Account\SettingsRoutes::class,
            ]);
        });
    }
}
