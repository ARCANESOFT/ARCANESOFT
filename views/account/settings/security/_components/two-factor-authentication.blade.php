<div class="card shadow-sm">
    <div class="card-body">
        <h6>@lang($this->enabled ? 'You have enabled two factor authentication.' : 'You have not enabled two factor authentication.')</h6>
        <p class="form-text mb-0">@lang("When two factor authentication is enabled, you will be prompted for a secure, random token during authentication. You may retrieve this token from your phone's Google Authenticator application.")</p>

        @if ($this->enabled)
            @if ($showingQrCode)
                <p class="mt-4 font-weight-bold small text-gray">
                    @lang("Two factor authentication is now enabled. Scan the following QR code using your phone's authenticator application.")
                </p>

                <div>
                    <a href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2" target="_blank" rel="noopener" class="d-inline-block">
                        <img src="{{ asset('assets/svg/badges/google-play-badge.svg') }}" alt="Get Google Authenticator on Google Play" style="max-height: 3rem;">
                    </a>
                    <a href="https://apps.apple.com/app/google-authenticator/id388497605" target="_blank" rel="noopener" class="d-inline-block">
                        <img src="{{ asset('assets/svg/badges/app-store-badge.svg') }}" alt="Get Google Authenticator on App Store" style="max-height: 3rem;">
                    </a>
                </div>

                <div class="mt-4">{{ $this->qr_code_svg }}</div>
            @endif

            <div class="mt-4">
                @if ($showingRecoveryCodes)
                    <p class="font-weight-bold small text-gray">
                        @lang("Store these recovery codes in a secure password manager. They can be used to recover access to your account if your two factor authentication device is lost.")
                    </p>

                    <div class="mb-4 p-3 d-flex flex-column bg-light font-monospace">
                        @foreach ($this->decrypted_recovery_codes as $code)
                            <span>{{ $code }}</span>
                        @endforeach
                    </div>

                    <button wire:click="regenerateRecoveryCodes"
                            type="button" class="btn btn-sm btn-light">@lang("Regenerate Recovery Codes")</button>
                @else
                    <button wire:click="$toggle('showingRecoveryCodes')"
                            type="button" class="btn btn-sm btn-light">@lang("Show Recovery Codes")</button>
                @endif
            </div>
        @endif
    </div>
    <div class="card-footer d-flex justify-content-end">
        @if($this->enabled)
            <button wire:click="disableTwoFactorAuthentication" wire:loading.attr="disabled"
                    type="button" class="btn btn-sm btn-danger">@lang("Disable Two Factor Authentication")</button>
        @else
            <button wire:click="enableTwoFactorAuthentication" wire:loading.attr="disabled"
                    type="button" class="btn btn-sm btn-primary">@lang("Enable Two Factor Authentication")</button>
        @endif
    </div>
</div>

