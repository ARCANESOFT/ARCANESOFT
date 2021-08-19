<?php declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\Request;

/**
 * Class     HomeController
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class HomeController extends Controller
{
    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
     */

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\View\View|mixed
     */
    public function index()
    {
        return view()->make('home');
    }
}
