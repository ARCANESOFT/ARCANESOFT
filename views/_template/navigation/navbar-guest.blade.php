<ul class="navbar-nav ms-md-auto d-md-flex flex-md-row">
    @if(app('router')->has('auth::login.create'))
    <li class="nav-item d-grid d-md-flex">
        <a class="btn btn-outline-light mt-2 mt-md-0"
           href="{{ route('auth::login.create') }}">@lang('Log in')</a>
    </li>
    @endif

    @if(app('router')->has('auth::register.create'))
    <li class="nav-item d-grid d-md-flex">
        <a class="btn btn-warning mt-2 mt-md-0 ms-md-2"
           href="{{ route('auth::register.create') }}">@lang('Register')</a>
    </li>
    @endif
</ul>
