<?php

declare(strict_types=1);

namespace App\Http\Routes;

use App\Http\Controllers\ContactController;

/**
 * Class     ContactRoutes
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class ContactRoutes extends AbstractRouteRegistrar
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
        $this->prefix('contact')->name('contact.')->group(function () {
            // public::contact.get
            $this->get('/', [ContactController::class, 'getForm'])
                 ->name('get');

            // public::contact.post
            $this->post('/', [ContactController::class, 'postForm'])
                 ->name('post');
        });
    }
}
