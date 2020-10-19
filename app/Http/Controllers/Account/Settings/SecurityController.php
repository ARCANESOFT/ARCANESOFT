<?php

declare(strict_types=1);

namespace App\Http\Controllers\Account\Settings;

use App\Http\Requests\Account\Settings\UpdatePasswordRequest;
use Arcanesoft\Foundation\Auth\Repositories\UsersRepository;

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
        return view('account.settings.security.index', [
            'user' => $this->user(),
        ]);
    }

    /**
     * Update the password.
     *
     * @param  \App\Http\Requests\Account\Settings\UpdatePasswordRequest  $request
     * @param  \Arcanesoft\Foundation\Auth\Repositories\UsersRepository   $repo
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function updatePassword(UpdatePasswordRequest $request, UsersRepository $repo)
    {
        $user = $this->user();

        $updated = $repo->updatePassword($user, $request->get('password'));

        // TODO: Show notification

        return redirect()->back();
    }
}
