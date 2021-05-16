<?php

declare(strict_types=1);

namespace Account\Http\Web\Controllers;

use Illuminate\Http\Request;

/**
 * Class     ProfileController
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class ProfileController extends Controller
{
    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
     */

    /**
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \Illuminate\View\View
     */
    public function index(Request $request)
    {
        return view()->make('account::profile.index', [
            'account' => static::authenticatedUser($request),
        ]);
    }
}
