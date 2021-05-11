<?php

declare(strict_types=1);

namespace Account\Http\Web\Controllers\Settings;

use Account\Http\Web\Controllers\Controller;
use Illuminate\Http\Request;

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
    public function index(Request $request)
    {
        $account = $this->getAuthenticatedUser($request)->load(['linkedAccounts']);

        return view()->make('account::settings.linked-accounts.index', compact('account'));
    }

    public function link()
    {
        //
    }

    /* -----------------------------------------------------------------
     |  Other Methods
     | -----------------------------------------------------------------
     */

    /**
     * TODO: Refactor this method into a trait.
     *
     * Get the authenticated user from request.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \App\Models\User|mixed
     */
    protected function getAuthenticatedUser(Request $request)
    {
        return $request->user();
    }
}
