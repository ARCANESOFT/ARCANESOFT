<?php

declare(strict_types=1);

namespace Authentication\Http\Requests\Concerns;

use Arcanesoft\Foundation\Fortify\Rules\Password;

/**
 * Trait     PasswordValidationRule
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
trait PasswordValidationRule
{
    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
     */

    /**
     * Get the validation rules used to validate passwords.
     *
     * @return \Arcanesoft\Foundation\Fortify\Rules\Password
     */
    protected static function passwordRule(): Password
    {
        return Password::make()->confirmed();
    }
}
