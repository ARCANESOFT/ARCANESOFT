<div class="card">
    <div class="card-body">
        <p>@lang('Manage and logout your active sessions on other browsers and devices.')</p>
        <p class="mb-0 text-muted small">@lang('If necessary, you may logout of all of your other browser sessions across all of your devices. If you feel your account has been compromised, you should also update your password.')</p>

        @if ($this->sessions->isNotEmpty())
            <div class="mt-3">
                <div class="row g-3">
                    @foreach ($this->sessions as $session)
                        <?php /** @var  Arcanesoft\Foundation\Auth\Models\Session  $session */ ?>
                        <div class="col-12">
                            <div class="d-flex align-items-center">
                                <div class="text-black-50" style="height: 2.5rem; width: 2.5rem;">
                                    @if ($session->device()->isDesktop())
                                        <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                                            <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                        </svg>
                                    @else
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M0 0h24v24H0z" stroke="none"></path><rect x="7" y="4" width="10" height="16" rx="1"></rect><path d="M11 5h2M12 17v.01"></path>
                                        </svg>
                                    @endif
                                </div>
                                <div class="ml-3">
                                    <div class="small text-muted">
                                        {{ $session->os_name }} - {{ $session->client_name }}
                                    </div>

                                    <div class="small">
                                        <small class="text-gray-500">
                                            {{ $session->ip_address }},

                                            @if ($session->isCurrent())
                                                <span class="text-success">{{ __('This device') }}</span>
                                            @else
                                                {{ __('Last active') }} {{ $session->last_activity_at->diffForHumans() }}
                                            @endif
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        @endif
    </div>

    @if ($this->sessions->isNotEmpty())
    <div class="card-footer text-right">
        @unless($confirmingLogout)
            <button wire:click="confirmLogout" wire:loading.attr="disabled"
                    class="btn btn-sm btn-primary">@lang('Logout Other Browser Sessions')</button>
        @else
            <div class="d-flex justify-content-between">
                <button wire:click="$toggle('confirmingLogout')" wire:loading.attr="disabled"
                        class="btn btn-sm btn-secondary">@lang('Cancel')</button>

                <div class="input-group input-group-sm w-auto">
                    <span class="input-group-text" id="confirm-logout-devices">@lang('Are you sure ?')</span>
                    <button wire:click="logoutOtherBrowserSessions" wire:loading.attr="disabled"
                            aria-label="Logout Other Browser Sessions" aria-describedby="confirm-logout-devices"
                            class="btn btn-sm btn-primary">@lang('Confirm')</button>
                </div>
            </div>
        @endif
    </div>
    @endif
</div>
