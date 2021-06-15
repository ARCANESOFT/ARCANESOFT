<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>@yield('title', 'Auth') | {{ config('app.name') }}</title>
    <meta name="description" content="">

    {{-- CSRF Token --}}
    <meta name="csrf-token" content="{{ csrf_token() }}">

    {{-- Styles --}}
    <link rel="stylesheet" href="{{ mix('css/app.css', 'assets') }}">

    @yield('head')
</head>
<body class="page auth-page">
    <div id="app">
        <main role="main" class="container">
            <div class="text-center mb-4">
                <a href="{{ route('public::index') }}" class="d-block">
                    <img src="{{ asset('assets/svg/app/logo.svg') }}" alt="{{ config('app.name') }}" role="presentation"
                         width="72" height="72">
                </a>
            </div>
            @yield('content')
        </main>

        <p class="mt-5 mb-3 text-muted text-center">{{ config('app.name') }} &copy; | {{ date('Y') }}</p>
    </div>

    <script src="{{ mix('js/app.js', 'assets') }}"></script>
    @yield('scripts')
</body>
</html>
