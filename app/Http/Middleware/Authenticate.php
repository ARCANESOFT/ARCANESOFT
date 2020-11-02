<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;

/**
 * Class     Authenticate
 *
 * @package  App\Http\Middleware
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return string|void
     */
    protected function redirectTo($request)
    {
        if ( ! $request->expectsJson()) {
            return route('auth::login.create');
        }
    }
}