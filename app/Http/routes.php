<?php

/* ------------------------------------------------------------------------------------------------
 |  Application Routes
 | ------------------------------------------------------------------------------------------------
 */
Route::localizedGroup(function () {
    Route::get('/', [
        'as'    => 'public::home',
        'uses'  => 'PagesController@index'
    ]);

    Route::get('contact', [
        'as'    => 'public::contact.get',
        'uses'  => 'ContactController@getForm'
    ]);

    Route::post('contact', [
        'as'    => 'public::contact.send',
        'uses'  => 'ContactController@sendForm'
    ]);
});

include __DIR__ . '/demo-routes.php';
