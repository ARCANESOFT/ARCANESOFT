<?php declare(strict_types=1);

namespace Account\Http\Web\Controllers;

use Illuminate\Http\Request;

/**
 * Class     SettingsController
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class SettingsController extends Controller
{
    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
     */

    /**
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \Illuminate\Contracts\View\View|mixed
     */
    public function index(Request $request)
    {
        return view()->make('account::settings.index', [
            'account' => static::authenticatedUser($request),
        ]);
    }
}
