<?php declare(strict_types=1);

namespace Account\Http\Web\Controllers\Settings;

use Account\Http\Web\Controllers\Controller;
use Account\Http\Web\Requests\Settings\UpdatePasswordRequest;
use Arcanesoft\Foundation\Authorization\Repositories\UsersRepository;
use Illuminate\Http\Request;

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
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index(Request $request)
    {
        return view()->make('account::settings.security.index', [
            'user' => static::authenticatedUser($request)
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
        $user = static::authenticatedUser($request);

        $updated = $repo->updatePassword($user, $request->get('password'));

        // TODO: Show notification

        return redirect()->back();
    }
}
