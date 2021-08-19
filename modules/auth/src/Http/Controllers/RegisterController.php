<?php declare(strict_types=1);

namespace Authentication\Http\Controllers;

use App\Http\Routes\PagesRoutes;
use Arcanesoft\Foundation\Authorization\Auth;
use Arcanesoft\Foundation\Authorization\Repositories\UsersRepository;
use Arcanesoft\Foundation\Authentication\Concerns\UseUserGuard;
use Arcanesoft\Foundation\Fortify\Auth\RegistersUsers;
use Authentication\Http\Requests\RegisterRequest;
use Illuminate\Http\Request;

/**
 * Class     RegisterController
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class RegisterController
{
    /* -----------------------------------------------------------------
     |  Traits
     | -----------------------------------------------------------------
     */

    use RegistersUsers,
        UseUserGuard;

    /* -----------------------------------------------------------------
     |  Properties
     | -----------------------------------------------------------------
     */

    /** @var  \Arcanesoft\Foundation\Authorization\Repositories\UsersRepository */
    private $repo;

    /* -----------------------------------------------------------------
     |  Constructor
     | -----------------------------------------------------------------
     */

    /**
     * RegisterController constructor.
     *
     * @param  \Arcanesoft\Foundation\Authorization\Repositories\UsersRepository  $repo
     */
    public function __construct(UsersRepository $repo)
    {
        $this->repo = $repo;
    }

    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
     */

    /**
     * Show the login view.
     *
     * @return \Illuminate\Contracts\View\View
     */
    public function create()
    {
        abort_unless(Auth::isRegistrationEnabled(),404);

        return view()->make('auth::register');
    }

    /**
     * Create a new registered user.
     *
     * @param  \Authentication\Http\Requests\RegisterRequest  $request
     *
     * @return mixed
     */
    public function store(RegisterRequest $request)
    {
        return $this->register($request, $request->validated());
    }

    /**
     * Create a new user.
     *
     * @param  array  $data
     *
     * @return mixed
     */
    protected function createUser(array $data)
    {
        return $this->repo->createOne($data);
    }

    /* -----------------------------------------------------------------
     |  Other Methods
     | -----------------------------------------------------------------
     */

    /**
     * Get the redirect url after user was registered.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  mixed                     $user
     *
     * @return string
     */
    protected function redirectUrlAfterRegister(Request $request, $user): string
    {
        return PagesRoutes::index();
    }
}
