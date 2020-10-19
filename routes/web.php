<?php

use App\Models\User;
use App\Notifications\Auth\NewLoginNotification;
use Arcanedev\Agent\Contracts\Agent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/* -----------------------------------------------------------------
 |  Web Routes
 | -----------------------------------------------------------------
 */

Route::get('test', function (Request $request, Agent $agent) {
    /** @var  Arcanedev\Agent\Detectors\DeviceDetector  $detector */
    $detector = $agent->parse($request)->device();

    return (new NewLoginNotification($detector->getClient('name'), $detector->osName(), 'location here', now()))
        ->toMail(new User(['email' => 'john.doe@gmail.com']));
});
