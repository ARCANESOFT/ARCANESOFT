<?php namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Arr;
use Illuminate\Validation\Rule;

/**
 * Class     RegisterController
 *
 * @package  App\Http\Controllers\Auth
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class RegisterController extends AuthController
{
    /* -----------------------------------------------------------------
     |  Traits
     | -----------------------------------------------------------------
     */

    use RegistersUsers;

    /* -----------------------------------------------------------------
     |  Constructor
     | -----------------------------------------------------------------
     */

    /**
     * Create a new controller instance.
     */
    public function __construct()
    {
        $this->middleware('guest');

        parent::__construct();
    }

    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
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
        return validator($data, [
            'email'      => ['required', 'string', 'email', 'max:255', Rule::unique($this->getUsersTableName(), 'email')],
            'password'   => ['required', 'string', 'confirmed', 'min:8', 'max:30'],
            'username'   => ['required', 'string', 'max:30'],
            'first_name' => ['required', 'string', 'max:30'],
            'last_name'  => ['required', 'string', 'max:30'],
        ]);
    }

    /* -----------------------------------------------------------------
     |  Other Methods
     | -----------------------------------------------------------------
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
        return User::createAsMember(
            Arr::only($data, ['email', 'password', 'username', 'first_name', 'last_name'])
        );
    }

    /**
     * Get the post register redirect path.
     *
     * @return string
     */
    protected function redirectTo()
    {
        return route('account::index');
    }

    /**
     * Get the users table name.
     *
     * @return string
     */
    private function getUsersTableName()
    {
        return config('arcanesoft.auth.database.prefix', '').config('arcanesoft.auth.users.table', 'users');
    }
}
