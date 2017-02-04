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
        @include('_templates.default.csrf-token')
        @yield('styles')
    </head>
<body>
    <main id="app">
        @include('_templates.default.navigation')

        @unless(route_is(['public::home', 'auth::*']))
            @include('_templates.default.page-header')
        @endunless

        @yield('content')
    </main>

    {{-- Scripts --}}
    {{ Html::script(mix('assets/js/manifest.js')) }}
    {{ Html::script(mix('assets/js/vendors.js')) }}
    {{ Html::script(mix('assets/js/app.js')) }}

    @yield('scripts')
</body>
</html>
