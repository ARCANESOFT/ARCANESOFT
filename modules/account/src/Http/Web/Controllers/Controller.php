<?php declare(strict_types=1);

namespace Account\Http\Web\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;

/**
 * Class     Controller
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
abstract class Controller extends BaseController
{
    /* -----------------------------------------------------------------
     |  Traits
     | -----------------------------------------------------------------
     */

    use AuthorizesRequests,
        DispatchesJobs,
        ValidatesRequests;

    /* -----------------------------------------------------------------
     |  Other Methods
     | -----------------------------------------------------------------
     */

    /**
     * Get the authenticated user.
     *
     * @return \App\Models\User|mixed
     */
    protected static function authenticatedUser(Request $request = null)
    {
        if ($request)
            return $request->user();

        return auth()->user();
    }
}
