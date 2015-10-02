<div class="footer-widgets">
    <div class="container">
        <div class="row">
            <div class="col-sm-12 col-md-6">
                <div class="links-widget">
                    <h4 class="link-header">Links</h4>
                    <div class="row">
                        <div class="col-sm-6">
                            <ul class="list-unstyled list-links">
                                <li>{!! link_to_route('public::home', 'Home') !!}</li>
                                <li>{!! link_to_route('public::about.us', 'About us') !!}</li>
                                <li>{!! link_to_route('public::home', 'Features') !!}</li>
                                <li>{!! link_to_route('public::contact.get', 'Contact us') !!}</li>
                                <li>{!! link_to_route('public::home', 'Sitemap') !!}</li>
                            </ul>
                        </div>
                        <div class="col-sm-6">
                            <ul class="list-unstyled list-links">
                                <li>{!! link_to_route('public::home', 'Terms') !!}</li>
                                <li>{!! link_to_route('public::home', 'Privacy') !!}</li>
                                <li>{!! link_to_route('public::home', 'Cookies') !!}</li>
                                <li>{!! link_to_route('public::home', 'Help') !!}</li>
                                <li>{!! link_to('https://github.com/ARCANEDEV/ARCANESOFT', 'ARCANESOFT', ['target' => '_blanck']) !!}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6 col-md-3">
                <div class="links-widget">
                    <h4 class="link-header">Contact us</h4>
                    <ul class="list-unstyled fa-ul contact-details">
                        <li><i class="fa-li fa fa-building"></i>{{ config('cms.address') }}</li>
                        <li><i class="fa-li fa fa-envelope"></i>{!! Html::mailto(config('cms.mail'), config('cms.mail')) !!}</li>
                        <li><i class="fa-li fa fa-phone"></i>{{ config('cms.phone') }}</li>
                        <li><i class="fa-li fa fa-mobile"></i>{{ config('cms.mobile') }}</li>
                    </ul>

                    {!! link_to_route('public::contact.get', 'Contact page', [], ['class' => 'btn btn-block btn-primary']) !!}
                </div>
            </div>
            <div class="col-sm-6 col-md-3">
                @include('_partials.social-networks-widget')
            </div>
        </div>
    </div>
</div>
