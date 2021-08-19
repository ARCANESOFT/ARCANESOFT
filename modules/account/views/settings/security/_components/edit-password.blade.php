{{ form()->open(['route' => 'account::settings.security.password.update', 'method' => 'PUT']) }}
<div class="card shadow-sm">
    <div class="card-body">
        @unless($user->hasPassword())
            <p class="small text-danger">
                <strong>@lang("Your account is not secured!")</strong> @lang("You must provide a new password to protect it.")
            </p>
        @endunless

        <div class="row row-cols-1 g-3 w-50 mb-3">
            @if($user->hasPassword())
                <div class="col">
                    <div class="form-floating">
                        <input type="password" name="current_password" id="current_password" autocomplete="current-password" required
                               class="form-control{{ $errors->first('current_password', ' is-invalid') }}" placeholder="@lang('Current Password')">
                        <label for="current_password">@lang('Current Password')</label>
                        @error('current_password')
                        <span class="invalid-feedback" role="alert">{{ $message }}</span>
                        @enderror
                    </div>
                </div>
            @endif

            <div class="col">
                <div class="form-floating">
                    <input type="password" name="password" id="password" autocomplete="new-password" required
                           class="form-control{{ $errors->first('password', ' is-invalid') }}" placeholder="@lang('Password')">
                    <label for="password">@lang('Password')</label>
                    @error('password')
                    <span class="invalid-feedback" role="alert">{{ $message }}</span>
                    @enderror
                </div>
            </div>

            <div class="col">
                <div class="form-floating">
                    <input type="password" name="password_confirmation" id="password_confirmation" autocomplete="new-password" required
                           class="form-control{{ $errors->first('password_confirmation', ' is-invalid') }}" placeholder="@lang('Confirm Password')">
                    <label for="password_confirmation">@lang('Confirm Password')</label>
                    @error('password_confirmation')
                    <span class="invalid-feedback" role="alert">{{ $message }}</span>
                    @enderror
                </div>
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
