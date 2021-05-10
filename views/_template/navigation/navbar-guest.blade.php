<ul class="navbar-nav ms-md-auto d-md-flex flex-md-row">
    @if(app('router')->has('auth::login.create'))
    <li class="nav-item">
        <a class="nav-link" href="{{ route('auth::login.create') }}">@lang('Log in')</a>
    </li>
    @endif

    @if(app('router')->has('auth::register.create'))
    <li class="nav-item">
        <a class="nav-link" href="{{ route('auth::register.create') }}">@lang('Register')</a>
    </li>
    @endif
</ul>
