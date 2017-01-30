<?php namespace App\Http\Controllers;

class PagesController extends Controller
{
    public function home()
    {
        return $this->view('home');
    }

    public function welcome()
    {
        return $this->view('welcome');
    }
}
