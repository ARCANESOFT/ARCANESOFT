<?php namespace App\Models;

use App\Notifications\Users\ResetPassword as ResetPasswordNotification;
use Arcanesoft\Auth\Models\Role;
use Arcanesoft\Auth\Models\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

/**
 * Class     User
 *
 * @package  App\Models
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class User extends Authenticatable
{
    /* -----------------------------------------------------------------
     |  Traits
     | -----------------------------------------------------------------
     */
    use Notifiable;

    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
     */
    /**
     * Create a user as a member.
     *
     * @param  array  $data
     *
     * @return self
     */
    public static function createAsMember(array $data)
    {
        $user = new self($data);
        $user->is_active = true;
        $user->save();

        $user->syncRoles([Role::MEMBER]);

        return $user;
    }

    /* -----------------------------------------------------------------
     |  Notification Methods
     | -----------------------------------------------------------------
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
