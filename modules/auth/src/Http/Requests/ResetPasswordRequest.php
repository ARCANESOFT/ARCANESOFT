<?php

declare(strict_types=1);

namespace Authentication\Http\Requests;

use Arcanesoft\Foundation\Authorization\Auth;
use Authentication\Http\Requests\Concerns\PasswordValidationRule;
use Illuminate\Foundation\Http\FormRequest;

/**
 * Class     ResetPasswordRequest
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class ResetPasswordRequest extends FormRequest
{
    /* -----------------------------------------------------------------
     |  Traits
     | -----------------------------------------------------------------
     */

    use PasswordValidationRule;

    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
     */

    /**
     * Validation's rules.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'token'          => ['required'],
            Auth::username() => ['required', 'email'],
            'password'       => static::passwordRule()->rules(),
        ];
    }
}
