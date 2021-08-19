@extends('auth::_template.master')

<?php /** @var  Illuminate\Support\ViewErrorBag  $errors */ ?>

@section('title')
    @lang('Two Factor Authentication')
@endsection

@section('content')
    <div class="row justify-content-center">
        <div class="col-md-6 col-lg-5">
            <v-page-auth-two-factor-authentication-form
                action="{{ route('auth::login.two-factor.store') }}"/>
        </div>
    </div>
@endsection
