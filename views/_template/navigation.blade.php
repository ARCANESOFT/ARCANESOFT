<header class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
    <div class="container">
        <a class="navbar-brand" href="{{ route('public::index') }}">
            {{ config('app.name') }}
        </a>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsDefault"
                aria-controls="navbarsDefault" aria-expanded="false" aria-label="@lang('Toggle navigation')">
            <span class="navbar-toggler-icon"></span>
        </button>

        <ul class="navbar-nav flex-row ml-md-auto d-none d-md-flex">
            @auth(Arcanesoft\Foundation\Authentication\Guard::WEB_USER)
                <?php
                    /** @var  App\Models\User|mixed  $user */
                    $user = auth(Arcanesoft\Foundation\Authentication\Guard::WEB_USER)->user();
                ?>
                <li class="nav-item">
                    <a class="nav-link" href="{{ route('public::home') }}">@lang('Home')</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                       aria-haspopup="true" aria-expanded="false">
                        {{ $user->display_name }}
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="{{ route('account::profile.index') }}">@lang('Profile')</a>
                        <a class="dropdown-item" href="{{ route('account::settings.profile.index') }}">@lang('Settings')</a>
                        <div class="dropdown-divider"></div>

                        <a @click.prevent="logout('{{ route('auth::logout') }}')" class="dropdown-item" href="#">
                            @lang('Logout')
                        </a>
                    </div>
                </li>
            @elseauth(Arcanesoft\Foundation\Authentication\Guard::WEB_ADMINISTRATOR)
                <?php
                    /** @var  Arcanesoft\Foundation\Auth\Models\Administrator  $admin */
                    $admin = auth(Arcanesoft\Foundation\Authentication\Guard::WEB_ADMINISTRATOR)->user();
                ?>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                       aria-haspopup="true" aria-expanded="false">
                        {{ $admin->display_name }}
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="{{ route('admin::index') }}">@lang('Dashboard')</a>
                        <a class="dropdown-item" href="{{ route('admin::auth.profile.index') }}">@lang('Profile')</a>
                        <div class="dropdown-divider"></div>
                        <a @click.prevent="logout('{{ route('auth::logout') }}')" class="dropdown-item" href="#">
                            @lang('Logout')
                        </a>
                    </div>
                </li>
            @else
                @if(app('router')->has('auth::login.create'))
                    <li class="nav-item">
                        <a class="nav-link" href="{{ route('auth::login.create') }}">@lang('Login')</a>
                    </li>
                @endif

                @if(app('router')->has('auth::register.create'))
                    <li class="nav-item">
                        <a class="nav-link" href="{{ route('auth::register.create') }}">@lang('Register')</a>
                    </li>
                @endif
            @endif
        </ul>
    </div>
</header>
