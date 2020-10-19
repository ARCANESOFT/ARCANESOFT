<?php

declare(strict_types=1);

namespace App\Listeners\Auth;

use Illuminate\Auth\Events\Validated;
use Illuminate\Http\Request;

/**
 * Class     SendAlertIfNewDeviceLoggedIn
 *
 * @package  App\Listeners\Auth
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class SendAlertIfNewDeviceLoggedIn
{
    /* -----------------------------------------------------------------
     |  Properties
     | -----------------------------------------------------------------
     */

    /** @var  \Illuminate\Http\Request */
    protected $request;

    /* -----------------------------------------------------------------
     |  Constructor
     | -----------------------------------------------------------------
     */

    /**
     * SendAlertIfNewDeviceLoggedIn constructor.
     *
     * @param  \Illuminate\Http\Request  $request
     */
    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
     */

    /**
     * Handle the event.
     *
     * @param  \Illuminate\Auth\Events\Validated  $event
     */
    public function handle(Validated $event)
    {
        // TODO: Check if new device
    }
}
