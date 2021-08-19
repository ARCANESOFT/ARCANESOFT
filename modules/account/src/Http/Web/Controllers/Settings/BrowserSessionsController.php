<?php declare(strict_types=1);

namespace Account\Http\Web\Controllers\Settings;

use Account\Http\Web\Controllers\Controller;
use Account\Http\Web\Resources\BrowserSessionCollection;
use Arcanesoft\Foundation\Fortify\Repositories\BrowserSessionsRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

/**
 * Class     BrowserSessionsController
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class BrowserSessionsController extends Controller
{
    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
     */

    /**
     * Get the Two Factor authentication status.
     *
     * @param  \Illuminate\Http\Request                                               $request
     * @param  \Arcanesoft\Foundation\Fortify\Repositories\BrowserSessionsRepository  $repo
     *
     * @return \Illuminate\Http\Resources\Json\ResourceCollection
     */
    public function status(Request $request, BrowserSessionsRepository $repo): ResourceCollection
    {
        if ( ! $repo->isValidDriver()) {
            return new BrowserSessionCollection(collect());
        }

        $sessions = $repo->fromRequest($request)->all();

        return new BrowserSessionCollection($sessions);
    }

    /**
     * @param  \Illuminate\Http\Request                                               $request
     * @param  \Arcanesoft\Foundation\Fortify\Repositories\BrowserSessionsRepository  $repo
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request, BrowserSessionsRepository $repo): JsonResponse
    {
        $repo->fromRequest($request)
             ->logoutOne($request->get('id'));

        return new JsonResponse('', JsonResponse::HTTP_NO_CONTENT);
    }

    /**
     * @param  \Illuminate\Http\Request                                               $request
     * @param  \Arcanesoft\Foundation\Fortify\Repositories\BrowserSessionsRepository  $repo
     *
     * @return \Illuminate\Http\JsonResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function logoutOthers(Request $request, BrowserSessionsRepository $repo): JsonResponse
    {
        $user = $repo->fromRequest($request)->user();

        if ( ! Hash::check($request->get('password'), $user->password)) {
            throw ValidationException::withMessages([
                'password' => [
                    __('This password does not match our records.'),
                ],
            ]);
        }

        if ($repo->isValidDriver()) {
            $repo->logoutOthers();
        }

        return new JsonResponse('', JsonResponse::HTTP_NO_CONTENT);
    }
}
