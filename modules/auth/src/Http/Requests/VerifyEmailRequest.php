<?php declare(strict_types=1);

namespace Authentication\Http\Requests;

use Arcanesoft\Foundation\Authentication\Concerns\UseUserGuard;
use Illuminate\Foundation\Http\FormRequest;

/**
 * Class     VerifyEmailRequest
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class VerifyEmailRequest extends FormRequest
{
    /* -----------------------------------------------------------------
     |  Traits
     | -----------------------------------------------------------------
     */

    use UseUserGuard;

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
        $user = $this->user($this->getGuardName());

        if ( ! hash_equals((string) $this->route('id'), (string) $user->getKey())) {
            return false;
        }

        if ( ! hash_equals((string) $this->route('hash'), sha1($user->getEmailForVerification()))) {
            return false;
        }

        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [];
    }
}
