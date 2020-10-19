<?php

declare(strict_types=1);

namespace App\Http\Routes\Account;


use App\Http\Controllers\Account\ProfileController;
use App\Http\Routes\AbstractRouteRegistrar;

/**
 * Class     ProfileRoutes
 *
 * @package  App\Http\Routes\Account
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
            $this->get('/', [ProfileController::class, 'index'])
                 ->name('index'); // account::profile.index
        });
    }
}
