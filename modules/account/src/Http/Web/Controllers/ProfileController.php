<?php

declare(strict_types=1);

namespace Account\Http\Web\Controllers;

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
     * @return \Illuminate\View\View
     */
    public function index()
    {
        return view()->make('account::profile.index');
    }
}
