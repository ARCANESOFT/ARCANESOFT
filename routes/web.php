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

/* ------------------------------------------------------------------------------------------------
 |  Demo Routes
 | ------------------------------------------------------------------------------------------------
 */
Route::group(['prefix' => 'demo'], function () {
    Route::get('/', function () {
        return view('demo.dahsboard-1');
    });
});
