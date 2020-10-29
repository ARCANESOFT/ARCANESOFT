<?php

declare(strict_types=1);

namespace App\Http\Controllers\Account\Settings;

use App\Http\Requests\Account\Settings\UpdateProfileRequest;
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
        $account = $this->getAuthenticatedUser();

        return view('account.settings.profile.index', compact('account'));
    }

    /**
     * @param  \App\Http\Requests\Account\Settings\UpdateProfileRequest  $request
     * @param  \Arcanesoft\Foundation\Authorization\Repositories\UsersRepository  $repo
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(UpdateProfileRequest $request, UsersRepository $repo)
    {
        $repo->updateOne(
            $this->getAuthenticatedUser(),
            $request->validated()
        );

        return redirect()->back();
    }

    /**
     * @return \App\Models\User|mixed|null
     */
    private function getAuthenticatedUser()
    {
        return auth()->user();
    }
}
