<?php declare(strict_types=1);

namespace Authentication\Tests\Concerns;

use Arcanesoft\Foundation\Authorization\Auth;

/**
 * Trait     HasLoginFeature
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
trait HasLoginFeature
{
    /* -----------------------------------------------------------------
     |  Common Methods
     | -----------------------------------------------------------------
     */

    /**
     * Disable the login system.
     */
    protected static function disableLogin(): void
    {
        config()->set('arcanesoft.foundation.auth.authentication.login.enabled', false);
    }

    /**
     * Enable the login system.
     */
    protected static function enableLogin(): void
    {
        config()->set('arcanesoft.foundation.auth.authentication.login.enabled', true);
    }

    /* -----------------------------------------------------------------
     |  Check Methods
     | -----------------------------------------------------------------
     */

    /**
     * Determine if the login feature is enabled.
     *
     * @return bool
     */
    public static function isLoginEnabled(): bool
    {
        return Auth::isLoginEnabled();
    }

    /* -----------------------------------------------------------------
     |  Tests Helpers
     | -----------------------------------------------------------------
     */

    protected static function skipIfLoginIsDisabled(): void
    {
        if ( ! static::isLoginEnabled())
            static::markTestSkipped('Login feature is not enabled.');
    }
}
