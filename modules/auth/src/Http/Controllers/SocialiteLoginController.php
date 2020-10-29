<?php

declare(strict_types=1);

namespace Authentication\Http\Controllers;

use App\Events\Auth\UserLoggedIn;
use App\Http\Routes\PagesRoutes;
use Arcanesoft\Foundation\Authorization\Repositories\SocialiteUsersRepository;
use Arcanesoft\Foundation\Authorization\Socialite;

/**
 * Class     SocialiteLoginController
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class SocialiteLoginController
{
    /* -----------------------------------------------------------------
     |  Main Method
     | -----------------------------------------------------------------
     */

    /**
     * Redirect the user to the provider's authentication page.
     *
     * @param  string  $provider
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function create(string $provider)
    {
        static::checkProvider($provider);

        return Socialite::getProviderAuthorization($provider);
    }

    /**
     * Obtain the user information from the provider.
     *
     * @param  string                                                             $provider
     * @param  \Arcanesoft\Foundation\Authorization\Repositories\SocialiteUsersRepository  $repo
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(string $provider, SocialiteUsersRepository $repo)
    {
        static::checkProvider($provider);

        $user = $repo->findOrCreateUser($provider);

        auth()->login($user, true);

        event(new UserLoggedIn(auth()->user()));

        return redirect()->intended(PagesRoutes::home());
    }

    /* -----------------------------------------------------------------
     |  Other Methods
     | -----------------------------------------------------------------
     */

    /**
     * Check if the given social provider is supported.
     *
     * @param  string  $provider
     */
    protected static function checkProvider(string $provider): void
    {
        abort_unless(
            Socialite::isProviderEnabled($provider),
            404,
            __(':provider is not an acceptable login type.', ['provider' => e($provider)])
        );
    }
}
