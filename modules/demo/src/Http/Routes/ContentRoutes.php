<?php

declare(strict_types=1);

namespace Arcanesoft\Demo\Http\Routes;

use Arcanesoft\Demo\Http\Controllers\ContentController;

/**
 * Class     ContentRoutes
 *
 * @package  Arcanesoft\Demo\Http\Routes
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class ContentRoutes extends AbstractRouteRegistrar
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
            $this->name('content.')->prefix('content')->group(function () {
                $this->get('{name}', [ContentController::class, 'show'])
                     ->name('show'); // demo::content.show
            });
        });
    }
}
