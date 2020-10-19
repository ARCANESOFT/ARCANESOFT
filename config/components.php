<?php

use App\Http\Livewire\Account\Settings\Security\{
    TwoFactorAuthentication, BrowserSessionsComponent
};

return [

    'livewire' => [
        // Account
        TwoFactorAuthentication::VIEW => TwoFactorAuthentication::class,
        BrowserSessionsComponent::VIEW    => BrowserSessionsComponent::class,
    ],

];
