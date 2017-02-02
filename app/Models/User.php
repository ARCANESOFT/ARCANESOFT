<?php namespace App\Models;

use Arcanesoft\Auth\Models\Role;
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
     |  Main Functions
     | ------------------------------------------------------------------------------------------------
     */
    /**
     * Set the current user as member.
     *
     * @return self
     */
    public function setAsMember()
    {
        /** @var  \Arcanesoft\Auth\Models\Role  $role */
        $role = Role::member()->first();
        $this->attachRole($role);

        return $this;
    }

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
