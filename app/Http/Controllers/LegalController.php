<?php

declare(strict_types=1);

namespace App\Http\Controllers;

/**
 * Class     LegalController
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class LegalController
{
    /**
     * @return \Illuminate\Contracts\View\View|mixed
     */
    public function tos()
    {
        return view()->make('legal.tos');
    }

    /**
     * @return \Illuminate\Contracts\View\View|mixed
     */
    public function privacy()
    {
        return view()->make('legal.privacy');
    }

    /**
     * @return \Illuminate\Contracts\View\View|mixed
     */
    public function cookies()
    {
        return view()->make('legal.cookies');
    }
}
