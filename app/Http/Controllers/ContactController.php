<?php namespace App\Http\Controllers;

use App\Bases\Controller;
use App\Http\Requests\ContactRequest;

/**
 * Class     ContactController
 *
 * @package  App\Http\Controllers
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class ContactController extends Controller
{
    /* ------------------------------------------------------------------------------------------------
     |  Main Functions
     | ------------------------------------------------------------------------------------------------
     */
    /**
     * Get contact form.
     *
     * @return \Illuminate\View\View
     */
    public function getForm()
    {
        $this->seo()
            ->setTitle('Contact us')
            ->setDescription('This is the contact us page description.')
            ->setKeywords(['contact', 'us', 'page', 'map', 'phone']);

        $this->addBreadcrumb('Contact us');

        return $this->view('contact');
    }

    /**
     * Post contact form.
     *
     * @param  ContactRequest  $request
     */
    public function postForm(ContactRequest $request)
    {
        //
    }
}
