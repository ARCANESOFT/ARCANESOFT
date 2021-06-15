@extends('demo::_template.master')

@section('content')
    <div class="card">
        <div class="card-header">
            <h5 class="mb-0">Avatars</h5>
        </div>

        <div class="card-body">
            <h3 class="text-muted">Examples</h3>
            <div class="avatar">
                <img src="https://picsum.photos/id/100/100" alt="Avatar 1" class="rounded-circle">
            </div>

            <div class="avatar">
                <img src="https://picsum.photos/id/110/100" alt="Avatar 1" class="rounded-circle">
            </div>

            <div class="avatar">
                <img src="https://picsum.photos/id/120/100" alt="Avatar 1" class="rounded-circle">
            </div>

            <div class="avatar">
                <img src="https://picsum.photos/id/130/100" alt="Avatar 1" class="rounded-circle">
            </div>

            <div class="avatar">
                <img src="https://picsum.photos/id/140/100" alt="Avatar 1" class="rounded-circle">
            </div>
        </div>

        <div class="card-body">
            <h3 class="text-muted">Sizes</h3>
            <div class="avatar avatar-sm">
                <img src="https://picsum.photos/id/100/100" alt="Avatar 1" class="rounded-circle">
            </div>

            <div class="avatar avatar-md">
                <img src="https://picsum.photos/id/110/100" alt="Avatar 1" class="rounded-circle">
            </div>

            <div class="avatar avatar-lg">
                <img src="https://picsum.photos/id/120/100" alt="Avatar 1" class="rounded-circle">
            </div>

            <div class="avatar avatar-xl">
                <img src="https://picsum.photos/id/130/100" alt="Avatar 1" class="rounded-circle">
            </div>

            <div class="avatar avatar-xxl">
                <img src="https://picsum.photos/id/140/100" alt="Avatar 1" class="rounded-circle">
            </div>
        </div>

        <div class="card-body">
            <h3 class="text-muted">With custom background color</h3>
            <div class="avatar avatar-lg">
                <img src="{{ asset('/assets/svg/arcanesoft/default-avatar.svg') }}" alt="John DOE" class="rounded-circle">
            </div>
            <div class="avatar avatar-lg">
                <img src="{{ asset('/assets/svg/arcanesoft/default-avatar.svg') }}" alt="John DOE" class="rounded-circle bg-info">
            </div>
            <div class="avatar avatar-lg">
                <img src="{{ asset('/assets/svg/arcanesoft/default-avatar.svg') }}" alt="John DOE" class="rounded-circle bg-success">
            </div>
            <div class="avatar avatar-lg">
                <img src="{{ asset('/assets/svg/arcanesoft/default-avatar.svg') }}" alt="John DOE" class="rounded-circle bg-warning">
            </div>
            <div class="avatar avatar-lg">
                <img src="{{ asset('/assets/svg/arcanesoft/default-avatar.svg') }}" alt="John DOE" class="rounded-circle bg-danger">
            </div>
            <div class="avatar avatar-lg">
                <img src="{{ asset('/assets/svg/arcanesoft/default-avatar.svg') }}" alt="John DOE" class="rounded-circle bg-secondary">
            </div>
            <div class="avatar avatar-lg">
                <img src="{{ asset('/assets/svg/arcanesoft/default-avatar.svg') }}" alt="John DOE" class="rounded-circle bg-primary">
            </div>
            <div class="avatar avatar-lg">
                <img src="{{ asset('/assets/svg/arcanesoft/default-avatar.svg') }}" alt="John DOE" class="rounded-circle bg-light">
            </div>
            <div class="avatar avatar-lg">
                <img src="{{ asset('/assets/svg/arcanesoft/default-avatar.svg') }}" alt="John DOE" class="rounded-circle bg-dark">
            </div>
        </div>

        <div class="card-body">
            <h3 class="text-muted">With custom shapes</h3>
            <div class="avatar avatar-lg">
                <img src="{{ asset('/assets/svg/arcanesoft/default-avatar.svg') }}" alt="John DOE" class="rounded">
            </div>
            <div class="avatar avatar-lg">
                <img src="{{ asset('/assets/svg/arcanesoft/default-avatar.svg') }}" alt="John DOE" class="rounded-top bg-info">
            </div>
            <div class="avatar avatar-lg">
                <img src="{{ asset('/assets/svg/arcanesoft/default-avatar.svg') }}" alt="John DOE" class="rounded-right bg-success">
            </div>
            <div class="avatar avatar-lg">
                <img src="{{ asset('/assets/svg/arcanesoft/default-avatar.svg') }}" alt="John DOE" class="rounded-bottom bg-warning">
            </div>
            <div class="avatar avatar-lg">
                <img src="{{ asset('/assets/svg/arcanesoft/default-avatar.svg') }}" alt="John DOE" class="rounded-left bg-danger">
            </div>
            <div class="avatar avatar-lg">
                <img src="{{ asset('/assets/svg/arcanesoft/default-avatar.svg') }}" alt="John DOE" class="rounded-circle bg-secondary">
            </div>
            <div class="avatar avatar-lg">
                <img src="{{ asset('/assets/svg/arcanesoft/default-avatar.svg') }}" alt="John DOE" class="rounded-pill bg-primary">
            </div>
            <div class="avatar avatar-lg">
                <img src="{{ asset('/assets/svg/arcanesoft/default-avatar.svg') }}" alt="John DOE" class="rounded-0 bg-light">
            </div>
            <div class="avatar avatar-lg">
                <img src="{{ asset('/assets/svg/arcanesoft/default-avatar.svg') }}" alt="John DOE" class="img-thumbnail bg-dark">
            </div>
        </div>

        <div class="card-body">
            <h3 class="text-muted">With status indicator</h3>
            <div class="avatar avatar-lg">
                <img src="{{ asset('/assets/svg/arcanesoft/default-avatar.svg') }}" alt="John DOE" class="rounded-circle bg-light">
                <span class="status bg-success"></span>
            </div>
            <div class="avatar avatar-lg">
                <img src="{{ asset('/assets/svg/arcanesoft/default-avatar.svg') }}" alt="John DOE" class="rounded-circle bg-light">
                <span class="status bg-info"></span>
            </div>
            <div class="avatar avatar-lg">
                <img src="{{ asset('/assets/svg/arcanesoft/default-avatar.svg') }}" alt="John DOE" class="rounded-circle bg-light">
                <span class="status bg-warning"></span>
            </div>
            <div class="avatar avatar-lg">
                <img src="{{ asset('/assets/svg/arcanesoft/default-avatar.svg') }}" alt="John DOE" class="rounded-circle bg-light">
                <span class="status bg-danger"></span>
            </div>
            <div class="avatar avatar-lg">
                <img src="{{ asset('/assets/svg/arcanesoft/default-avatar.svg') }}" alt="John DOE" class="rounded-circle bg-light">
                <span class="status bg-primary"></span>
            </div>
            <div class="avatar avatar-lg">
                <img src="{{ asset('/assets/svg/arcanesoft/default-avatar.svg') }}" alt="John DOE" class="rounded-circle bg-light">
                <span class="status bg-secondary"></span>
            </div>
            <div class="avatar avatar-lg">
                <img src="{{ asset('/assets/svg/arcanesoft/default-avatar.svg') }}" alt="John DOE" class="rounded-circle bg-light">
                <span class="status bg-dark"></span>
            </div>
            <div class="avatar avatar-lg">
                <img src="{{ asset('/assets/svg/arcanesoft/default-avatar.svg') }}" alt="John DOE" class="rounded-circle bg-light">
                <span class="status bg-light"></span>
            </div>
        </div>

        <div class="card-body">
            <h3 class="text-muted">List</h3>
            <div class="avatar-list">
                <div class="avatar avatar-md">
                    <img src="{{ asset('/assets/svg/arcanesoft/default-avatar.svg') }}" alt="John DOE" class="rounded-circle">
                </div>
                <div class="avatar avatar-md">
                    <img src="{{ asset('/assets/svg/arcanesoft/default-avatar.svg') }}" alt="John DOE" class="rounded-circle bg-info">
                </div>
                <div class="avatar avatar-md">
                    <img src="{{ asset('/assets/svg/arcanesoft/default-avatar.svg') }}" alt="John DOE" class="rounded-circle bg-success">
                </div>
                <div class="avatar avatar-md">
                    <img src="{{ asset('/assets/svg/arcanesoft/default-avatar.svg') }}" alt="John DOE" class="rounded-circle bg-warning">
                </div>
                <div class="avatar avatar-md">
                    <img src="{{ asset('/assets/svg/arcanesoft/default-avatar.svg') }}" alt="John DOE" class="rounded-circle bg-danger">
                </div>
                <div class="avatar avatar-md">
                    <img src="{{ asset('/assets/svg/arcanesoft/default-avatar.svg') }}" alt="John DOE" class="rounded-circle bg-secondary">
                </div>
                <div class="avatar avatar-md">
                    <img src="{{ asset('/assets/svg/arcanesoft/default-avatar.svg') }}" alt="John DOE" class="rounded-circle bg-primary">
                </div>
                <div class="avatar avatar-md">
                    <img src="{{ asset('/assets/svg/arcanesoft/default-avatar.svg') }}" alt="John DOE" class="rounded-circle bg-light">
                </div>
                <div class="avatar avatar-md">
                    <img src="{{ asset('/assets/svg/arcanesoft/default-avatar.svg') }}" alt="John DOE" class="rounded-circle bg-dark">
                </div>
            </div>
        </div>

        <div class="card-body">
            <h3 class="text-muted">Stacked</h3>
            <div class="avatar-list avatar-list-stacked">
                <div class="avatar avatar-md">
                    <img src="{{ asset('/assets/svg/arcanesoft/default-avatar.svg') }}" alt="John DOE" class="rounded-circle">
                </div>
                <div class="avatar avatar-md">
                    <img src="{{ asset('/assets/svg/arcanesoft/default-avatar.svg') }}" alt="John DOE" class="rounded-circle bg-info">
                </div>
                <div class="avatar avatar-md">
                    <img src="{{ asset('/assets/svg/arcanesoft/default-avatar.svg') }}" alt="John DOE" class="rounded-circle bg-success">
                </div>
                <div class="avatar avatar-md">
                    <img src="{{ asset('/assets/svg/arcanesoft/default-avatar.svg') }}" alt="John DOE" class="rounded-circle bg-warning">
                </div>
                <div class="avatar avatar-md">
                    <img src="{{ asset('/assets/svg/arcanesoft/default-avatar.svg') }}" alt="John DOE" class="rounded-circle bg-danger">
                </div>
                <div class="avatar avatar-md">
                    <img src="{{ asset('/assets/svg/arcanesoft/default-avatar.svg') }}" alt="John DOE" class="rounded-circle bg-secondary">
                </div>
                <div class="avatar avatar-md">
                    <img src="{{ asset('/assets/svg/arcanesoft/default-avatar.svg') }}" alt="John DOE" class="rounded-circle bg-primary">
                </div>
                <div class="avatar avatar-md">
                    <img src="{{ asset('/assets/svg/arcanesoft/default-avatar.svg') }}" alt="John DOE" class="rounded-circle bg-light">
                </div>
                <div class="avatar avatar-md">
                    <img src="{{ asset('/assets/svg/arcanesoft/default-avatar.svg') }}" alt="John DOE" class="rounded-circle bg-dark">
                </div>
            </div>
        </div>
    </div>
@endsection
