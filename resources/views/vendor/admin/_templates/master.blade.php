<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ config('cms.name', 'ARCANESOFT') }}</title>
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="{{ asset('favicon.ico') }}">
    {{-- STYLE --}}
    {!! Html::style('assets/css/style.css') !!}

    {{-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries --}}
    <!--[if lt IE 9]>
    {!! Html::script('https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js') !!}
    {!! Html::script('https://oss.maxcdn.com/respond/1.4.2/respond.min.js') !!}
    <![endif]-->
</head>
<body class="auth-page">
    <div class="container">
        @yield('content')
    </div>

    @include('admin::_templates.footer')

    {{-- SCRIPTS --}}
    {!! Html::script('assets/js/vendors.js') !!}
    {!! Html::script('assets/js/app.js') !!}
    {!! Html::script('assets/js/auth.js') !!}
    @yield('scripts')
</body>
</html>