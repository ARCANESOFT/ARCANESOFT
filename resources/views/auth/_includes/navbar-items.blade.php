@if (Auth::guest())
    @includeWhen(Route::has('auth::login.get'), 'auth._includes.nav-items.login-nav-item')
    @includeWhen(Route::has('auth::register.get'), 'auth._includes.nav-items.register-nav-item')
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
            @includeWhen(impersonator()->isImpersonating(), 'auth._includes._includes.nav-items.impersonation-nav-item')
            @include('auth._includes.nav-items.logout-nav-item')
        </ul>
    </li>
@endif
