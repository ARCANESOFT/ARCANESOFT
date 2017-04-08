<?php

return [

    /* -----------------------------------------------------------------
     |  Authentication Language Lines
     | -----------------------------------------------------------------
     */

    'failed'   => 'Ces identifiants ne correspondent pas à nos enregistrements',
    'throttle' => 'Trop de tentatives de connexion. Veuillez essayer de nouveau dans :seconds secondes.',

    /* -----------------------------------------------------------------
     |  Login
     | -----------------------------------------------------------------
     */

    'login' => [
        'form' => [
            'heading'     => 'Se connecter',
            'remember-me' => 'Se souvenir de moi',
            'actions'     => [
                'login'    => 'Se connecter',
                'register' => 'Vous n\'avez pas un compte? Inscrivez-vous',
                'forget'   => 'Mot de passe oublié?',
            ],
        ],
    ],

    /* -----------------------------------------------------------------
     |  Register
     | -----------------------------------------------------------------
     */

    'register' => [
        'form' => [
            'heading' => 'S\'inscrire',
            'actions' => [
                'sign-up' => 'S\'inscrire',
                'login'   => 'Avez-vous déjà un compte ? Connectez-vous',
            ],
        ],
    ],

    /* -----------------------------------------------------------------
     |  Password Reset
     | -----------------------------------------------------------------
     */

    'password-reset' => [
        'form'  => [
            'heading' => 'Réinitialiser votre mot de passe',
            'actions' => [
                'send'     => 'Envoyer le lien de réinitialisation',
                'reset'    => 'Réinitialiser',
                'login'    => 'Avez-vous souvenu de votre mot de passe? Connectez-vous',
                'register' => 'Vous n\'avez pas un compte? Inscrivez-vous',
            ],
        ],

        'email' => [
            'subject' => 'Réinitialiser votre mot de passe - :name',
            'line-1'  => 'Vous recevez ce courriel parce que nous avons reçu une demande de réinitialisation de mot de passe pour votre compte.',
            'line-2'  => 'Si vous ne l\'avez pas demandé une réinitialisation de mot de passe, aucune autre action est nécessaire.',
            'action'  => 'Réinitialiser le mot de passe',
        ],
    ],
];
