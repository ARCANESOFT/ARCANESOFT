@extends('auth::_template.master')

<?php /** @var  Illuminate\Support\ViewErrorBag  $errors */ ?>

@section('title')
    @lang('Register')
@endsection

@section('content')
    <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
            <div class="card shadow-sm">
                <h4 class="card-header text-center">@lang('Register')</h4>
                <div class="card-body">
                    <form action="{{ route(Authentication\Http\Routes\RegisterRoutes::REGISTER_STORE) }}" method="POST">
                        @csrf

                        <div class="row g-3">
                            {{-- FIRST NAME --}}
                            <div class="col-md-6">
                                <div class="form-floating">
                                    <input type="text" id="first_name" name="first_name" value="{{ old('first_name') }}"
                                           class="form-control{{ $errors->first('first_name', ' is-invalid') }}"
                                           placeholder="@lang('First Name')" required autofocus>
                                    <label for="first_name">@lang('First Name')</label>
                                    @error('first_name')
                                    <span class="invalid-feedback" role="alert">{{ $message }}</span>
                                    @enderror
                                </div>
                            </div>

                            {{-- LAST NAME --}}
                            <div class="col-md-6">
                                <div class="form-floating">
                                    <input type="text" id="last_name" name="last_name" value="{{ old('last_name') }}"
                                           class="form-control{{ $errors->first('last_name', ' is-invalid') }}"
                                           placeholder="@lang('Last Name')" required autofocus>
                                    <label for="last_name">@lang('Last Name')</label>
                                    @error('last_name')
                                    <span class="invalid-feedback" role="alert">{{ $message }}</span>
                                    @enderror
                                </div>
                            </div>

                            {{-- EMAIL --}}
                            <div class="col-12">
                                <div class="form-floating">
                                    <input type="email" id="email" name="email" value="{{ old('email') }}"
                                           class="form-control{{ $errors->first('email', ' is-invalid') }}"
                                           placeholder="@lang('E-Mail Address')" required autofocus>
                                    <label for="email">@lang('E-Mail Address')</label>
                                    @error('email')
                                    <span class="invalid-feedback" role="alert">{{ $message }}</span>
                                    @enderror
                                </div>
                            </div>

                            {{-- PASSWORD --}}
                            <div class="col-md-6">
                                <div class="form-floating">
                                    <input type="password" name="password" id="password" autocomplete="new-password" required
                                           class="form-control{{ $errors->first('password', ' is-invalid') }}" placeholder="@lang('Password')">
                                    <label for="password">@lang('Password')</label>
                                    @error('password')
                                    <span class="invalid-feedback" role="alert">{{ $message }}</span>
                                    @enderror
                                </div>
                            </div>

                            {{-- PASSWORD CONFIRMATION --}}
                            <div class="col-md-6">
                                <div class="form-floating">
                                    <input type="password" name="password_confirmation" id="password_confirmation" autocomplete="new-password" required
                                           class="form-control{{ $errors->first('password_confirmation', ' is-invalid') }}" placeholder="@lang('Confirm Password')">
                                    <label for="password_confirmation">@lang('Confirm Password')</label>
                                    @error('password_confirmation')
                                    <span class="invalid-feedback" role="alert">{{ $message }}</span>
                                    @enderror
                                </div>
                            </div>

                            {{-- TERMS --}}
                            @if(Arcanesoft\Foundation\Feature::hasTermsFeature())
                            <div class="col-12">
                                <div class="form-check">
                                    <input type="checkbox" class="form-check-input" name="terms" value="yes">
                                    <label class="form-check-label small">
                                        @lang('I agree to the :t and :p', [
                                            't' => link_to_route('public::legal.tos', 'Terms of Service', [], ['target' => '_blank']),
                                            'p' => link_to_route('public::legal.privacy', 'Privacy Policy', [], ['target' => '_blank']),
                                        ])
                                    </label>
                                    @error('terms')
                                    <span class="invalid-feedback" role="alert">{{ $message }}</span>
                                    @enderror
                                </div>
                            </div>
                            @endif

                            {{-- SUBMIT BUTTON --}}
                            <div class="d-grid col-12">
                                <button class="btn btn-lg btn-primary" type="submit">@lang('Register')</button>
                            </div>
                        </div>
                    </form>
                </div>

                @if (Arcanesoft\Foundation\Authorization\Auth::isSocialiteEnabled())
                <div class="card-body pt-2">
                    <h6 class="text-center text-uppercase text-muted mb-3">@lang('Or sign up using')</h6>
                    @include('auth::_partials.social-providers-buttons')
                </div>
                @endif

                @if (app('router')->has($route = Authentication\Http\Routes\LoginRoutes::LOGIN_CREATE))
                <div class="card-footer py-3 text-center">
                    <a href="{{ route($route) }}" class="text-decoration-none">@lang('You have an account? Login')</a>
                </div>
                @endif
            </div>
        </div>
    </div>
@endsection
