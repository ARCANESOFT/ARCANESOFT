<?php declare(strict_types=1);

namespace Authentication\Tests\Concerns;

use Arcanesoft\Foundation\Authorization\Auth;

/**
 * Trait     HasTwoFactorAuthentication
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
trait HasTwoFactorAuthentication
{
    /* -----------------------------------------------------------------
     |  Traits
     | -----------------------------------------------------------------
     */

    use HasLoginFeature;

    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
     */

    /**
     * Determine if the two factor authentication feature is enabled.
     *
     * @return bool
     */
    public static function isTwoFactorEnabled(): bool
    {
        return Auth::isLoginEnabled()
            && Auth::isTwoFactorEnabled();
    }

    protected static function skipIfTwoFactorIsDisabled(): void
    {
        static::skipIfLoginIsDisabled();

        if ( ! static::isTwoFactorEnabled())
            static::markTestSkipped('Two Factor Authentication feature is not enabled.');
    }
}
