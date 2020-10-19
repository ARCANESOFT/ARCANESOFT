<?php

declare(strict_types=1);

namespace App\Http\Controllers\Account\Settings;

/**
 * Class     LinkedAccountsController
 *
 * @package  App\Http\Controllers\Account\Settings
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
        $account = $this->user()->load(['linkedAccounts']);

        return view('account.settings.linked-accounts.index', compact('account'));
    }

    public function link()
    {
        //
    }
}
