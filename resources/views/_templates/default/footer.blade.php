@include('_partials.footer-links')

<div class="copyright">
    <div class="container">
        <div class="row">
            <div class="col-sm-6">
                <p class="text-center">
                    Copyright {{ date('Y') }} {!! link_to_route('public::home', config('cms.name', 'ARCANESOFT')) !!} &copy;. All rights reserved.
                </p>
            </div>
            <div class="col-sm-6">
                <p class="text-center">
                    Created with <i class="fa fa-heart" style="color: #E22626"></i> by {!! link_to_route('public::home', 'ARCANEDEV') !!}
                </p>
            </div>
        </div>

    </div>
</div>