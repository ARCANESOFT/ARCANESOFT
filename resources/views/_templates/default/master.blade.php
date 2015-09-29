<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    {{ Html::style('assets/css/style.css') }}
</head>
<body>

    @yield('content')

    @include('_templates.default.footer')

    {{ Html::script('assets/js/vendors.js') }}
    {{ Html::script('assets/js/app.js') }}
    @yield('scripts')
</body>
</html>