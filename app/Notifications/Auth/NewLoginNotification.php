<?php declare(strict_types=1);

namespace App\Notifications\Auth;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

/**
 * Class     NewLoginNotification
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class NewLoginNotification extends Notification
{
    /* -----------------------------------------------------------------
     |  Traits
     | -----------------------------------------------------------------
     */

    use Queueable;

    /* -----------------------------------------------------------------
     |  Properties
     | -----------------------------------------------------------------
     */

    /** @var  string */
    public $device;

    /** @var  string */
    public $os;

    /** @var  string */
    public $location;

    public $date;

    /* -----------------------------------------------------------------
     |  Constructor
     | -----------------------------------------------------------------
     */

    /**
     * NewLoginNotification constructor.
     *
     * @param  string  $device
     * @param  string  $os
     * @param  string  $location
     * @param  mixed   $date
     */
    public function __construct($device, $os, $location, $date)
    {
        $this->device   = $device;
        $this->os       = $os;
        $this->location = $location;
        $this->date     = $date;
    }

    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
     */

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     *
     * @return array
     */
    public function via($notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  \App\Models\User|mixed  $notifiable
     *
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable): MailMessage
    {
        $url = route('account::settings.security.index');

        $subject = __('New connection to :app from :device on :os', [
            'app'    => config('app.name'),
            'device' => $this->device,
            'os'     => $this->os,
        ]);

        return (new MailMessage)
            ->subject($subject)
            ->action(__('Change your password'), $url)
            ->markdown('notifications.auth.new-login', [
                'account'  => $notifiable->masked_email,
                'device'   => $this->device,
                'os'       => $this->os,
                'date'     => $this->date,
                'location' => $this->location,
                'url'      => $url,
            ]);
    }
}
