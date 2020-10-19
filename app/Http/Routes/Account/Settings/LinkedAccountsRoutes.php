<?php

declare(strict_types=1);

namespace App\Http\Routes\Account\Settings;

use App\Http\Controllers\Account\Settings\LinkedAccountsController;
use App\Http\Routes\AbstractRouteRegistrar;

/**
 * Class     LinkedAccountsRoutes
 *
 * @package  App\Http\Routes\Account\Settings
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class LinkedAccountsRoutes extends AbstractRouteRegistrar
{
    /**
     * Map the routes.
     */
    public function map(): void
    {
        $this->name('linked-accounts.')->prefix('linked-accounts')->group(function () {
            $this->get('/', [LinkedAccountsController::class, 'index'])
                 ->name('index'); // account::settings.linked-accounts.index
        });
    }
}
