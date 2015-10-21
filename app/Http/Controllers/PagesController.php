<?php namespace App\Http\Controllers;

use App\Bases\Controller;

/**
 * Class     PagesController
 *
 * @package  App\Http\Controllers
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class PagesController extends Controller
{
    /* ------------------------------------------------------------------------------------------------
     |  Main Function
     | ------------------------------------------------------------------------------------------------
     */
    /**
     * Get the home page.
     *
     * @return \Illuminate\View\View
     */
    public function index()
    {
        $this->seoMeta()->setTitle('Hello World');

        return $this->view('home');
    }

    /**
     * Get the about page.
     *
     * @return \Illuminate\View\View
     */
    public function aboutUs()
    {
        $this->addBreadcrumb('About us');

        return $this->view('about-us');
    }
}
