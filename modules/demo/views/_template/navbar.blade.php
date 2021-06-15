<nav class="main-navbar navbar navbar-expand-md fixed-top d-flex justify-content-between p-0 shadow-sm">
    <div class="brand-container d-flex align-items-center">
        <v-sidebar-toggler></v-sidebar-toggler>
        <a href="{{ route('demo::dashboard') }}"
           class="brand navbar-link-item flex-grow-1 justify-content-center h4 text-uppercase m-0">
            {{ config('app.name') }}
        </a>
    </div>
    <div class="navbar-menu-wrapper">
        <ul class="navbar-nav flex-row align-items-center navbar-nav-right">
            <li class="nav-item d-none d-lg-block">
                <v-fullscreen-toggler></v-fullscreen-toggler>
            </li>

            <li class="nav-item dropdown">
                <v-notifications-navbar></v-notifications-navbar>
            </li>

            <li class="nav-item">
                <v-skin-mode-toggler></v-skin-mode-toggler>
            </li>

            <li class="nav-item dropdown">
                <a class="navbar-link-item profile-dropdown-menu dropdown-toggle" id="profile-dropdown-menu"
                   href="#" data-toggle="dropdown" aria-expanded="false">
                    <div class="avatar">
                        <img src="{{ asset('/assets/svg/arcanesoft/default-avatar.svg') }}" alt="John DOE" class="rounded-circle bg-light">
                        <span class="status bg-success"></span>
                    </div>
                    <div class="d-none d-sm-inline-block ml-sm-2">
                        <span class="user-name">John DOE</span>
                    </div>
                </a>
                <div class="dropdown-menu dropdown-menu-right mt-0" aria-labelledby="profile-dropdown-menu">
                    <a href="#" class="dropdown-item">
                        <i class="fa fa-fw fa-user mr-2"></i> @lang('Profile')
                    </a>
                    <div class="dropdown-divider"></div>
                    <a href="#" class="dropdown-item">
                        <i class="fa fa-fw fa-user mr-2"></i> @lang('Logout')
                    </a>
                </div>
            </li>
        </ul>
    </div>
</nav>
