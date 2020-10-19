<?php

declare(strict_types=1);

namespace Authentication\Http\Requests;

use Arcanesoft\Foundation\Authentication\Concerns\UseUserGuard;
use Arcanesoft\Foundation\Fortify\Http\Requests\TwoFactorLoginRequest as FormRequest;

/**
 * Class     TwoFactorLoginRequest
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class TwoFactorLoginRequest extends FormRequest
{
    /* -----------------------------------------------------------------
     |  Traits
     | -----------------------------------------------------------------
     */

    use UseUserGuard;
}
