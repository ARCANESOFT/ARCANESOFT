@extends('_templates.default.master')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-6 col-md-offset-3">
                <div class="panel panel-default">
                    <div class="panel-heading">{{ trans('auth.register.form.heading') }}</div>
                    <div class="panel-body">
                        {{ Form::open(['route' => 'auth::register.post', 'role' => 'form', 'method' => 'POST']) }}
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group {{ $errors->first('first_name', 'has-error') }}">
                                        {{ Form::label('first_name', trans('auth::users.attributes.first_name'), ['class' => 'control-label']) }}
                                        {{ Form::text('first_name', old('first_name'), ['class' => 'form-control', 'required', 'autofocus']) }}
                                        @if ($errors->has('first_name'))
                                            <span class="help-block"><strong>{{ $errors->first('first_name') }}</strong></span>
                                        @endif
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group {{ $errors->first('last_name', 'has-error') }}">
                                        {{ Form::label('last_name', trans('auth::users.attributes.last_name'), ['class' => 'control-label']) }}
                                        {{ Form::text('last_name', old('last_name'), ['class' => 'form-control', 'required', 'autofocus']) }}
                                        @if ($errors->has('last_name'))
                                            <span class="help-block"><strong>{{ $errors->first('last_name') }}</strong></span>
                                        @endif
                                    </div>
                                </div>

                                <div class="clearfix visible-md visible-lg"></div>

                                <div class="col-md-6">
                                    <div class="form-group {{ $errors->first('username', 'has-error') }}">
                                        {{ Form::label('username', trans('auth::users.attributes.username'), ['class' => 'control-label']) }}
                                        {{ Form::text('username', old('username'), ['class' => 'form-control', 'required', 'autofocus']) }}
                                        @if ($errors->has('username'))
                                            <span class="help-block"><strong>{{ $errors->first('username') }}</strong></span>
                                        @endif
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group {{ $errors->first('email', 'has-error') }}">
                                        {{ Form::label('email', trans('auth::users.attributes.email'), ['class' => 'control-label']) }}
                                        {{ Form::email('email', old('email'), ['class' => 'form-control', 'required']) }}
                                        @if ($errors->has('email'))
                                            <span class="help-block"><strong>{{ $errors->first('email') }}</strong></span>
                                        @endif
                                    </div>
                                </div>

                                <div class="clearfix visible-md visible-lg"></div>

                                <div class="col-md-6">
                                    <div class="form-group {{ $errors->first('password', 'has-error') }}">
                                        {{ Form::label('password', trans('auth::users.attributes.password'), ['class' => 'control-label']) }}
                                        {{ Form::password('password', ['class' => 'form-control', 'required']) }}
                                        @if ($errors->has('password'))
                                            <span class="help-block"><strong>{{ $errors->first('password') }}</strong></span>
                                        @endif
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group {{ $errors->first('password_confirmation', 'has-error') }}">
                                        {{ Form::label('password_confirmation', trans('auth::users.attributes.password_confirmation'), ['class' => 'control-label']) }}
                                        {{ Form::password('password_confirmation', ['class' => 'form-control', 'required']) }}
                                        @if ($errors->has('password_confirmation'))
                                            <span class="help-block"><strong>{{ $errors->first('password_confirmation') }}</strong></span>
                                        @endif
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                {{ Form::button(trans('auth.register.form.actions.sign-up'), ['type' => 'submit', 'class' => 'btn btn-primary']) }}
                            </div>
                        {{ Form::close() }}
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
