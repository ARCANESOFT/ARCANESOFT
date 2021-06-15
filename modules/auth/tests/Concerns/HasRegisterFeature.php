<?php declare(strict_types=1);

namespace Authentication\Tests\Concerns;

use Arcanesoft\Foundation\Authorization\Auth;

/**
 * Class     HasRegisterFeature
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
trait HasRegisterFeature
{
    /* -----------------------------------------------------------------
     |  Common Methods
     | -----------------------------------------------------------------
     */

    /**
     * Disable the register system.
     */
    protected static function disableRegister(): void
    {
        config()->set('arcanesoft.foundation.auth.authentication.register.enabled', false);
    }

    /**
     * Enable the register system.
     */
    protected static function enableRegister(): void
    {
        config()->set('arcanesoft.foundation.auth.authentication.register.enabled', true);
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
    public static function isRegisterEnabled(): bool
    {
        return Auth::isRegistrationEnabled();
    }

    /* -----------------------------------------------------------------
     |  Tests Helpers
     | -----------------------------------------------------------------
     */

    protected static function skipIfRegisterIsDisabled(): void
    {
        if ( ! static::isRegisterEnabled())
            static::markTestSkipped('Register feature is not enabled.');
    }
}
