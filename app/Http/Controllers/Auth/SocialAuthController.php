<?php namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Arcanedev\LaravelAuth\Services\SocialAuthenticator;
use Illuminate\Foundation\Auth\RedirectsUsers;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

/**
 * Class     SocialAuthController
 *
 * @package  App\Http\Controllers\Auth
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class SocialAuthController extends Controller
{
    /* -----------------------------------------------------------------
     |  Traits
     | -----------------------------------------------------------------
     */
    use RedirectsUsers;

    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
     */
    /**
     * Redirect the user to the OAuth Provider.
     *
     * @param  string  $socialProvider
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function redirectToProvider($socialProvider)
    {
        return $this->getSocialProvider($socialProvider)->redirect();
    }

    /**
     * Obtain the user information from provider.
     *
     * @param  string  $socialProvider
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function handleCallback($socialProvider)
    {
        /** @var  \Laravel\Socialite\One\User|\Laravel\Socialite\Two\User  $user */
        $user     = $this->getSocialProvider($socialProvider)->user();
        $authUser = $this->findOrCreateUser($user, $socialProvider);

        Auth::login($authUser, true);

        return redirect()->intended($this->redirectPath());
    }

    /* ------------------------------------------------------------------------------------------------
     |  Other Methods
     | ------------------------------------------------------------------------------------------------
     */
    /**
     * Find or create a user.
     *
     * @param  \Laravel\Socialite\One\User|\Laravel\Socialite\Two\User  $user
     * @param  string                                                   $provider
     *
     * @return \App\Models\User
     */
    private function findOrCreateUser($user, $provider)
    {
        if ($authUser = User::where('social_provider_id', $user->id)->first()) {
            return $authUser;
        }

        return User::createAsMember([
            'name'               => $user->name,
            'email'              => $user->email,
            'social_provider'    => $provider,
            'social_provider_id' => $user->id,
        ]);
    }

    /**
     * Get the social provider.
     *
     * @param  string  $driver
     *
     * @return \Laravel\Socialite\One\AbstractProvider|\Laravel\Socialite\Two\AbstractProvider
     */
    private function getSocialProvider($driver)
    {
        if ( ! SocialAuthenticator::isSupported($driver))
            static::pageNotFound();

        return Socialite::driver($driver);
    }

    /**
     * Get the post register redirect path.
     *
     * @return string
     */
    protected function redirectTo()
    {
        return route('account::index');
    }
}
