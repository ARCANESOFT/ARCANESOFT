<?php
$socials = [
    'facebook'      => [
        'title' => 'Connect with Facebook',
        'icon'  => 'fa fa-fw fa-facebook',
        'class' => 'btn btn-block text-center btn-facebook',
    ],
    'twitter'       => [
        'title' => 'Connect with Twitter',
        'icon'  => 'fa fa-fw fa-twitter',
        'class' => 'btn btn-block text-center btn-twitter',
    ],
    'google'        => [
        'title' => 'Connect with Google +',
        'icon'  => 'fa fa-fw fa-google-plus',
        'class' => 'btn btn-block text-center btn-google-plus',
    ],
    'github'        => [
        'title' => 'Connect with GitHub',
        'icon'  => 'fa fa-fw fa-github',
        'class' => 'btn btn-block text-center btn-github',
    ],
    'linkedin'      => [
        'title' => 'Connect with LinkedIn',
        'icon'  => 'fa fa-fw fa-linkedin',
        'class' => 'btn btn-block text-center btn-linkedin',
    ],
    'bitbucket' => [
        'title' => 'Connect with Bitbucket',
        'icon'  => 'fa fa-fw fa-bitbucket',
        'class' => 'btn btn-block text-center btn-bitbucket',
    ],
];
?>

<div class="panel-footer">
    <div class="row">
        @foreach ($socials as $driver => $social)
            @if (\Arcanedev\LaravelAuth\Services\SocialAuthenticator::isSupported($driver))
                <div class="col-sm-4" style="margin-top: 5px">
                    <a href="{{ route('auth::social.redirect', [$driver]) }}" class="{{ $social['class'] }}" title="{{ $social['title'] }}">
                        <i class="{{ $social['icon'] }}"></i>
                    </a>
                </div>
            @endif
        @endforeach
    </div>
</div>
