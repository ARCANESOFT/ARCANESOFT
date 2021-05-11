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
        $account = $this->getAuthenticatedUser($request);

        return view()->make('account::profile.index', compact('account'));
    }

    /* -----------------------------------------------------------------
     |  Other Methods
     | -----------------------------------------------------------------
     */

    /**
     * TODO: Refactor this method into a trait.
     *
     * Get the authenticated user.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \App\Models\User|mixed|null
     */
    protected function getAuthenticatedUser(Request $request)
    {
        return $request->user();
    }
}
