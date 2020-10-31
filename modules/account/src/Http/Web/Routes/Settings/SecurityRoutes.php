<?php

declare(strict_types=1);

namespace Account\Http\Web\Routes\Settings;

use Account\Http\Web\Controllers\Settings\BrowserSessionsController;
use Account\Http\Web\Controllers\Settings\SecurityController;
use Account\Http\Web\Controllers\Settings\TwoFactorAuthenticationController;
use App\Http\Routes\AbstractRouteRegistrar;

/**
 * Class     SecurityRoutes
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class SecurityRoutes extends AbstractRouteRegistrar
{
    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
     */

    /**
     * Map the routes.
     */
    public function map(): void
    {
        $this->name('security.')->prefix('security')->group(function () {
            // account::settings.security.index
            $this->get('/', [SecurityController::class, 'index'])
                 ->name('index');

            $this->name('password.')->prefix('password')->group(function () {
                // account::settings.security.password.update
                $this->put('update', [SecurityController::class, 'updatePassword'])
                     ->name('update');
            });

            $this->mapTwoFactorAuthenticationRoutes();
            $this->mapBrowserSessionsRoutes();
        });
    }

    /**
     * Map the Two Factor Authentication routes.
     */
    protected function mapTwoFactorAuthenticationRoutes(): void
    {
        $this->name('two-factor.')->prefix('two-factor')->middleware(['ajax'])->group(function () {
            // account::settings.security.two-factor.status
            $this->get('status', [TwoFactorAuthenticationController::class, 'status'])
                ->name('status');

            // account::settings.security.two-factor.enable
            $this->post('enable', [TwoFactorAuthenticationController::class, 'enable'])
                ->name('enable');

            // account::settings.security.two-factor.regenerate
            $this->put('regenerate', [TwoFactorAuthenticationController::class, 'regenerate'])
                ->name('regenerate');

            // account::settings.security.two-factor.disable
            $this->delete('disable', [TwoFactorAuthenticationController::class, 'disable'])
                ->name('disable');
        });
    }

    protected function mapBrowserSessionsRoutes(): void
    {
        $this->name('browser-sessions.')->prefix('browser-sessions')->middleware(['ajax'])->group(function () {
            // account::settings.security.browser-sessions.status
            $this->get('status', [BrowserSessionsController::class, 'status'])
                ->name('status');

            // account::settings.security.browser-sessions.logout
            $this->delete('logout', [BrowserSessionsController::class, 'logout'])
                 ->name('logout');

            // account::settings.security.browser-sessions.logout-others
            $this->delete('logout-others', [BrowserSessionsController::class, 'logoutOthers'])
                ->name('logout-others');
        });
    }
}
