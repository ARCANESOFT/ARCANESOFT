<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>{{ config('app.name', 'Laravel') }}</title>
        {{-- Styles --}}
        {{ Html::style('assets/css/app.css') }}
        {{-- CSRF Token --}}
        @include('_template.default.csrf-token')
        @yield('styles')
    </head>
<body>
    <main id="app">
        @include('_template.default.navigation')

        @yield('content')
    </main>

    {{-- Scripts --}}
    {{ Html::script('assets/js/vendors.js') }}
    {{ Html::script('assets/js/app.js') }}
    @yield('scripts')
</body>
</html>
