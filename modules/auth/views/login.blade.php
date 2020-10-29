@extends('auth::_template.master')

<?php /** @var  Illuminate\Support\ViewErrorBag  $errors */ ?>

@section('title')
    @lang('Login')
@endsection

@section('content')
    <div class="row justify-content-center">
        <div class="col-md-6 col-lg-5">
            <div class="card shadow-sm">
                <h4 class="card-header text-center">@lang('Login')</h4>
                <div class="card-body">
                    @if (session('status'))
                        <p class="font-weight-bold small text-success">{{ session('status') }}</p>
                    @endif

                    <form action="{{ route(Authentication\Http\Routes\LoginRoutes::LOGIN_STORE) }}" method="POST">
                        @csrf

                        <div class="row g-3">
                            <div class="col-lg-12">
                                {{-- EMAIL --}}
                                <div class="form-label-group">
                                    <input type="email" id="email" name="email" value="{{ old('email') }}"
                                           class="form-control{{ $errors->first('email', ' is-invalid') }}"
                                           placeholder="@lang('E-Mail Address')" required autofocus autocomplete="username">
                                    <label for="email">@lang('E-Mail Address')</label>
                                    @error('email')
                                    <span class="invalid-feedback" role="alert"><strong>{{ $message }}</strong></span>
                                    @enderror
                                </div>
                            </div>

                            <div class="col-lg-12">
                                {{-- PASSWORD --}}
                                <div class="form-label-group">
                                    <input type="password" id="password" name="password"
                                           class="form-control{{ $errors->first('email', ' is-invalid') }}"
                                           placeholder="@lang('Password')" required autocomplete="current-password">
                                    <label for="password">@lang('Password')</label>
                                    @error('password')
                                    <span class="invalid-feedback" role="alert"><strong>{{ $message }}</strong></span>
                                    @enderror
                                </div>
                            </div>

                            <div class="col-lg-12">
                                {{-- REMEMBER ME --}}
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="yes" id="remember" {{ old('remember') ? 'checked' : '' }}>
                                    <label class="form-check-label" for="remember">@lang('Remember Me')</label>
                                </div>
                            </div>

                            <div class="col-lg-12">
                                <button class="btn btn-lg btn-primary btn-block" type="submit">@lang('Login')</button>
                            </div>
                        </div>
                    </form>

                    @if (app('router')->has($route = Authentication\Http\Routes\PasswordResetRoutes::REQUEST))
                        <a href="{{ route($route) }}" class="d-block text-decoration-none mt-3 text-center">@lang('Forgot your password?')</a>
                    @endif
                </div>

                @if (Arcanesoft\Foundation\Authorization\Auth::isSocialiteEnabled())
                <div class="card-body pt-2">
                    <h6 class="text-center text-uppercase text-muted mb-3">@lang('Or login using')</h6>
                    @include('auth::_partials.social-providers-buttons')
                </div>
                @endif

                @if (app('router')->has($route = Authentication\Http\Routes\RegisterRoutes::REGISTER_CREATE))
                <div class="card-footer py-3 text-center">
                    <a href="{{ route($route) }}"
                       class="text-decoration-none">@lang("Don't have an account? Sign up")</a>
                </div>
                @endif
            </div>
        </div>
    </div>
@endsection
