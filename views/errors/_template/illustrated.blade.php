<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <title>@yield('title')</title>

        {{-- Fonts --}}
        <link rel="dns-prefetch" href="//fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

        {{-- Styles --}}
        <style>
            * {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
            }

            html, body {
                height: 100%;
            }

            body {
                background-color: #efefef;
            }

            p {
                margin-bottom: .5rem;
            }

            .sans-serif {
                font-family: Nunito, sans-serif;
            }

            .container {
                margin: 0 auto;
                width: auto;
                padding-left: 1rem;
                padding-right: 1rem;
                align-items: center;
            }

            .error-container {
                display: flex;
                flex-direction: column;
            }

            .error-content,
            .error-illustration {
                display: flex;
                flex: 1 1 0;
            }

            .error-content {
                flex-direction: column;
            }

            .error-code {
                font-size: 6rem;
                line-height: .9em;
                color: #65617d;
            }

            .error-code:after {
                content: '';
                display: block;
                margin-top: 1rem;
                margin-bottom: 1rem;
                height: .5rem;
                width: 11rem;
                background-color: #65617d;
                border-radius: 1rem;
            }

            .error-message {
                font-size: 2rem;
            }

            .btn-link {
                text-decoration: none;
                color: #464356;
            }

            .btn-link:hover, .btn-link:focus {
                text-decoration: underline;
            }

            .error-illustration {
                display: flex;
                justify-content: center;
            }

            .error-illustration img,
            .error-illustration svg {
                max-width: 100%;
                max-height: 100vh;
            }

            .d-flex {
                display: flex;
            }

            .h-100 {
                height: 100%;
            }

            .wrapper {
                flex-direction: column;
            }

            .wrapper > header {
                flex: 0 1 auto;
                padding-top: 0.5rem;
                padding-bottom: 0.5rem;
            }

            .wrapper > main {
                flex: 1 1 auto;
            }

            @media (min-width: 744px) {
                .container {
                    width: 696px;
                }

                .error-container {
                    flex-direction: row;
                }
            }

            @media (min-width: 1128px) {
                .container {
                    width: 900px;
                }
            }
        </style>
    </head>
    <body class="error-page sans-serif">
        <div class="d-flex h-100 wrapper">
            <main class="container error-container">
                <div class="error-content">
                    <h1 class="error-code">@yield('code', __('Oh no'))</h1>
                    <p class="error-message">
                        @yield('message')
                    </p>

                    @yield('description')

                    <a href="{{ app('router')->has('public::index') ? route('public::index') : url('/') }}" class="btn-link">
                        {{ __('Return to Home Page') }}
                    </a>
                </div>

                <div class="error-illustration">
                    @yield('illustration')
                </div>
            </main>
        </div>
    </body>
</html>
