<?php declare(strict_types=1);

namespace App\Models;

use Arcanesoft\Foundation\Authorization\Models\User as Authenticatable;
use Authentication\Notifications\VerifyEmailNotification;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * Class     User
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class User extends Authenticatable implements MustVerifyEmail
{
    /* -----------------------------------------------------------------
     |  Traits
     | -----------------------------------------------------------------
     */

    use HasFactory;

    /* -----------------------------------------------------------------
     |  Notifications
     | -----------------------------------------------------------------
     */

    /**
     * Send the email verification notification.
     */
    public function sendEmailVerificationNotification(): void
    {
        $this->notify(new VerifyEmailNotification);
    }
}
