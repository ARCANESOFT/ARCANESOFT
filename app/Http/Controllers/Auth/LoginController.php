<?php namespace App\Http\Controllers\Auth;

use Illuminate\Foundation\Auth\AuthenticatesUsers;

/**
 * Class     LoginController
 *
 * @package  App\Http\Controllers\Auth
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class LoginController extends AuthController
{
    /* -----------------------------------------------------------------
     |  Traits
     | -----------------------------------------------------------------
     */
    use AuthenticatesUsers;

    /* -----------------------------------------------------------------
     |  Constructor
     | -----------------------------------------------------------------
     */
    /**
     * Create a new controller instance.
     */
    public function __construct()
    {
        $this->middleware('guest', ['except' => 'logout']);

        parent::__construct();
    }

    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
     */
    /**
     * Get the post login redirect path.
     *
     * @return string
     */
    protected function redirectTo()
    {
        /** @var  \App\Models\User  $user */
        $user = $this->guard()->user();

        return ($user->isAdmin() || $user->isModerator())
            ? route('admin::foundation.home')
            : route('account::index');
    }
}
