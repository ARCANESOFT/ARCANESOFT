<?php

return [
    /* ------------------------------------------------------------------------------------------------
     |  Settings
     | ------------------------------------------------------------------------------------------------
     */
    'supported-locales'      => ['en', 'es', 'fr'],

    'accept-language-header' => true,

    'hide-default-in-url'    => false,

    'facade'                 => 'Localization',

    /* ------------------------------------------------------------------------------------------------
     |  Route
     | ------------------------------------------------------------------------------------------------
     */
    'route'                  => [
        'middleware' => [
            'localization-session-redirect' => true,
            'localization-cookie-redirect'  => false,
            'localization-redirect'         => true,
            'localized-routes'              => true,
        ]
    ],

    /* ------------------------------------------------------------------------------------------------
     |  Locales
     | ------------------------------------------------------------------------------------------------
     */
    // Check the locales in vendor/arcanedev/localization/config/localization.php
];
