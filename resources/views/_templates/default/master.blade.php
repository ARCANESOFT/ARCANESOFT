<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">
    <head>
        <meta charset="utf-8">
        {{ seo_helper()->renderHtml() }}
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        {{-- Styles --}}
        {{ Html::style(mix('assets/css/app.css')) }}
        <meta name="csrf-token" content="{{ csrf_token() }}">
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

    <footer class="main-footer">
        @include('_templates.default.footer')
    </footer>

    {{-- Scripts --}}
    {{ Html::script(mix('assets/js/manifest.js')) }}
    {{ Html::script(mix('assets/js/vendors.js')) }}
    {{ Html::script(mix('assets/js/app.js')) }}

    @yield('scripts')
</body>
</html>
