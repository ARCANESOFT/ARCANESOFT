<?php

declare(strict_types=1);

namespace Arcanesoft\Demo\Http\Controllers;

/**
 * Class     DashboardController
 *
 * @package  Arcanesoft\Demo\Http\Controllers
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class DashboardController
{
    public function index()
    {
        return redirect()->route('demo::dashboard');
    }

    public function dashboard()
    {
        return view('demo::dashboard');
    }
}
