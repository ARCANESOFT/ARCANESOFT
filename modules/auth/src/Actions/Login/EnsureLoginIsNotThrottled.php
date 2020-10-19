<?php

declare(strict_types=1);

namespace Authentication\Actions\Login;

use Arcanesoft\Foundation\Authentication\Concerns\UseUserGuard;
use Arcanesoft\Foundation\Fortify\Actions\Authentication\Login\EnsureLoginIsNotThrottled as Action;

/**
 * Class     EnsureLoginIsNotThrottled
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class EnsureLoginIsNotThrottled extends Action
{
    /* -----------------------------------------------------------------
     |  Traits
     | -----------------------------------------------------------------
     */

    use UseUserGuard;
}
