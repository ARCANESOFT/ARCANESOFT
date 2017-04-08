<?php namespace App\Notifications\Users;

use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

/**
 * Class     ResetPassword
 *
 * @package  App\Notifications\Users
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class ResetPassword extends Notification
{
    /* -----------------------------------------------------------------
     |  Properties
     | -----------------------------------------------------------------
     */
    /**
     * The password reset token.
     *
     * @var string
     */
    public $token;

    /* -----------------------------------------------------------------
     |  Constructor
     | -----------------------------------------------------------------
     */
    /**
     * Create a notification instance.
     *
     * @param  string  $token
     */
    public function __construct($token)
    {
        $this->token = $token;
    }

    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
     */
    /**
     * Get the notification's channels.
     *
     * @param  mixed  $notifiable
     *
     * @return array|string
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Build the mail representation of the notification.
     *
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail()
    {
        return (new MailMessage)
            ->markdown('notifications.email')
            ->subject(trans('auth.password-reset.email.subject', ['name' => config('app.name')]))
            ->line(trans('auth.password-reset.email.line-1'))
            ->action(trans('auth.password-reset.email.action'), route('auth::password.reset', [$this->token]))
            ->line(trans('auth.password-reset.email.line-2'));
    }
}
