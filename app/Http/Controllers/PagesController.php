<?php namespace App\Http\Controllers;

class PagesController extends Controller
{
    public function home()
    {
        return $this->view('home');
    }
}
