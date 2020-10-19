<?php

declare(strict_types=1);

namespace App\Http\Requests\Account\Settings;

use Arcanesoft\Foundation\Fortify\Rules\Password;
use Illuminate\Foundation\Http\FormRequest;

/**
 * Class     UpdatePasswordRequest
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class UpdatePasswordRequest extends FormRequest
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
        $rules = [
            'password' => (new Password)->confirmed()->rules(),
        ];

        if ($this->authenticatedUser()->hasPassword()) {
            $rules['current_password'] = $rules['password'];
            $rules['password'][]       = 'different:current_password';
        }

        return $rules;
    }

    /**
     * Get the authenticated user.
     *
     * @return \Arcanesoft\Foundation\Auth\Models\User|mixed|null
     */
    protected function authenticatedUser()
    {
        return $this->user();
    }
}
