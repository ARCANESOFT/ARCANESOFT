<?php

declare(strict_types=1);

namespace Authentication\Tests;

use App\Http\Routes\PagesRoutes;
use Tests\Feature\TestCase as BaseTestCase;

/**
 * Class     TestCase
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
abstract class TestCase extends BaseTestCase
{
    /* -----------------------------------------------------------------
     |  Other Methods
     | -----------------------------------------------------------------
     */

    /**
     * Get the index page url.
     *
     * @return string
     */
    protected static function indexPageUrl(array $parameters = []): string
    {
        return PagesRoutes::index($parameters);
    }

    /**
     * Get the home page url.
     *
     * @return string
     */
    protected static function homePageUrl(array $parameters = [])
    {
        return PagesRoutes::home($parameters);
    }
}
