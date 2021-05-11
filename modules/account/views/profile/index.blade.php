@extends('_template.master')

<?php /** @var Arcanesoft\Foundation\Authorization\Models\User  $account */ ?>

@section('content')
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-body">
                    {{ $account->avatar_img }}

                    <div class="media-body ml-5">
                        <h4 class="font-weight-bold mb-4">{{ $account->full_name }}</h4>

                        <div class="text-muted mb-4">
                            {{ $account->bio ?? 'no bio' }}
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <a href="{{ route(Account\Http\Web\Routes\Settings\ProfileRoutes::PROFILE_INDEX) }}"
                       class="btn btn-primary">Edit Profile</a>
                </div>
            </div>
        </div>
    </div>
@endsection
