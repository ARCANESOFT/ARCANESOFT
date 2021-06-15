<?php declare(strict_types=1);

namespace Authentication\Http\Routes;

use Authentication\Http\Controllers\RegisterController;
use App\Http\Routes\AbstractRouteRegistrar;

/**
 * Class     RegisterRoutes
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class RegisterRoutes extends AbstractRouteRegistrar
{
    /* -----------------------------------------------------------------
     |  Constants
     | -----------------------------------------------------------------
     */

    public const REGISTER_CREATE = 'auth::register.create';
    public const REGISTER_STORE  = 'auth::register.store';

    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
     */

    /**
     * Map the routes.
     */
    public function map(): void
    {
        $this->prefix('register')->name('register.')->middleware(['guest:web'])->group(function (): void {
            // auth::register.create
            $this->get('/', [RegisterController::class, 'create'])
                 ->name('create');

            // auth::register.store
            $this->post('/', [RegisterController::class, 'store'])
                 ->name('store');
        });
    }
}
