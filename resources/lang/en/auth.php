<?php

return [

    /* -----------------------------------------------------------------
     |  Authentication Language Lines
     | -----------------------------------------------------------------
     */

    'failed'   => 'These credentials do not match our records.',
    'throttle' => 'Too many login attempts. Please try again in :seconds seconds.',

    /* -----------------------------------------------------------------
     |  Login
     | -----------------------------------------------------------------
     */

    'login' => [
        'form' => [
            'heading'     => 'Login',
            'remember-me' => 'Remember Me',
            'actions'     => [
                'login'    => 'Login',
                'register' => 'Don\'t have an account ? Sign up',
                'forget'   => 'Forgot Your Password?',
            ],
        ],
    ],

    /* -----------------------------------------------------------------
     |  Register
     | -----------------------------------------------------------------
     */

    'register' => [
        'form' => [
            'heading' => 'Sign up',
            'actions' => [
                'sign-up' => 'Sign up',
                'login'   => 'Already have an account ? Sign in',
            ],
        ],
    ],

    /* -----------------------------------------------------------------
     |  Password Reset
     | -----------------------------------------------------------------
     */

    'password-reset' => [
        'form'  => [
            'heading' => 'Reset Password',
            'actions' => [
                'send'     => 'Send Password Reset Link',
                'reset'    => 'Reset',
                'login'    => 'You\'ve remembered your password ? Sign in',
                'register' => 'Don\'t have an account ? Sign up',
            ],
        ],

        'email' => [
            'subject' => 'Reset Password - :name',
            'line-1'  => 'You are receiving this email because we received a password reset request for your account.',
            'line-2'  => 'If you did not request a password reset, no further action is required.',
            'action'  => 'Reset Password',
        ],
    ],

];
