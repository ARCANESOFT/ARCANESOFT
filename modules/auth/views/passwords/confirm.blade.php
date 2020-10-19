@extends('auth::_template.master')

<?php /** @var  Illuminate\Support\ViewErrorBag  $errors */ ?>

@section('title')
    @lang('Confirm Password')
@endsection

@section('content')
    <div class="row justify-content-center">
        <div class="col-sm-5 col-xxl-4">
            <div class="card shadow-sm">
                <h4 class="card-header text-center">@lang('Confirm Password')</h4>
                <div class="card-body">
                    <form action="{{ route('auth::password.confirm.store') }}" method="POST">
                        @csrf

                        <p class="small">@lang('Please confirm your password before continuing.')</p>

                        <div class="row g-3">
                            <div class="col-12">
                                <div class="form-label-group">
                                    <input type="password" id="password" name="password"
                                           class="form-control{{ $errors->first('password', ' is-invalid') }}"
                                           placeholder="@lang('Password')" required autofocus autocomplete="current-password">
                                    <label for="password">@lang('Password')</label>
                                    @error('password')
                                    <span class="invalid-feedback font-weight-bold" role="alert">{{ $message }}</span>
                                    @enderror
                                </div>
                            </div>
                            <div class="col-12">
                                <button class="btn btn-lg btn-primary btn-block" type="submit">@lang('Confirm Password')</button>
                            </div>
                        </div>
                    </form>
                </div>

                @if (app('router')->has($route = Authentication\Http\Routes\PasswordResetRoutes::REQUEST))
                <div class="card-footer text-center">
                    <a class="btn btn-link" href="{{ route($route) }}">@lang('Forgot your password?')</a>
                </div>
                @endif
            </div>
        </div>
    </div>
@endsection
