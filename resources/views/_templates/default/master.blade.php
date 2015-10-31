<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    {{--{!! seo_helper()->render() !!}--}}
    {!! seo_helper()->meta()->render() !!}
    <link rel="icon" href="{{ asset('favicon.ico') }}">

    {{-- STYLE --}}
    {!! Html::style('assets/css/style.css') !!}

    {{-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries --}}
    <!--[if lt IE 9]>
    {!! Html::script('https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js') !!}
    {!! Html::script('https://oss.maxcdn.com/respond/1.4.2/respond.min.js') !!}
    <![endif]-->
</head>
<body class="main">
    @include('_templates.default.navigation')

    @if (Route::is('public::home'))
        @include('_partials.slider')
    @else
        <header class="main-header">
            <div class="container">
                <div class="page-header">
                    @yield('page-header')
                </div>

                {!! breadcrumbs()->render('public') !!}
            </div>
        </header>
    @endif

    <main class="main-container">
        <div class="container">
            @yield('content')
        </div>
    </main>

    <footer class="main-footer">
        @include('_templates.default.footer')
    </footer>

    {{-- SCRIPTS --}}
    {!! Html::script('assets/js/vendors.js') !!}
    {!! Html::script('assets/js/app.js') !!}
    @include('_templates.default.notifications')

    @yield('scripts')
</body>
</html>
