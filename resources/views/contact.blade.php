@section('page-header')
    <h1>Contact us</h1>
@endsection

@section('content')
    <ol class="breadcrumb">
        <li>
            {!! link_to_route('public::home', 'Home') !!}
        </li>
        <li class="active">Contact us</li>
    </ol>

    <div class="row">
        <div class="col-lg-6">
            {!! Form::open(['route' => 'public::contact.post', 'method' => 'POST']) !!}
                {!! csrf_field() !!}
                <h2 class="page-header">Contact Form</h2>
                <div class="row">
                    <div class="col-lg-6">
                        <div class="form-group">
                            {!! Form::text('name', old('name'), ['class' => 'form-control', 'placeholder' => 'Name', 'required' => 'required']) !!}
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="form-group">
                            {!! Form::email('email', old('email'), ['class' => 'form-control', 'placeholder' => 'Email', 'required' => 'required']) !!}
                        </div>
                    </div>
                    <div class="col-xs-12">
                        <div class="form-group">
                            {!! Form::text('subject', old('subject'), ['class' => 'form-control', 'placeholder' => 'Subject', 'required' => 'required']) !!}
                        </div>
                    </div>
                    <div class="col-xs-12">
                        <div class="form-group">
                            {!! Form::textarea('msg', old('msg'), ['class' => 'form-control', 'placeholder' => 'Message', 'required' => 'required', 'rows' => '7']) !!}
                        </div>
                    </div>
                    <div class="col-lg-6">
                        {!! Captcha::display() !!}
                    </div>
                    <div class="col-lg-6 text-right">
                        {!! Form::submit('Submit Form', ['class' => 'btn btn-primary']) !!}
                    </div>
                </div>
            {!! Form::close() !!}
        </div>
    </div>
@endsection

@section('scripts')
    {!! Captcha::script() !!}
    <script>
    </script>
@endsection
