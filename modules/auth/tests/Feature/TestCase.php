<?php declare(strict_types=1);

namespace Authentication\Tests\Feature;

use Authentication\Tests\Concerns\{CanCreateUsers, CanGetRouteUrls};
use Authentication\Tests\TestCase as BaseTestCase;

/**
 * Class     TestCase
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
abstract class TestCase extends BaseTestCase
{
    /* -----------------------------------------------------------------
     |  Traits
     | -----------------------------------------------------------------
     */

    use CanCreateUsers;
    use CanGetRouteUrls;
}
