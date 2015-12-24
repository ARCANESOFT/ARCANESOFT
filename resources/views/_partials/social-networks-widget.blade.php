<div class="links-widget social-networks">
    <h4 class="link-header">Social Networks</h4>
    <div class="row">
        @foreach($socialNetworks as $key => $sn)
            <div class="col-xs-3 col-md-4 col-lg-3">
                <a href="{{ $sn['url'] }}" title="{{ $sn['title'] }}" class="sn-link {{ $key }}" target="_parent">
                    <i class="{{ $sn['icon'] }}"></i>
                </a>
            </div>
        @endforeach
    </div>
</div>
