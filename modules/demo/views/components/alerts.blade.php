@extends('demo::_template.master')

@section('content')
    <div class="card">
        <div class="card-header">
            <h5 class="mb-0">Alerts</h5>
        </div>
        <div class="card-body">
            <h3>Examples</h3>

            <div class="alert alert-primary" role="alert">
                A simple primary alert—check it out!
            </div>
            <div class="alert alert-secondary" role="alert">
                A simple secondary alert—check it out!
            </div>
            <div class="alert alert-success" role="alert">
                A simple success alert—check it out!
            </div>
            <div class="alert alert-danger" role="alert">
                A simple danger alert—check it out!
            </div>
            <div class="alert alert-warning" role="alert">
                A simple warning alert—check it out!
            </div>
            <div class="alert alert-info" role="alert">
                A simple info alert—check it out!
            </div>
            <div class="alert alert-light" role="alert">
                A simple light alert—check it out!
            </div>
            <div class="alert alert-dark" role="alert">
                A simple dark alert—check it out!
            </div>
        </div>
        <div class="card-body">
            <h3>Link color</h3>

            <div class="alert alert-primary" role="alert">
                A simple primary alert with <a href="#" class="alert-link">an example link</a>. Give it a click if you like.
            </div>
            <div class="alert alert-secondary" role="alert">
                A simple secondary alert with <a href="#" class="alert-link">an example link</a>. Give it a click if you like.
            </div>
            <div class="alert alert-success" role="alert">
                A simple success alert with <a href="#" class="alert-link">an example link</a>. Give it a click if you like.
            </div>
            <div class="alert alert-danger" role="alert">
                A simple danger alert with <a href="#" class="alert-link">an example link</a>. Give it a click if you like.
            </div>
            <div class="alert alert-warning" role="alert">
                A simple warning alert with <a href="#" class="alert-link">an example link</a>. Give it a click if you like.
            </div>
            <div class="alert alert-info" role="alert">
                A simple info alert with <a href="#" class="alert-link">an example link</a>. Give it a click if you like.
            </div>
            <div class="alert alert-light" role="alert">
                A simple light alert with <a href="#" class="alert-link">an example link</a>. Give it a click if you like.
            </div>
            <div class="alert alert-dark" role="alert">
                A simple dark alert with <a href="#" class="alert-link">an example link</a>. Give it a click if you like.
            </div>
        </div>
        <div class="card-body">
            <h3>Additional content</h3>
            <div class="alert alert-success" role="alert">
                <h4 class="alert-heading">Well done!</h4>
                <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
                <hr>
                <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
            </div>
        </div>

        <div class="card-body">
            <p>For more details check the <a href="https://v5.getbootstrap.com/docs/5.0/components/alerts/" target="_blank">official documentation</a></p>
        </div>
    </div>
@endsection
