@extends('_template.master')

@section('content')
    <div class="row">
        <div class="col-md-3">
            @include('account::settings._partials.navigation')
        </div>
        <div class="col-md-9">
            <div class="row row-cols-1 g-5">
                <section class="col">
                    <h2 class="h4 mb-3">@lang('Edit your password')</h2>
                    @include('account::settings.security._components.edit-password')
                </section>

                @if(Arcanesoft\Foundation\Authorization\Auth::isTwoFactorEnabled())
                    <section class="col">
                        <h2 class="h4 mb-3">@lang('Two Factor Authentication')</h2>
                        <v-account-settings-two-factor-authentication></v-account-settings-two-factor-authentication>
                    </section>
                @endif

                <section class="col">
                    <h2 class="h4 mb-3">@lang('Browser Sessions')</h2>
                    <v-account-settings-browser-sessions></v-account-settings-browser-sessions>
                </section>
            </div>
        </div>
    </div>
@endsection
