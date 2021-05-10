<?php

declare(strict_types=1);

namespace Authentication\Http\Requests;

use Arcanesoft\Foundation\Authorization\Auth;
use Illuminate\Foundation\Http\FormRequest;

/**
 * Class     SendPasswordResetLinkRequest
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class SendPasswordResetLinkRequest extends FormRequest
{
    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
     */

    /**
     * Get the validation's rules.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            Auth::username() => ['required', 'email'],
        ];
    }
}
