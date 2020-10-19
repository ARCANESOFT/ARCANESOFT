<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use App\Http\Routes\PagesRoutes;
use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/**
 * Class     RedirectIfAuthenticated
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure                  $next
     * @param  string|null               ...$guards
     *
     * @return mixed
     */
    public function handle(Request $request, Closure $next, ...$guards)
    {
        $guards = empty($guards) ? [null] : $guards;

        foreach ($guards as $guard) {
            if (Auth::guard($guard)->check()) {
                return $this->getRedirectResponse($request);
            }
        }

        return $next($request);
    }

    /**
     * Get the redirect response.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return mixed
     */
    protected function getRedirectResponse(Request $request)
    {
        if ($request->wantsJson()) {
            return new JsonResponse([
                'message' => __('You are already authenticated.'),
            ], JsonResponse::HTTP_BAD_REQUEST);
        }

        return redirect()->to(PagesRoutes::index());
    }
}
