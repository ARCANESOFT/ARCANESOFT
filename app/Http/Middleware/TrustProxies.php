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
     * The headers used to detect proxies.
     *
     * @var array
     */
    protected $headers = Request::HEADER_X_FORWARDED_ALL;
}
