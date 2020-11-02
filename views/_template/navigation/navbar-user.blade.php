<?php
/** @var  App\Models\User|mixed  $user */
$user = auth(Arcanesoft\Foundation\Authentication\Guard::WEB_USER)->user();
?>
<ul class="navbar-nav ml-md-auto d-md-flex flex-md-row">
    <li class="nav-item">
        <a class="nav-link" href="{{ route('public::home') }}">@lang('Home')</a>
    </li>
    <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbar-dropdown" role="button" data-toggle="dropdown"
           aria-haspopup="true" aria-expanded="false">
            {{ $user->display_name }}
        </a>
        <div class="dropdown-menu dropdown-menu-right dropdown-menu-dark" aria-labelledby="navbar-dropdown">
            <a class="dropdown-item" href="{{ route('account::profile.index') }}">@lang('Profile')</a>
            <a class="dropdown-item" href="{{ route('account::settings.profile.index') }}">@lang('Settings')</a>
            <div class="dropdown-divider"></div>
            <button @click.prevent="logout('{{ route('auth::logout') }}')"
                    class="dropdown-item">@lang('Logout')</button>
        </div>
    </li>
</ul>
