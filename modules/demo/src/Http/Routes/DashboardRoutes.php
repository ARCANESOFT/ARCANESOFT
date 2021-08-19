<?php

declare(strict_types=1);

namespace Arcanesoft\Demo\Http\Routes;

use Arcanesoft\Demo\Http\Controllers\DashboardController;

/**
 * Class     DashboardRoutes
 *
 * @package  Arcanesoft\Demo\Http\Routes
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class DashboardRoutes extends AbstractRouteRegistrar
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
        $this->demoGroup(function () {
            $this->get('/', [DashboardController::class, 'index'])
                 ->name('index');

            $this->get('/dashboard', [DashboardController::class, 'dashboard'])
                 ->name('dashboard'); // demo::dashboard
        });
    }
}
