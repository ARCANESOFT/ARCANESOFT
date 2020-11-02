<header class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
    <div class="container">
        <a class="navbar-brand" href="{{ route('public::index') }}">
            {{ config('app.name') }}
        </a>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-navbar-collapse"
                aria-controls="main-navbar-collapse" aria-expanded="false" aria-label="@lang('Toggle navigation')">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="main-navbar-collapse">
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
