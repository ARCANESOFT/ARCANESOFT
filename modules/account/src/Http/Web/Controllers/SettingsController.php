<?php

declare(strict_types=1);

namespace Account\Http\Web\Controllers;

/**
 * Class     SettingsController
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class SettingsController extends Controller
{
    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
     */

    public function index()
    {
        $account = auth()->user();

        return view()->make('account::settings.index', compact('account'));
    }
}
