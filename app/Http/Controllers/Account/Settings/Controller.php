<?php

declare(strict_types=1);

namespace App\Http\Controllers\Account\Settings;

use App\Http\Controllers\Controller as BaseController;

/**
 * Class     Controller
 *
 * @package  App\Http\Controllers\Account\Settings
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
abstract class Controller extends BaseController
{
    /* -----------------------------------------------------------------
     |  Common Methods
     | -----------------------------------------------------------------
     */

    /**
     * Get the authenticated user.
     *
     * @return \Arcanesoft\Foundation\Auth\Models\User|mixed|null
     */
    protected static function user()
    {
        return auth()->user();
    }
}
