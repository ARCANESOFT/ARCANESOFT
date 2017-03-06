<nav class="navbar navbar-default navbar-static-top">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#app-navbar-collapse">
                <span class="sr-only">Toggle Navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="{{ url('/') }}">
                {{ config('app.name', 'Laravel') }}
            </a>
        </div>

        <div class="collapse navbar-collapse" id="app-navbar-collapse">
            <ul class="nav navbar-nav">
                &nbsp;
            </ul>

            <ul class="nav navbar-nav navbar-right">
                @if (Auth::guest())
                    @if (Route::has('auth::login.get'))
                        <li>
                            {{ link_to_route('auth::login.get', trans('auth::generals.login')) }}
                        </li>
                    @endif
                    @if (Route::has('auth::register.get'))
                        <li>
                            {{ link_to_route('auth::register.get', trans('auth::generals.register')) }}
                        </li>
                    @endif
                @else
                    @php($user = Auth::user())
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                            {{ $user->full_name }} <span class="caret"></span>
                        </a>
                        <ul class="dropdown-menu" role="menu">
                            @if (($user->isAdmin() || $user->isModerator()) && Route::has('admin::foundation.home'))
                                <li>
                                    {{ link_to_route('admin::foundation.home', 'Dashboard') }}
                                </li>
                                <li class="divider"></li>
                            @elseif ($user->isMember())
                                <li>
                                    {{ link_to_route('account::index', 'Profile') }}
                                </li>
                                <li class="divider"></li>
                            @endif
                            @include('auth._includes.impersonation-nav-item')
                            @include('auth._includes.logout-nav-item')
                        </ul>
                    </li>
                @endif
            </ul>
        </div>
    </div>
</nav>
