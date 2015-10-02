@extends('admin::_templates.master')

@section('content')
    <div class="row">

        <div class="col-sm-offset-2 col-sm-8 col-md-offset-3 col-md-6 col-lg-offset-4 col-lg-4">
            <div class="logo">
                {!! Html::image(config('cms.logo', 'assets/img/logo.png'), config('cms.name', 'ARCANESOFT'), ['class' => 'img-responsive']) !!}
            </div>

            {!! Form::open(['route' => 'auth::login.post', 'method' => 'POST', 'class'  => 'form-login']) !!}
            {!! csrf_field() !!}
            <h2 class="heading">Welcome Back!</h2>

            <div class="form-group {{ $errors->has('email') ? 'has-error' : '' }}">
                {!! Form::label('email', 'Email address', ['class' => 'control-label sr-only']) !!}
                <div class="input-group">
                        <span class="input-group-addon">
                            <i class="fa fa-at"></i>
                        </span>
                    {!! Form::email('email', old('email'), ['class' => 'form-control', 'placeholder' => 'Email address', 'required' => '', 'autofocus' => '']) !!}
                </div>

                {!! $errors->first('email', '<span class="help-block">:message</span>') !!}
            </div>

            <div class="form-group {{ $errors->has('password') ? 'has-error' : '' }}">
                {!! Form::label('password', 'Password', ['class' => 'control-label sr-only']) !!}
                <div class="input-group">
                        <span class="input-group-addon">
                            <i class="fa fa-key"></i>
                        </span>
                    {!! Form::password('password', ['class' => 'form-control', 'placeholder' => 'Password', 'required' => '']) !!}
                </div>

                {!! $errors->first('password', '<span class="help-block">:message</span>') !!}
            </div>

            <div class="checkbox">
                <label>
                    {!! Form::checkbox('remember') !!} Remember Me
                </label>
            </div>

            {!! Form::submit('Sign in', ['class' => 'btn btn-lg btn-success btn-block']) !!}
            {!! Form::close() !!}

            <div class="form-info">
                {!! link_to_route('auth::register.get', 'Don\'t have an account? Sign up', null, ['class' => 'btn btn-primary btn-block']) !!}
            </div>
        </div>
    </div>
@endsection

@section('scripts')
    <script>

    </script>
@endsection