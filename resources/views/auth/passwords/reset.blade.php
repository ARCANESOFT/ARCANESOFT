@extends('_templates.default.master')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-4 col-md-offset-4">
                <div class="panel panel-default">
                    <div class="panel-heading">{{ trans('auth.password-reset.form.heading') }}</div>

                    <div class="panel-body">
                        {{ Form::open(['route' => 'auth::password.process', 'method' => 'POST', 'role' => 'form']) }}
                            {{ Form::hidden('token', $token) }}

                            <div class="form-group {{ $errors->first('email', 'has-error') }}">
                                <div class="input-group">
                                    <span class="input-group-addon"><i class="fa fa-fw fa-at"></i></span>
                                    {{ Form::email('email', old('email'), ['class' => 'form-control', 'required', 'autofocus', 'placeholder' => trans('auth::users.attributes.email')]) }}
                                </div>
                                @if ($errors->has('email'))
                                    <span class="help-block"><strong>{{ $errors->first('email') }}</strong></span>
                                @endif
                            </div>

                            <div class="form-group {{ $errors->first('password', 'has-error') }}">
                                <div class="input-group">
                                    <span class="input-group-addon"><i class="fa fa-fw fa-key"></i></span>
                                    {{ Form::password('password', ['class' => 'form-control', 'required', 'placeholder' => trans('auth::users.attributes.password')]) }}
                                </div>
                                @if ($errors->has('password'))
                                    <span class="help-block"><strong>{{ $errors->first('password') }}</strong></span>
                                @endif
                            </div>

                            <div class="form-group {{ $errors->first('password_confirmation', 'has-error') }}">
                                <div class="input-group">
                                    <span class="input-group-addon"><i class="fa fa-fw fa-key"></i></span>
                                    {{ Form::password('password_confirmation', ['class' => 'form-control', 'required', 'placeholder' => trans('auth::users.attributes.password_confirmation')]) }}
                                </div>
                                @if ($errors->has('password_confirmation'))
                                    <span class="help-block"><strong>{{ $errors->first('password_confirmation') }}</strong></span>
                                @endif
                            </div>

                            <div class="form-group">
                                {{ Form::button(trans('auth.password-reset.form.actions.reset'), ['type' => 'submit', 'class' => 'btn btn-block btn-primary']) }}
                            </div>
                        {{ Form::close() }}
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
