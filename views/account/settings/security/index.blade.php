@extends('_template.master')

@section('content')
    <div class="row">
        <div class="col-md-3">
            @include('account.settings._partials.navigation')
        </div>
        <div class="col-md-9">
            <section class="mb-5">
                <h2 class="h4">@lang("Edit your password")</h2>
                @include('account.settings.security._components.edit-password')
            </section>

            @if(Arcanesoft\Foundation\Authorization\Auth::isTwoFactorEnabled())
                <section class="mb-5">
                    <h2 class="h4">@lang('Two Factor Authentication')</h2>
                    @livewire(App\Http\Livewire\Account\Settings\Security\TwoFactorAuthentication::VIEW)
                </section>
            @endif

            <section class="mb-5">
                <h2 class="h4">@lang('Browser Sessions')</h2>
                @livewire(App\Http\Livewire\Account\Settings\Security\BrowserSessionsComponent::VIEW)
            </section>
        </div>
    </div>
@endsection
