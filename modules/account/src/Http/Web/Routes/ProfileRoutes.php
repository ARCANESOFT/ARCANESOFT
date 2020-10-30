<?php

declare(strict_types=1);

namespace Account\Http\Web\Routes;

use Account\Http\Web\Controllers\ProfileController;
use App\Http\Routes\AbstractRouteRegistrar;

/**
 * Class     ProfileRoutes
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class ProfileRoutes extends AbstractRouteRegistrar
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
        $this->name('profile.')->prefix('profile')->group(function () {
            // account::profile.index
            $this->get('/', [ProfileController::class, 'index'])
                 ->name('index');
        });
    }
}
