@if (Arcanedev\LaravelAuth\Services\UserImpersonator::isEnabled() && Arcanedev\LaravelAuth\Services\UserImpersonator::isImpersonating())
    <li>
        {{ link_to_route('auth::users.impersonate.stop', 'Stop Impersonate') }}
    </li>
    <li class="divider"></li>
@endif
