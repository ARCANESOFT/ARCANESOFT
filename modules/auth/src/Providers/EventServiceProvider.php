<?php

declare(strict_types=1);

namespace Authentication\Providers;

use App\Listeners\Auth\SendAlertIfNewDeviceLoggedIn;
use Illuminate\Auth\Events\{Registered, Validated};
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

/**
 * Class     EventServiceProvider
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class EventServiceProvider extends ServiceProvider
{
    /* -----------------------------------------------------------------
     |  Properties
     | -----------------------------------------------------------------
     */

    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        Validated::class => [
            SendAlertIfNewDeviceLoggedIn::class
        ],
    ];

    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
     */

    /**
     * Register any events for your application.
     */
    public function boot(): void
    {
        //
    }
}
