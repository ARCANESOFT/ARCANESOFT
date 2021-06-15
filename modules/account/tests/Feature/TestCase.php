<?php declare(strict_types=1);

namespace Account\Tests\Feature;

use Account\Tests\TestCase as BaseTestCase;
use Authentication\Tests\Concerns\CanCreateUsers;

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
}
