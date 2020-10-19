<?php

declare(strict_types=1);

namespace App\Http\Controllers;

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

    public function index()
    {
        return view('welcome');
    }
}
