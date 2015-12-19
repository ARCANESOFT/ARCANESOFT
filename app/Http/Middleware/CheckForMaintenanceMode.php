<?php namespace App\Http\Middleware;

use Closure;
use Illuminate\Foundation\Http\Middleware\CheckForMaintenanceMode as BaseMiddleware;
use Symfony\Component\HttpKernel\Exception\HttpException;

/**
 * Class     CheckForMaintenanceMode
 *
 * @package  App\Http\Middleware
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class CheckForMaintenanceMode extends BaseMiddleware
{
    /* ------------------------------------------------------------------------------------------------
     |  Main Functions
     | ------------------------------------------------------------------------------------------------
     */
    /**
     * {@inheritdoc}
     */
    public function handle($request, Closure $next)
    {
        if (
            $this->app->isDownForMaintenance() &&
            ! $this->isExcludedIpAddress($request)
        ) {
            throw new HttpException(503);
        }

        return $next($request);
    }

    /* ------------------------------------------------------------------------------------------------
     |  Check Functions
     | ------------------------------------------------------------------------------------------------
     */
    /**
     * Check if the ip address is excluded.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return bool
     */
    protected function isExcludedIpAddress($request)
    {
        $excluded = [
            //
        ];

        return in_array($request->getClientIp(), $excluded);
    }
}
