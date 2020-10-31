<?php

declare(strict_types=1);

namespace Account\Http\Web\Controllers\Settings;

use Account\Http\Web\Controllers\Controller;
use Account\Http\Web\Resources\BrowserSessionCollection;
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
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \Illuminate\Http\Resources\Json\ResourceCollection
     */
    public function status(Request $request): ResourceCollection
    {
        return new BrowserSessionCollection($this->getSessions($request));
    }

    /**
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request): JsonResponse
    {
        return new JsonResponse('', JsonResponse::HTTP_NO_CONTENT);
    }

    /**
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \Illuminate\Http\JsonResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function logoutOthers(Request $request): JsonResponse
    {
        $user = $this->getUserFromRequest($request);

        if ( ! Hash::check($request->get('password'), $user->password)) {
            throw ValidationException::withMessages([
                'password' => [
                    __('This password does not match our records.'),
                ],
            ]);
        }

        if ( ! $this->isValidSessionDriver()) {
            return new JsonResponse('', JsonResponse::HTTP_NO_CONTENT);
        }

        $user->sessions()
             ->where('id', '!=', session()->getId())
             ->delete();

        return new JsonResponse('', JsonResponse::HTTP_NO_CONTENT);
    }

    /* -----------------------------------------------------------------
     |  Other Methods
     | -----------------------------------------------------------------
     */

    /**
     * Retrieve the authenticated user from request.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \App\Models\User|mixed
     */
    protected function getUserFromRequest(Request $request)
    {
        return $request->user();
    }

    /**
     * Get the user's browser sessions.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \Illuminate\Database\Eloquent\Collection|mixed
     */
    protected function getSessions(Request $request)
    {
        if ( ! $this->isValidSessionDriver()) {
            return collect();
        }

        return $this->getUserFromRequest($request)
            ->sessions()
            ->orderBy('last_activity', 'desc')
            ->get();
    }

    /**
     * Determine if valid session was used.
     *
     * @return bool
     */
    protected function isValidSessionDriver(): bool
    {
        return in_array(config('session.driver'), [
            'database',
            'arcanesoft',
        ]);
    }
}
