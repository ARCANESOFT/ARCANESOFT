<?php declare(strict_types=1);

namespace App\Http\Middleware;

use Arcanesoft\Foundation\Fortify\Http\Middleware\RequirePassword as Middleware;
use Illuminate\Http\Request;

class RequirePassword extends Middleware
{
    /**
     * Get the redirect URL.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string|null               $redirectToRoute
     *
     * @return string
     */
    protected function getRedirectUrl(Request $request, ?string $redirectToRoute): string
    {
        return route($redirectToRoute ?? 'auth::password.confirm.show');
    }
}
