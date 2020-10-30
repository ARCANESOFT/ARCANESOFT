<?php

declare(strict_types=1);

namespace Account\Http;

use Account\Http\Web\Routes;
use Arcanedev\Support\Routing\RouteRegistrar;

/**
 * Class     WebRoutes
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class WebRoutes extends RouteRegistrar
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
        $this->prefix('account')->name('account::')->middleware(['web', 'auth', 'verified'])->group(function () {
            static::mapRouteClasses([
                Routes\ProfileRoutes::class,
                Routes\SettingsRoutes::class,
            ]);
        });
    }
}
