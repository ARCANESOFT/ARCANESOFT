<?php

declare(strict_types=1);

namespace Authentication\Http\Routes;

use App\Http\Routes\AbstractRouteRegistrar;
use Arcanesoft\Foundation\Authorization\Auth;
use Arcanesoft\Foundation\Fortify\Http\Limiters\{LoginRateLimiter, TwoFactorRateLimiter};
use Authentication\Http\Controllers\{LoginController, SocialiteLoginController, TwoFactorLoginController};

/**
 * Class     LoginRoutes
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class LoginRoutes extends AbstractRouteRegistrar
{
    /* -----------------------------------------------------------------
     |  Constants
     | -----------------------------------------------------------------
     */

    public const LOGIN_CREATE      = 'auth::login.create';
    public const LOGIN_STORE       = 'auth::login.store';
    public const LOGOUT            = 'auth::logout';
    public const TWO_FACTOR_CREATE = 'auth::login.two-factor.create';
    public const TWO_FACTOR_STORE  = 'auth::login.two-factor.store';

    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
     */

    /**
     * Map the routes.
     */
    public function map(): void
    {
        if (Auth::isLoginEnabled()) {
            $this->prefix('login')->name('login.')->middleware(['guest'])->group(function () {
                $this->mapLoginRoutes();
                $this->mapTwoFactorRoutes();
                $this->mapSocialiteRoutes();
            });
        }

        $this->mapLogoutRoutes();
    }

    /* -----------------------------------------------------------------
     |  Other Methods
     | -----------------------------------------------------------------
     */

    /**
     * Map the login routes.
     */
    private function mapLoginRoutes(): void
    {
        // auth::login.create
        $this->middleware(['guest:web'])->group(function () {
            $this->get('/', [LoginController::class, 'create'])
                 ->name('create');

            // auth::login.store
            $this->post('/', [LoginController::class, 'store'])
                 ->middleware(array_filter([LoginRateLimiter::middleware()]))
                 ->name('store');
        });
    }

    /**
     * Map the logout routes.
     */
    private function mapLogoutRoutes(): void
    {
        // auth::logout
        $this->delete('logout', [LoginController::class, 'destroy'])
             ->name('logout');
    }

    /**
     * Map two factor authentication routes.
     */
    private function mapTwoFactorRoutes(): void
    {
        if ( ! Auth::isTwoFactorEnabled())
            return;

        $this->prefix('two-factor-challenge')->name('two-factor.')->middleware(['guest:web'])->group(function () {
             // auth::login.two-factor.create
             $this->get('/', [TwoFactorLoginController::class, 'create'])
                  ->name('create');

             // auth::login.two-factor.store
             $this->post('/', [TwoFactorLoginController::class, 'store'])
                  ->middleware(array_filter([TwoFactorRateLimiter::middleware()]))
                  ->name('store');
         });
    }

    /**
     * Map the Socialite routes.
     */
    private function mapSocialiteRoutes(): void
    {
        if ( ! Auth::isSocialiteEnabled())
            return;

        $this->prefix('{socialite_provider}')->name('socialite.')->group(function () {
            // auth::login.socialite.show
            $this->get('/', [SocialiteLoginController::class, 'create'])
                 ->name('show');

            // auth::login.socialite.callback
            $this->get('callback', [SocialiteLoginController::class, 'store'])
                 ->name('callback');
        });
    }
}
