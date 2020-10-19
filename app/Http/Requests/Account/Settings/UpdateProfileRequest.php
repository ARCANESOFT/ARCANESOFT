<?php

declare(strict_types=1);

namespace App\Http\Requests\Account\Settings;

use Arcanesoft\Foundation\Auth\Rules\Users\EmailRule;
use Illuminate\Foundation\Http\FormRequest;

/**
 * Class     UpdateProfileRequest
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class UpdateProfileRequest extends FormRequest
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
        $user = $this->user();

        return [
            'email'      => ['required', 'string', 'email', 'max:255', EmailRule::unique()->ignore($user->id)],
            'username'   => [],
            'first_name' => ['required', 'string', 'max:50'],
            'last_name'  => ['required', 'string', 'max:50'],
        ];
    }
}
