<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>@yield('title', config('app.name'))</title>
    <meta name="description" content="">

    {{-- CSRF Token --}}
    <meta name="csrf-token" content="{{ csrf_token() }}">

    {{-- Styles --}}
    <link rel="stylesheet" href="{{ mix('css/app.css', 'assets') }}">
    <link rel="shortcut icon" type="image/x-icon" href="{{ asset('favicon.ico') }}" />

    @stack('head')
</head>
<body class="page">
    <div id="app">
        @include('_template.navigation')

        <main role="main" class="container">
            @yield('content')
        </main>

        @include('_template.footer')

        @if (auth()->check() && impersonator()->isImpersonating())
            <v-impersonated-user
                url="{{ route('auth::impersonate.stop') }}"
                title="@lang('Stop Impersonation')"/>
        @endif

        @stack('modals')
    </div>

    <script src="{{ mix('js/app.js', 'assets') }}"></script>
    @stack('scripts')
</body>
</html>
