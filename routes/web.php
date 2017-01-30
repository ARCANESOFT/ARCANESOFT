<?php

/* ------------------------------------------------------------------------------------------------
 |  Web Routes
 | ------------------------------------------------------------------------------------------------
 */
Route::group(['as' => 'public::'], function () {
    Route::get('/', 'PagesController@home')->name('home'); // public::home

    Route::get('/welcome', 'PagesController@welcome')->middleware('auth')->name('welcome'); // public::welcome
});

//if (app()->environment('local')) {
//    require __DIR__ . '/demo-web.php';
//}
