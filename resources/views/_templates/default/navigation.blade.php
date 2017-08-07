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
                {{----------------}}
            </ul>

            <ul class="nav navbar-nav navbar-right">
                @if (Route::has('public::blog.posts.index'))
                    <li class="{{ active(['public::blog.*']) }}">
                        {{ link_to_route('public::blog.posts.index', 'Blog') }}
                    </li>
                @endif

                @include('auth._includes.navbar-items')
            </ul>
        </div>
    </div>
</nav>
