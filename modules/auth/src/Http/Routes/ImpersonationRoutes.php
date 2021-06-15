<?php declare(strict_types=1);

namespace Authentication\Http\Routes;

use Authentication\Http\Controllers\ImpersonateController;
use App\Http\Routes\AbstractRouteRegistrar;

/**
 * Class     ImpersonationRoutes
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class ImpersonationRoutes extends AbstractRouteRegistrar
{
    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
     */

    /**
     * Map Impersonation routes.
     */
    public function map(): void
    {
        $this->prefix('impersonate')->name('impersonate.')->group(function (): void {
            // auth::impersonate.stop
            $this->post('stop', [ImpersonateController::class, 'stop'])
                 ->name('stop');
        });
    }
}
