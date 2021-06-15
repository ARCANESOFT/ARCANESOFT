<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="h-100">
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', config('app.name'))</title>
    <link rel="shortcut icon" type="image/png" href="{{ asset('favicon.ico') }}">
    <link rel="stylesheet" href="{{ asset(mix('css/arcanesoft.css', 'assets')) }}">
    @stack('head')
</head>
<?php
$attributes = new Illuminate\View\ComponentAttributeBag([
    'data-skin-mode'       => 'dark',
    'data-sidebar-visible' => 'true',
]);
?>
<body {{ $attributes->merge(['class' => 'h-100']) }}>
    {{-- APP CONTAINER --}}
    <div id="arcanesoft" class="app-container h-100">
        @include('demo::_template.navbar')

        @include('demo::_template.sidebar')

        <main class="main-container d-flex flex-column h-100">
            <div class="page-container flex-shrink-0">
                @include('demo::_template.page-header')

                <section class="content-wrapper p-3">
                    @stack('content-nav')

                    @yield('content')
                </section>
            </div>

            @include('demo::_template.footer')
        </main>

        <toasts-manager-component></toasts-manager-component>
    </div>

    {{-- MODALS --}}
    @stack('modals')

    {{-- SCRIPTS --}}
    <script src="{{ asset(mix('js/arcanesoft.js', 'assets')) }}"></script>
    @stack('scripts')
    <script defer>Foundation.run()</script>
</body>
</html>
