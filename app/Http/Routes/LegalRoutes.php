<?php declare(strict_types=1);

namespace App\Http\Routes;

use App\Http\Controllers\LegalController;

/**
 * Class     LegalRoutes
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class LegalRoutes extends AbstractRouteRegistrar
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
        $this->prefix('legal')->name('legal.')->group(function () {
            // public::legal.tos
            $this->get('tos', [LegalController::class, 'tos'])
                 ->name('tos');

            // public::legal.privacy
            $this->get('privacy', [LegalController::class, 'privacy'])
                 ->name('privacy');

            // public::legal.cookies
            $this->get('cookies', [LegalController::class, 'cookies'])
                 ->name('cookies');
        });
    }
}
