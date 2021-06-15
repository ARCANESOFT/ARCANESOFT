<header class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
    <div class="container">
        {{-- LOGO --}}
        <a class="navbar-brand" href="{{ route('public::index') }}">
            {{ config('app.name') }}
        </a>

        {{-- HAMBURGER BTN --}}
        <button class="navbar-toggler" type="button"
                data-bs-toggle="collapse" data-bs-target="#main-navbar-collapse"
                aria-controls="main-navbar-collapse" aria-expanded="false" aria-label="@lang('Toggle navigation')">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="main-navbar-collapse">
            <ul class="navbar-nav mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link {{ active('public::index') }}"
                       href="{{ route('public::index') }}">@lang('Home')</a>
                </li>

                <li class="nav-item">
                    <a class="nav-link {{ active('public::about-us') }}"
                       href="{{ route('public::about-us') }}">@lang('About us')</a>
                </li>

                <li class="nav-item">
                    <a class="nav-link {{ active('public::contact.get') }}"
                       href="{{ route('public::contact.get') }}">@lang('Contact')</a>
                </li>
            </ul>

            @auth(Arcanesoft\Foundation\Authentication\Guard::WEB_USER)
                @include('_template.navigation.navbar-user')
            @elseauth(Arcanesoft\Foundation\Authentication\Guard::WEB_ADMINISTRATOR)
                @include('_template.navigation.navbar-administrator')
            @else
                @include('_template.navigation.navbar-guest')
            @endif
        </div>
    </div>
</header>
