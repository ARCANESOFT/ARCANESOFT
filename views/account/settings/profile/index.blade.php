@extends('_template.master')

<?php /** @var  App\Models\User  $account */ ?>

@section('content')
    <div class="row">
        <div class="col-md-3">
            @include('account.settings._partials.navigation')
        </div>
        <div class="col-md-9">
            <section class="mb-4">
                <h2 class="h4">@lang('Edit profile')</h2>

                {{ form()->open(['route' => 'account::settings.profile.update', 'method' => 'PUT']) }}
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-lg-7">
                                {{-- EMAIL --}}
                                <div class="mb-3">
                                    <label for="email" class="form-label">@lang('Email address')</label>
                                    {{ form()->email('email', old('email', $account->email), ['id' => 'email', 'class' => 'form-control'.$errors->first('email', ' is-invalid'), 'required']) }}
                                    @error('email')
                                    <span class="invalid-feedback" role="alert"><strong>{{ $message }}</strong></span>
                                    @enderror
                                </div>

                                {{-- USERNAME --}}
                                <div class="mb-3">
                                    <label for="username" class="form-label">@lang('Username')</label>
                                    {{ form()->text('username', old('username', $account->username), ['id' => 'username', 'class' => 'form-control'.$errors->first('username', ' is-invalid')]) }}
                                    @error('username')
                                    <span class="invalid-feedback" role="alert"><strong>{{ $message }}</strong></span>
                                    @enderror
                                </div>

                                {{-- FIRST NAME --}}
                                <div class="mb-3">
                                    <label for="first_name" class="form-label">@lang('First name')</label>
                                    {{ form()->text('first_name', old('first_name', $account->first_name), ['id' => 'first_name', 'class' => 'form-control'.$errors->first('first_name', ' is-invalid')]) }}
                                    @error('first_name')
                                    <span class="invalid-feedback" role="alert"><strong>{{ $message }}</strong></span>
                                    @enderror
                                </div>

                                {{-- LAST NAME --}}
                                <div class="mb-3">
                                    <label for="last_name" class="form-label">@lang('Last name')</label>
                                    {{ form()->text('last_name', old('last_name', $account->last_name), ['id' => 'last_name', 'class' => 'form-control'.$errors->first('last_name', ' is-invalid')]) }}
                                    @error('last_name')
                                    <span class="invalid-feedback" role="alert"><strong>{{ $message }}</strong></span>
                                    @enderror
                                </div>
                            </div>
                            <div class="col-lg-5">

                            </div>

                        </div>
                    </div>
                    <div class="card-footer d-flex justify-content-end">
                        <button type="submit" class="btn btn-sm btn-primary">@lang('Save')</button>
                    </div>
                </div>
                {{ form()->close() }}
            </section>

            @unless($account->hasVerifiedEmail())
            <section class="mb-4">
                <h2 class="h4">@lang('Verify your email address')</h2>
                <div class="card">
                    <div class="card-body">
                        <div class="alert alert-warning" role="alert">
                            <h5 class="alert-heading">@lang('Your email is not verified!')</h5>
                            <p class="mb-0">@lang('Please verify your email address so we know that it\'s really you.')</p>
                        </div>

                        <a href="{{ route('auth::verification.notice') }}"
                           class="btn btn-primary">@lang('Verify my email address')</a>
                    </div>
                </div>
            </section>
            @endunless

            <section class="mb-4">
                <h2 class="h4 text-danger">@lang('Delete account')</h2>
                <div class="card">
                    <div class="card-body">
                        <p class="small font-weight-bold">
                            @lang("Once your account is deleted, all of its resources and data will be permanently deleted.")
                            @lang("Before deleting your account, please download any data or information that you wish to retain.")
                        </p>

                        <p class="small">
                            @lang("There is some data that we are legally required to keep.")
                            <a href="#" class="text-decoration-none">@lang('Learn more about deleting your account')</a>
                        </p>

                        <button type="submit" class="btn btn-sm btn-danger">@lang('Delete account')</button>
                    </div>
                </div>
            </section>
        </div>
    </div>
@endsection
