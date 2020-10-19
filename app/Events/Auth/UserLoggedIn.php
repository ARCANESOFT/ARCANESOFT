<?php

declare(strict_types=1);

namespace App\Events\Auth;

use App\Models\User;
use Illuminate\Queue\SerializesModels;

/**
 * Class     UserLoggedIn
 *
 * @package  App\Events\Auth
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class UserLoggedIn
{
    /* -----------------------------------------------------------------
     |  Traits
     | -----------------------------------------------------------------
     */

    use SerializesModels;

    /* -----------------------------------------------------------------
     |  Properties
     | -----------------------------------------------------------------
     */

    /** @var  \App\Models\User|mixed */
    public $user;

    /* -----------------------------------------------------------------
     |  Constructor
     | -----------------------------------------------------------------
     */

    /**
     * @param  \App\Models\User|mixed  $user
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }
}
