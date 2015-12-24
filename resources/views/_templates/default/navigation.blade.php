<nav class="navbar navbar-default navbar-fixed-top">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>

            {!! link_to_route('public::home', config('cms.name', 'ARCANESOFT'), [], ['class' => 'navbar-brand']) !!}
        </div>
        <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav navbar-right">
                <li class="{{ route_is('public::home') ? 'active' : '' }}">
                    {!! link_to_route('public::home', 'Home') !!}
                </li>
                <li class="{{ route_is('public::about.us') ? 'active' : '' }}">
                    {!! link_to_route('public::about.us', 'About us') !!}
                </li>
                <li class="{{ route_is('public::contact.get') ? 'active' : '' }}">
                    {!! link_to_route('public::contact.get', 'Contact') !!}
                </li>
            </ul>
        </div>
    </div>
</nav>
