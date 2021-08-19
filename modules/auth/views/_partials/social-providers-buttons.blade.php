<div class="d-flex flex-column flex-md-row justify-content-md-between mb-3">
    @foreach(Arcanesoft\Foundation\Authorization\Socialite::getEnabledProviders() as $key => $provider)
        <a href="{{ route('auth::login.socialite.show', [$key]) }}"
           class="btn btn-social bg-social-{{ $key }} text-white flex-fill"
           title="{{ $provider->name }}">
            <i class="{{ $provider->icon }}"></i>
        </a>
    @endforeach
</div>
