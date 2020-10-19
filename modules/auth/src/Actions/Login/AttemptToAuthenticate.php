<?php

declare(strict_types=1);

namespace Authentication\Actions\Login;

use Arcanesoft\Foundation\Authentication\Concerns\UseUserGuard;
use Arcanesoft\Foundation\Fortify\Actions\Authentication\Login\AttemptToAuthenticate as Action;

/**
 * Class     AttemptToAuthenticate
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class AttemptToAuthenticate extends Action
{
    /* -----------------------------------------------------------------
     |  Traits
     | -----------------------------------------------------------------
     */

    use UseUserGuard;
}
