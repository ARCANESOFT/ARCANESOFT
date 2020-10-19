<?php

declare(strict_types=1);

namespace Authentication\Http\Requests;

use Arcanesoft\Foundation\Auth\Auth;
use Illuminate\Foundation\Http\FormRequest;

/**
 * Class     LoginRequest
 *
 * @package  App\Http\Requests\Authentication
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class LoginRequest extends FormRequest
{
    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
     */

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return Auth::isLoginEnabled();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            Auth::username() => ['required', 'string'],
            'password'       => ['required', 'string'],
        ];
    }
}
