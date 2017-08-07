<?php namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

/**
 * Class     RedirectIfAuthenticated
 *
 * @package  App\Http\Middleware
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class RedirectIfAuthenticated
{
    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
     */
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure                  $next
     * @param  string|null               $guard
     *
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
        if (Auth::guard($guard)->check()) {
            return redirect()->route('public::home');
        }

        return $next($request);
    }
}
