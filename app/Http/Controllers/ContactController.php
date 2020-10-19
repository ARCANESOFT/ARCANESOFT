<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\PostContactRequest;

/**
 * Class     ContactController
 *
 * @package  App\Http\Controllers
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class ContactController extends Controller
{
    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
     */

    /**
     * Get the contact form.
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function getForm()
    {
        //

        return view('contact');
    }

    /**
     * Post the contact form.
     *
     * @param  \App\Http\Requests\PostContactRequest  $request
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function postForm(PostContactRequest $request)
    {
        //

        return redirect()->back();
    }
}
