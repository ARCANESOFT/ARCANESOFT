<?php

/* ------------------------------------------------------------------------------------------------
 |  Web Routes
 | ------------------------------------------------------------------------------------------------
 */
Route::get('/', [
    'as'   => 'public::home',
    'uses' => function () {
        return view('welcome');
    }
]);

Route::get('home', [
    'uses' => 'HomeController@index'
]);

if (app()->environment('local')) {
    require __DIR__ . '/demo-web.php';
}
