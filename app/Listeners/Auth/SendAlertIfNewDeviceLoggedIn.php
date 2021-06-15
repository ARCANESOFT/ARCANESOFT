<?php declare(strict_types=1);

namespace App\Listeners\Auth;

use Illuminate\Auth\Events\Login;
use Illuminate\Http\Request;

/**
 * Class     SendAlertIfNewDeviceLoggedIn
 *
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
     * @param  \Illuminate\Auth\Events\Login  $event
     */
    public function handle(Login $event)
    {
        // TODO: Check if new device
    }
}
