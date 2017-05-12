<li>
    <a href="#" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
        <i class="fa fa-sign-out"></i> {{ trans('auth::generals.logout') }}
    </a>
    <form id="logout-form" action="{{ route('auth::logout') }}" method="POST" style="display: none;">
        {{ csrf_field() }}
    </form>
</li>
