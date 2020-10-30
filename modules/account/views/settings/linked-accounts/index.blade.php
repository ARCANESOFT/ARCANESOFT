@extends('_template.master')

<?php /** @var  Arcanesoft\Foundation\Authorization\Models\User  $account */ ?>

@section('content')
    <h1>@lang('Settings')</h1>

    <div class="row">
        <div class="col-md-3">
            @include('account::settings._partials.navigation')
        </div>
        <div class="col-md-9">
            <div class="card">
                <div class="card-header">@lang('Linked Account')</div>
                <table class="table table-hover table-borderless mb-0">
                    <thead>
                        <tr>
                            <th>Provider</th>
                            <th class="text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    @foreach(Arcanesoft\Foundation\Authorization\Socialite::getEnabledProviders() as $key => $provider)
                        <tr>
                            <td>{{ $provider['name'] }}</td>
                            <td class="text-right">
                                @if ($account->hasLinkedAccount($key))
                                    <a href="#" class="btn btn-sm text-danger">@lang('Disconnect')</a>
                                @else
                                    <a href="#" class="btn btn-sm">@lang('Connect')</a>
                                @endif
                            </td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
@endsection
