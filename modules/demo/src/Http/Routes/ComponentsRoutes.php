<?php

declare(strict_types=1);

namespace Arcanesoft\Demo\Http\Routes;

use Arcanesoft\Demo\Http\Controllers\ComponentsController;

/**
 * Class     ComponentsRoutes
 *
 * @package  Arcanesoft\Demo\Http\Routes
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class ComponentsRoutes extends AbstractRouteRegistrar
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
            $this->name('components.')->prefix('components')->group(function () {
                $this->get('{name}', [ComponentsController::class, 'show'])
                     ->name('show'); // demo::components.show
            });
        });
    }
}
