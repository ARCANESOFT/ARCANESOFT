<?php

Route::group(['prefix'  => 'demo'], function () {
    Route::get('/', [
        'as'    => 'demo::home',
        'uses'  => function () {
            return view('_demo.home');
        },
    ]);
});
