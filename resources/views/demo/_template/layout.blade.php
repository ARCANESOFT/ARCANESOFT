<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>AdminLTE 2 | Dashboard</title>
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    {{ Html::style('vendor/foundation/css/app.css') }}

    <!--[if lt IE 9]>
    {{ Html::script('https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js') }}
    {{ Html::script('https://oss.maxcdn.com/respond/1.4.2/respond.min.js') }}
    <![endif]-->
</head>
<body class="hold-transition skin-blue sidebar-mini">
    <main id="app">
        @yield('content')
    </main>

    {{ Html::script('vendor/foundation/js/vendors.js') }}
    {{ Html::script('vendor/foundation/js/app.js') }}

    {{-- AdminLTE dashboard demo (This is only for demo purposes) --}}
    {{ Html::script('demo-assets/js/dashboard.js') }}
</body>
</html>
