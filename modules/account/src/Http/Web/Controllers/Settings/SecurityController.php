<?php

declare(strict_types=1);

namespace Account\Http\Web\Controllers\Settings;

use Account\Http\Web\Controllers\Controller;
use Account\Http\Web\Requests\Settings\UpdatePasswordRequest;
use Arcanesoft\Foundation\Authorization\Repositories\UsersRepository;

/**
 * Class     SecurityController
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class SecurityController extends Controller
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
        return view('account::settings.security.index', [
            'user' => auth()->user(),
        ]);
    }

    /**
     * Update the password.
     *
     * @param  \Account\Http\Web\Requests\Settings\UpdatePasswordRequest          $request
     * @param  \Arcanesoft\Foundation\Authorization\Repositories\UsersRepository  $repo
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function updatePassword(UpdatePasswordRequest $request, UsersRepository $repo)
    {
        $user = auth()->user();

        $updated = $repo->updatePassword($user, $request->get('password'));

        // TODO: Show notification

        return redirect()->back();
    }
}
