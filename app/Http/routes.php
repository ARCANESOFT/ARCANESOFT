<?php

/* ------------------------------------------------------------------------------------------------
 |  Application Routes
 | ------------------------------------------------------------------------------------------------
 */
Route::group(['as'  => 'public::'], function () {
    Route::get('/', [
        'as'    => 'home',
        'uses'  => 'PagesController@index'
    ]);

    Route::get('about-us', [
        'as'    => 'about.us',
        'uses'  => 'PagesController@aboutUs'
    ]);

    Route::get('contact', [
        'as'    => 'contact.get',
        'uses'  => 'ContactController@getForm'
    ]);

    Route::post('contact', [
        'as'    => 'contact.post',
        'uses'  => 'ContactController@postForm'
    ]);
});

/* ------------------------------------------------------------------------------------------------
 |  Auth Routes
 | ------------------------------------------------------------------------------------------------
 */
Route::group([
    'prefix'    => 'auth',
    'as'        => 'auth::',
], function() {
   Route::get('login', [
       'as'     => 'login.get',
       'uses'   => function() {
           return 'Login form';
       }
   ]);

    Route::post('login', [
        'as'     => 'login.post',
        'uses'   => function() {
            return 'Login form';
        }
    ]);

    Route::get('logout', [
        'as'     => 'logout',
        'uses'   => function() {
            return 'Logout';
        }
    ]);
});