@extends('_templates.default.master')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-4 col-md-offset-4">
                <div class="panel panel-default">
                    <div class="panel-heading">{{ trans('auth::login.heading') }}</div>
                    <div class="panel-body">
                        {{ Form::open(['route' => 'auth::login.post', 'role' => 'form', 'method' => 'POST']) }}
                            <div class="form-group {{ $errors->first('email', 'has-error') }}">
                                <div class="input-group">
                                    <span class="input-group-addon"><i class="fa fa-fw fa-at"></i></span>
                                    {{ Form::email('email', old('email'), ['class' => 'form-control', 'required', 'autofocus', 'placeholder' => trans('auth::users.email')]) }}
                                </div>
                                @if ($errors->has('email'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('email') }}</strong>
                                    </span>
                                @endif
                            </div>
                            <div class="form-group {{ $errors->first('password', 'has-error') }}">
                                <div class="input-group">
                                    <span class="input-group-addon"><i class="fa fa-fw fa-key"></i></span>
                                    {{ Form::password('password', ['class' => 'form-control', 'required', 'placeholder' => trans('auth::users.password')]) }}
                                </div>
                                @if ($errors->has('password'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('password') }}</strong>
                                    </span>
                                @endif
                            </div>
                            <div class="form-group">
                                <div class="checkbox">
                                    <label>
                                        {{ Form::checkbox('remember') }} {{ trans('auth::login.remember-me') }}
                                    </label>
                                </div>
                            </div>
                            <div>
                                {{ Form::button(trans('auth::login.submit'), ['type' => 'submit', 'class' => 'btn btn-primary']) }}
                                @if (Route::has('auth::password.request'))
                                    {{ link_to_route('auth::password.request', trans('auth::login.links.forget'), [], ['class' => 'btn btn-link']) }}
                                @endif
                            </div>
                        {{ Form::close() }}
                    </div>

                    @includeWhen(Arcanedev\LaravelAuth\Services\SocialAuthenticator::isEnabled(), 'auth._includes.social-networks-links')
                </div>
            </div>
        </div>
    </div>
@endsection
