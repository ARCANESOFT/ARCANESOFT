<?php

declare(strict_types=1);

namespace Authentication\Http\Requests;

use Arcanesoft\Foundation\Authorization\Auth;
use Arcanesoft\Foundation\Authorization\Rules\Users\EmailRule;
use Arcanesoft\Foundation\Feature;
use Authentication\Http\Requests\Concerns\PasswordValidationRule;
use Illuminate\Foundation\Http\FormRequest;

/**
 * Class     RegisterRequest
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class RegisterRequest extends FormRequest
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
            'password'   => static::passwordRule()->rules(),
            'terms'      => Feature::hasTermsFeature() ? ['required', 'accepted'] : [],
        ];
    }
}
