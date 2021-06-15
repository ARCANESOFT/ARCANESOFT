@extends('demo::_template.master')

@section('content')
    <div class="card">
        <div class="card-header">Badges</div>
        <div class="card-body">
            <h3>Example</h3>
            <div>
                <h1>Example heading <span class="badge bg-secondary">New</span></h1>
                <h2>Example heading <span class="badge bg-secondary">New</span></h2>
                <h3>Example heading <span class="badge bg-secondary">New</span></h3>
                <h4>Example heading <span class="badge bg-secondary">New</span></h4>
                <h5>Example heading <span class="badge bg-secondary">New</span></h5>
                <h6>Example heading <span class="badge bg-secondary">New</span></h6>
            </div>
        </div>
        <div class="card-body">
            <p>Badges can be used as part of links or buttons to provide a counter.</p>

            <button type="button" class="btn btn-primary">
                Notifications <span class="badge bg-secondary">4</span>
            </button>

            <button type="button" class="btn btn-primary">
                Profile <span class="badge bg-secondary">9</span>
                <span class="sr-only">unread messages</span>
            </button>
        </div>

        <div class="card-body">
            <h3>Background colors</h3>
            <span class="badge bg-primary">Primary</span>
            <span class="badge bg-secondary">Secondary</span>
            <span class="badge bg-success">Success</span>
            <span class="badge bg-danger">Danger</span>
            <span class="badge bg-warning text-dark">Warning</span>
            <span class="badge bg-info">Info</span>
            <span class="badge bg-light text-dark">Light</span>
            <span class="badge bg-dark">Dark</span>
        </div>

        <div class="card-body">
            <h3>Pill badges</h3>
            <span class="badge rounded-pill bg-primary">Primary</span>
            <span class="badge rounded-pill bg-secondary">Secondary</span>
            <span class="badge rounded-pill bg-success">Success</span>
            <span class="badge rounded-pill bg-danger">Danger</span>
            <span class="badge rounded-pill bg-warning text-dark">Warning</span>
            <span class="badge rounded-pill bg-info">Info</span>
            <span class="badge rounded-pill bg-light text-dark">Light</span>
            <span class="badge rounded-pill bg-dark">Dark</span>
        </div>

        <div class="card-body">
            <h3>Outline badges</h3>

            <div>
                <span class="badge border border-primary text-muted">Primary</span>
                <span class="badge border border-secondary text-muted">Secondary</span>
                <span class="badge border border-success text-muted">Success</span>
                <span class="badge border border-danger text-muted">Danger</span>
                <span class="badge border border-warning text-muted">Warning</span>
                <span class="badge border border-info text-muted">Info</span>
                <span class="badge border border-light text-muted">Light</span>
                <span class="badge border border-dark text-muted">Dark</span>
            </div>
            <div>
                <span class="badge rounded-pill border border-primary text-muted">Primary</span>
                <span class="badge rounded-pill border border-secondary text-muted">Secondary</span>
                <span class="badge rounded-pill border border-success text-muted">Success</span>
                <span class="badge rounded-pill border border-danger text-muted">Danger</span>
                <span class="badge rounded-pill border border-warning text-muted">Warning</span>
                <span class="badge rounded-pill border border-info text-muted">Info</span>
                <span class="badge rounded-pill border border-light text-muted">Light</span>
                <span class="badge rounded-pill border border-dark text-muted">Dark</span>
            </div>
        </div>
    </div>
@endsection
