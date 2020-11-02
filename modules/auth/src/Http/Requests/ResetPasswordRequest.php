<?php

declare(strict_types=1);

namespace Authentication\Http\Requests;

use Arcanesoft\Foundation\Fortify\Rules\Password;
use Illuminate\Foundation\Http\FormRequest;

/**
 * Class     ResetPasswordRequest
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class ResetPasswordRequest extends FormRequest
{
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
            'token'    => ['required'],
            'email'    => ['required', 'email'],
            'password' => Password::make()->confirmed()->rules(),
        ];
    }
}