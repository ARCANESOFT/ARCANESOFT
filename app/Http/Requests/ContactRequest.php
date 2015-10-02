<?php namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * Class     ContactRequest
 *
 * @package  App\Http\Requests
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class ContactRequest extends FormRequest
{
    /* ------------------------------------------------------------------------------------------------
     |  Properties
     | ------------------------------------------------------------------------------------------------
     */
    protected $rules = [
        'name'                  => 'required|max:100',
        'email'                 => 'required|email|max:150',
        'subject'               => 'required|max:255',
        'msg'                   => 'required',
        'g-recaptcha-response'  => 'captcha',
    ];

    /* ------------------------------------------------------------------------------------------------
     |  Main Functions
     | ------------------------------------------------------------------------------------------------
     */
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return $this->rules;
    }
}
