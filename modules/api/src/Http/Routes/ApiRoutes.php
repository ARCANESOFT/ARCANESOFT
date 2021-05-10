<?php

declare(strict_types=1);

namespace Api\Http\Routes;

use Api\Http\Controllers\ExampleController;

/**
 * Class     ApiRoutes
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class ApiRoutes extends AbstractRouteRegistrar
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
        $this->get('/example', [ExampleController::class, 'index'])
             ->name('example.index');
    }
}
