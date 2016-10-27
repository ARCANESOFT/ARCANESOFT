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
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <script>
            window.Laravel = <?php echo json_encode(['csrfToken' => csrf_token()]); ?>
        </script>
        @yield('styles')
    </head>
<body>
    @include('_template.default.navigation')

    @yield('content')

    {{-- Scripts --}}
    <script src="/assets/js/vendors.js"></script>
    <script src="/assets/js/app.js"></script>
    @yield('scripts')
</body>
</html>
