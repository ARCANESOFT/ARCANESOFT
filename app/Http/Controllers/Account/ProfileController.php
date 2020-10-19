<?php

declare(strict_types=1);

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;

/**
 * Class     ProfileController
 *
 * @package  App\Http\Controllers\Account
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class ProfileController extends Controller
{
    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
     */

    /**
     * @return \Illuminate\View\View
     */
    public function index()
    {
        return view('profile.index');
    }
}
