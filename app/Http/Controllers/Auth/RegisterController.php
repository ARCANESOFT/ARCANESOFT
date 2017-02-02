<?php namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

/**
 * Class     RegisterController
 *
 * @package  App\Http\Controllers\Auth
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class RegisterController extends AuthController
{
    /* ------------------------------------------------------------------------------------------------
     |  Traits
     | ------------------------------------------------------------------------------------------------
     */
    use RegistersUsers;

    /* ------------------------------------------------------------------------------------------------
     |  Constructor
     | ------------------------------------------------------------------------------------------------
     */
    /**
     * Create a new controller instance.
     */
    public function __construct()
    {
        $this->middleware('guest');

        parent::__construct();
    }

    /* ------------------------------------------------------------------------------------------------
     |  Main Functions
     | ------------------------------------------------------------------------------------------------
     */
    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     *
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'email'      => ['required', 'email', 'max:255', Rule::unique('users', 'email')],
            'password'   => ['required', 'confirmed', 'min:8', 'max:30'],
            'username'   => ['required', 'max:30'],
            'first_name' => ['required', 'max:30'],
            'last_name'  => ['required', 'max:30'],
        ]);
    }

    /* ------------------------------------------------------------------------------------------------
     |  Other Functions
     | ------------------------------------------------------------------------------------------------
     */
    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     *
     * @return \App\Models\User
     */
    protected function create(array $data)
    {
        /**  @var \App\Models\User  $user */
        $user = new User([
            'email'      => $data['email'],
            'password'   => $data['password'],
            'username'   => $data['username'],
            'first_name' => $data['first_name'],
            'last_name'  => $data['last_name'],
        ]);
        $user->is_active = true;
        $user->save();

        $user->setAsMember();

        return $user;
    }

    /**
     * Get the post register redirect path.
     *
     * @return string
     */
    protected function redirectTo()
    {
        return route('public::welcome');
    }
}
