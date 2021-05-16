<?php declare(strict_types=1);

namespace Account\Http\Web\Routes\Settings;

use Account\Http\Web\Controllers\Settings\LinkedAccountsController;
use App\Http\Routes\AbstractRouteRegistrar;

/**
 * Class     LinkedAccountsRoutes
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class LinkedAccountsRoutes extends AbstractRouteRegistrar
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
        $this->name('linked-accounts.')->prefix('linked-accounts')->group(function (): void {
            // account::settings.linked-accounts.index
            $this->get('/', [LinkedAccountsController::class, 'index'])
                 ->name('index');
        });
    }
}
