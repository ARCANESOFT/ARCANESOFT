<?php namespace App\Models;

use Arcanesoft\Auth\Models\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Arcanesoft\Auth\Notifications\Users\ResetPassword as ResetPasswordNotification;

class User extends Authenticatable
{
    /* ------------------------------------------------------------------------------------------------
     |  Traits
     | ------------------------------------------------------------------------------------------------
     */
    use Notifiable;

    /* ------------------------------------------------------------------------------------------------
     |  Notification Functions
     | ------------------------------------------------------------------------------------------------
     */
    /**
     * Send the password reset notification.
     *
     * @param  string  $token
     */
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPasswordNotification($token));
    }
}
