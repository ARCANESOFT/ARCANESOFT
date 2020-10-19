<?php

declare(strict_types=1);

namespace App\Http\Routes\Account\Settings;

use App\Http\Controllers\Account\Settings\ProfileController;
use App\Http\Routes\AbstractRouteRegistrar;

/**
 * Class     ProfileRoutes
 *
 * @package  App\Http\Routes\Account\Settings
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class ProfileRoutes extends AbstractRouteRegistrar
{
    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
     */

    /**
     * Map the routes.
     */
    public function map()
    {
        $this->name('profile.')->prefix('profile')->group(function () {
            $this->get('/', [ProfileController::class, 'index'])
                 ->name('index'); // account::settings.profile.index

            $this->put('update', [ProfileController::class, 'update'])
                 ->name('update'); // account::settings.profile.update
        });
    }
}
