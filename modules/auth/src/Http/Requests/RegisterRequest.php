<?php

declare(strict_types=1);

namespace Authentication\Http\Requests;

use Arcanesoft\Foundation\Auth\Auth;
use Arcanesoft\Foundation\Auth\Rules\Users\EmailRule;
use Arcanesoft\Foundation\Fortify\Rules\Password;
use Illuminate\Foundation\Http\FormRequest;

/**
 * Class     RegisterRequest
 *
 * @package  App\Http\Requests\Authentication
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class RegisterRequest extends FormRequest
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
        return Auth::isRegistrationEnabled();
    }

    /**
     * Get the validation rules.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'first_name' => ['required', 'string', 'max:50'],
            'last_name'  => ['required', 'string', 'max:50'],
            'email'      => ['required', 'string', 'email', 'max:255', EmailRule::unique()],
            'password'   => Password::make()->confirmed()->rules(),
        ];
    }
}
