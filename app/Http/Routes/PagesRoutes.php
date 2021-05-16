<?php declare(strict_types=1);

namespace App\Http\Routes;

use App\Http\Controllers\{HomeController, PagesController};

/**
 * Class     PagesRoutes
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class PagesRoutes extends AbstractRouteRegistrar
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
        $this->name('public::')->group(function () {
            // public::index
            $this->get('/', [PagesController::class, 'index'])
                 ->name('index');

            // public::about-us
            $this->get('about-us', [PagesController::class, 'aboutUs'])
                 ->name('about-us');

            // public::home
            $this->get('home', [HomeController::class, 'index'])
                 ->middleware(['auth'])
                 ->name('home');

            static::mapRouteClasses([
                ContactRoutes::class,
                LegalRoutes::class,
            ]);
        });
    }

    /**
     * Get the index page url.
     *
     * @param  array  $parameters
     *
     * @return string
     */
    public static function index(array $parameters = []): string
    {
        return route('public::index', $parameters);
    }

    /**
     * Get the home page url.
     *
     * @param  array  $parameters
     *
     * @return string
     */
    public static function home(array $parameters = []): string
    {
        return route('public::home', $parameters);
    }
}
