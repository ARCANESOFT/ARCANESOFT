<?php

declare(strict_types=1);

namespace Arcanesoft\Demo\Http\Routes;

use Arcanesoft\Demo\Http\Controllers\FormsController;

/**
 * Class     FormsRoutes
 *
 * @package  Arcanesoft\Demo\Http\Routes
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class FormsRoutes extends AbstractRouteRegistrar
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
            $this->name('forms.')->prefix('forms')->group(function () {
                $this->get('{name}', [FormsController::class, 'show'])
                     ->name('show'); // demo::forms.show
            });
        });
    }
}
