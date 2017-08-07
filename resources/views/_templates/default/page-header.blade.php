<header class="main-page-header">
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <h1 class="page-title">@yield('page-title', 'Default title')</h1>
            </div>
            <div class="col-md-6">
                {!! breadcrumbs()->render('public') !!}
            </div>
        </div>
    </div>
</header>
