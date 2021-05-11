<?php

declare(strict_types=1);

namespace Account\Http\Web\Routes\Settings;

use Account\Http\Web\Controllers\Settings\ProfileController;
use App\Http\Routes\AbstractRouteRegistrar;

/**
 * Class     ProfileRoutes
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class ProfileRoutes extends AbstractRouteRegistrar
{
    /* -----------------------------------------------------------------
     |  Constants
     | -----------------------------------------------------------------
     */

    const PROFILE_INDEX  = 'account::settings.profile.index';
    const PROFILE_UPDATE = 'account::settings.profile.update';

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
            // account::settings.profile.index
            $this->get('/', [ProfileController::class, 'index'])
                 ->name('index');

            // account::settings.profile.update
            $this->put('update', [ProfileController::class, 'update'])
                 ->name('update');
        });
    }
}
