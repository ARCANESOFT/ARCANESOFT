<?php
/** @var  Arcanesoft\Foundation\Authorization\Models\Administrator  $administrator */
$administrator = auth(Arcanesoft\Foundation\Authentication\Guard::WEB_ADMINISTRATOR)->user();
?>
<ul class="navbar-nav ms-md-auto d-md-flex flex-md-row">
    <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbar-dropdown" role="button" data-bs-toggle="dropdown"
           aria-haspopup="true" aria-expanded="false">
            {{ $administrator->display_name }}
        </a>
        <div class="dropdown-menu dropdown-menu-right dropdown-menu-dark" aria-labelledby="navbar-dropdown">
            <a class="dropdown-item" href="{{ route('admin::index') }}">@lang('Dashboard')</a>
            <a class="dropdown-item" href="{{ route('admin::authorization.profile.index') }}">@lang('Profile')</a>
            <div class="dropdown-divider"></div>
            <button @click.prevent="logout('{{ route('auth::logout') }}')"
                    class="dropdown-item">@lang('Log out')</button>
        </div>
    </li>
</ul>
