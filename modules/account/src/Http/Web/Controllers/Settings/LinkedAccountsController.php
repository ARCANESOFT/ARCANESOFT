<?php

declare(strict_types=1);

namespace Account\Http\Web\Controllers\Settings;

use Account\Http\Web\Controllers\Controller;

/**
 * Class     LinkedAccountsController
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class LinkedAccountsController extends Controller
{
    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
     */

    /**
     * Index page.
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        $account = auth()->user()->load(['linkedAccounts']);

        return view()->make('account::settings.linked-accounts.index', compact('account'));
    }

    public function link()
    {
        //
    }
}
