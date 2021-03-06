<?php namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Fideloper\Proxy\TrustProxies as Middleware;

/**
 * Class     TrustProxies
 *
 * @package  App\Http\Middleware
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class TrustProxies extends Middleware
{
    /* -----------------------------------------------------------------
     |  Properties
     | -----------------------------------------------------------------
     */

    /**
     * The trusted proxies for this application.
     *
     * @var array|null
     */
    protected $proxies;

    /**
     * The current proxy header mappings.
     *
     * @var array
     */
    protected $headers = [
        Request::HEADER_FORWARDED         => 'FORWARDED',
        Request::HEADER_X_FORWARDED_FOR   => 'X_FORWARDED_FOR',
        Request::HEADER_X_FORWARDED_HOST  => 'X_FORWARDED_HOST',
        Request::HEADER_X_FORWARDED_PORT  => 'X_FORWARDED_PORT',
        Request::HEADER_X_FORWARDED_PROTO => 'X_FORWARDED_PROTO',
    ];
}
