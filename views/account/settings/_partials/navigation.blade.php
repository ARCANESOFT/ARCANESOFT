<?php
/** @var  Arcanesoft\Foundation\Auth\Models\User  $user */
$user = auth()->user();
?>

<div class="card shadow-sm">
    <div class="card-header">@lang('Navigation')</div>
    <div class="list-group list-group-flush">
        <a href="{{ route('account::settings.profile.index') }}"
           class="list-group-item list-group-item-action {{ active(['account::settings.profile.*']) }}"
            {{ is_active(['account::settings.profile.*']) ? 'aria-current="true"' : '' }}
        >@lang('Profile')</a>

        <a href="{{ route('account::settings.security.index') }}"
           class="list-group-item list-group-item-action d-flex justify-content-between align-items-center {{ active(['account::settings.security.*']) }}"
           {{ is_active(['account::settings.security.*']) ? 'aria-current="true"' : '' }}
        >@lang('Account security') @unless($user->hasPassword())<span class="badge bg-danger rounded-pill"><i class="fas fa-exclamation"></i></span>@endunless</a>

        <a href="{{ route('account::settings.linked-accounts.index') }}"
           class="list-group-item list-group-item-action {{ active(['account::settings.linked-accounts.*']) }}"
           {{ is_active(['account::settings.linked-accounts.*']) ? 'aria-current="true"' : '' }}
        >@lang('Linked accounts')</a>
    </div>
</div>
