<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Http\Routes\PagesRoutes;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Tests\Concerns\CreatesApplication;

abstract class TestCase extends BaseTestCase
{
    /* -----------------------------------------------------------------
     |  Traits
     | -----------------------------------------------------------------
     */

    use CreatesApplication;

    /* -----------------------------------------------------------------
     |  Common Methods
     | -----------------------------------------------------------------
     */

    /**
     * Get the home url.
     *
     * @return string
     */
    protected static function indexPageUrl(): string
    {
        return PagesRoutes::index();
    }
}
