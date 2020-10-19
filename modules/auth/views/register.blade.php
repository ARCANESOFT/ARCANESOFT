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
                                <div class="form-label-group">
                                    <input type="text" id="first-name" name="first_name" value="{{ old('first_name') }}"
                                           class="form-control {{ $errors->first('first_name', 'is-invalid') }}"
                                           placeholder="@lang('First Name')" required autofocus>
                                    <label for="first-name">@lang('First Name')</label>
                                    @error('first_name')
                                    <span class="invalid-feedback" role="alert"><strong>{{ $message }}</strong></span>
                                    @enderror
                                </div>
                            </div>

                            {{-- LAST NAME --}}
                            <div class="col-md-6">
                                <div class="form-label-group">
                                    <input type="text" id="last-name" name="last_name" value="{{ old('last_name') }}"
                                           class="form-control {{ $errors->first('last_name', 'is-invalid') }}"
                                           placeholder="@lang('Last Name')" required autofocus>
                                    <label for="last-name">@lang('Last Name')</label>
                                    @error('last_name')
                                    <span class="invalid-feedback" role="alert"><strong>{{ $message }}</strong></span>
                                    @enderror
                                </div>
                            </div>

                            {{-- EMAIL --}}
                            <div class="col-12">
                                <div class="form-label-group">
                                    <input type="email" id="email" name="email" value="{{ old('email') }}"
                                           class="form-control {{ $errors->first('email', 'is-invalid') }}"
                                           placeholder="@lang('E-Mail Address')" required autofocus>
                                    <label for="email">@lang('E-Mail Address')</label>
                                    @error('email')
                                    <span class="invalid-feedback" role="alert"><strong>{{ $message }}</strong></span>
                                    @enderror
                                </div>
                            </div>

                            {{-- PASSWORD --}}
                            <div class="col-md-6">
                                <div class="form-label-group">
                                    <input type="password" id="password" name="password"
                                           class="form-control {{ $errors->first('password', 'is-invalid') }}"
                                           placeholder="@lang('Password')" required autocomplete="new-password">
                                    <label for="password">@lang('Password')</label>
                                    @error('password')
                                    <span class="invalid-feedback" role="alert"><strong>{{ $message }}</strong></span>
                                    @enderror
                                </div>
                            </div>

                            {{-- PASSWORD CONFIRMATION --}}
                            <div class="col-md-6">
                                <div class="form-label-group">
                                    <input type="password" id="password-confirm" name="password_confirmation"
                                           class="form-control {{ $errors->first('password_confirmation', 'is-invalid') }}"
                                           placeholder="@lang('Confirm Password')" required autocomplete="new-password">
                                    <label for="password-confirm">@lang('Confirm Password')</label>
                                    @error('password_confirmation')
                                    <span class="invalid-feedback" role="alert"><strong>{{ $message }}</strong></span>
                                    @enderror
                                </div>
                            </div>

                            {{-- REGISTER BUTTON --}}
                            <div class="col-12">
                                <button class="btn btn-lg btn-primary btn-block" type="submit">@lang('Register')</button>
                            </div>
                        </div>
                    </form>
                </div>

                @if (Arcanesoft\Foundation\Auth\Auth::isSocialiteEnabled())
                <div class="card-body pt-2">
                    <h6 class="text-center text-uppercase text-muted mb-3">@lang('Or sign up using')</h6>
                    @include('auth::_partials.social-providers-buttons')
                </div>
                @endif

                @if (app('router')->has($route = Authentication\Http\Routes\LoginRoutes::LOGIN_CREATE))
                <div class="card-footer py-3 text-center">
                    <a href="{{ route($route) }}" class="text-decoration-none">@lang("You have an account? Login")</a>
                </div>
                @endif
            </div>
        </div>
    </div>
@endsection
