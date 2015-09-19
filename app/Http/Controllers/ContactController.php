<?php namespace App\Http\Controllers;

use App\Bases\Controller;

/**
 * Class ContactController
 * @package App\Http\Controllers
 */
class ContactController extends Controller
{
    /* ------------------------------------------------------------------------------------------------
     |  Main Controller Functions
     | ------------------------------------------------------------------------------------------------
     */
    public function getForm()
    {
        return view('contact');
    }

    public function sendForm()
    {
        // TODO: implement the sendForm method
    }
}
