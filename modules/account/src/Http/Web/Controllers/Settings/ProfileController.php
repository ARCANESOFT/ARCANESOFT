<?php declare(strict_types=1);

namespace Account\Http\Web\Controllers\Settings;

use Account\Http\Web\Controllers\Controller;
use Account\Http\Web\Requests\Settings\UpdateProfileRequest;
use Arcanesoft\Foundation\Authorization\Repositories\UsersRepository;

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
     * Index page.
     *
     * @return \Illuminate\View\View
     */
    public function index()
    {
        return view()->make('account::settings.profile.index', [
            'account' => static::authenticatedUser(),
        ]);
    }

    /**
     * Update the user's profile.
     *
     * @param  \Account\Http\Web\Requests\Settings\UpdateProfileRequest           $request
     * @param  \Arcanesoft\Foundation\Authorization\Repositories\UsersRepository  $repo
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(UpdateProfileRequest $request, UsersRepository $repo)
    {
        $repo->updateOne(
            static::authenticatedUser($request), $request->validated()
        );

        return redirect()->back();
    }
}
