{{ form()->open(['route' => 'account::settings.security.password.update', 'method' => 'PUT']) }}
<div class="card shadow-sm">
    <div class="card-body">
        @unless($user->hasPassword())
            <p class="small text-danger">
                <strong>@lang("Your account is not secured!")</strong> @lang("You must provide a new password to protect it.")
            </p>
        @endunless

        <div class="row g-3 w-50 mb-3">
            @if($user->hasPassword())
                <div class="col-12">
                    <label for="current_password" class="form-label">@lang('Current Password')</label>
                    <input type="password" class="form-control{{ $errors->first('current_password', ' is-invalid') }}"
                           name="current_password" id="current_password" required autocomplete="current-password">
                    @error('current_password')
                    <span class="invalid-feedback" role="alert">{{ $message }}</span>
                    @enderror
                </div>
            @endif

            <div class="col-12">
                <label for="password" class="form-label">@lang('Password')</label>
                <input type="password" class="form-control{{ $errors->first('password', ' is-invalid') }}"
                       name="password" id="password" required autocomplete="new-password">
                @error('password')
                <span class="invalid-feedback" role="alert">{{ $message }}</span>
                @enderror
            </div>
            <div class="col-12">
                <label for="password_confirmation" class="form-label">@lang('Confirm Password')</label>
                <input type="password" class="form-control{{ $errors->first('password_confirmation', ' is-invalid') }}"
                       name="password_confirmation" id="password_confirmation" required autocomplete="new-password">
                @error('password_confirmation')
                <span class="invalid-feedback" role="alert">{{ $message }}</span>
                @enderror
            </div>
        </div>

        <div id="passwordHelp" class="form-text">
            @lang("Make sure it's at least :length characters OR at least :min characters including a number and a lowercase letter.", ['length' => 15, 'min' => 8])
        </div>
    </div>
    <div class="card-footer d-flex justify-content-end">
        <button type="submit" class="btn btn-sm btn-primary">@lang('Update password')</button>
    </div>
</div>
{{ form()->close() }}
