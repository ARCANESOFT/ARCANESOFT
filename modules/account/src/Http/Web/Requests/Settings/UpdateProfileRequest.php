<?php declare(strict_types=1);

namespace Account\Http\Web\Requests\Settings;

use Arcanesoft\Foundation\Authorization\Auth;
use Arcanesoft\Foundation\Authorization\Rules\Users\EmailRule;
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
            'username'   => ['nullable', 'string', 'max:255', 'unique:'.Auth::table('users'), 'alpha_dash'],
            'first_name' => ['required', 'string', 'max:50'],
            'last_name'  => ['required', 'string', 'max:50'],
        ];
    }
}
