<?php

declare(strict_types=1);

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;

/**
 * Class     SettingsController
 *
 * @package  App\Http\Controllers\Account
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class SettingsController extends Controller
{
    public function index()
    {
        $account = auth()->user();

        return view('account.settings.index', compact('account'));
    }
}
