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
        $this->seo()
            ->setTitle('Home')
            ->setDescription('This is the home page description.')
            ->setKeywords(['home', 'page']);

        return $this->view('home');
    }

    /**
     * Get the about page.
     *
     * @return \Illuminate\View\View
     */
    public function aboutUs()
    {
        $this->seo()
            ->setTitle('About us')
            ->setDescription('This is the about us page description.')
            ->setKeywords(['about', 'us', 'page']);

        $this->addBreadcrumb('About us');

        return $this->view('about-us');
    }
}
