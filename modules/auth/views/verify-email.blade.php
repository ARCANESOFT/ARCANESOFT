@extends('auth::_template.master')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card shadow-sm">
                <h4 class="card-header text-center">@lang('Email verification')</h4>
                <div class="card-body">
                    <p class="small">
                        @lang('Thanks for signing up!')
                        @lang('Before getting started, could you verify your email address by clicking on the link we just emailed to you?')
                        @lang("If you didn't receive the email, we will gladly send you another.")
                    </p>
                    @if (session('status') == 'verification-link-sent')
                        <p class="small text-success">@lang('A new verification link has been sent to the email address you provided during registration.')</p>
                    @endif
                    <form action="{{ route(Authentication\Http\Routes\EmailVerificationRoutes::SEND) }}" method="POST">
                        @csrf
                        <div class="d-grid">
                            <button type="submit" class="btn btn-primary">@lang('Resend verification email')</button>
                        </div>
                    </form>
                </div>
                <div class="card-footer">
                    <form action="{{ route('auth::logout') }}" method="POST">
                        @method('DELETE')
                        @csrf
                        <button class="btn btn-link m-0 p-0">@lang('Logout')</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
