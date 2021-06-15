<?php declare(strict_types=1);

namespace App\Http\Controllers;

/**
 * Class     PagesController
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class PagesController extends Controller
{
    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
     */

    /**
     * @return \Illuminate\Contracts\View\View|mixed
     */
    public function index()
    {
        return view('index');
    }

    /**
     * @return \Illuminate\Contracts\View\View|mixed
     */
    public function aboutUs()
    {
        return view()->make('about-us');
    }
}
