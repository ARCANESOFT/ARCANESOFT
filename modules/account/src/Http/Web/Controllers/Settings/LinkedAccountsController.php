<?php declare(strict_types=1);

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
     * @return \Illuminate\View\View
     */
    public function index(Request $request)
    {
        return view()->make('account::settings.linked-accounts.index', [
            'account' => static::authenticatedUser($request)->load(['linkedAccounts']),
        ]);
    }

    /**
     * Linked social accounts.
     */
    public function link()
    {
        //
    }
}
