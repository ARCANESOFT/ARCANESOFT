<?php namespace App\Http\Controllers;

/**
 * Class     PagesController
 *
 * @package  App\Http\Controllers
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class PagesController extends Controller
{
    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
     */
    /**
     * Show the home page.
     *
     * @return \Illuminate\View\View
     */
    public function home()
    {
        return $this->view('home');
    }
}
