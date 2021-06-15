@component('mail::message')
# @lang('We noticed a connection to your :account from a new device. Was it you?', ['account' => $account])

|                     |                                                                             |
|---------------------|-----------------------------------------------------------------------------|
| @lang('Device'):    | {{ $device }}                                                               |
| @lang('Date'):      | {{ $date->toRfc850String() }} <small>({{ $date->diffForHumans() }})</small> |
| @lang('Location')*: | {{ $location }}                                                             |

<small>*@lang('Location is approximate based on the login\'s IP address')</small>

## @lang('If this was you')

@lang("You can ignore this message. There's no need to take any action.")<br>

## @lang("If this wasn't you")

@lang("Change your password now to protect your account.") @lang("You'll be logged out of all your active :app sessions except the one you're using at this time.", ['app' => config('app.name')])

@component('mail::button', ['url' => $url, 'color' => 'error'])
{{ $actionText }}
@endcomponent

{{-- Salutation --}}
@unless(empty($salutation))
{{ $salutation }}
@else
@lang('Regards'),<br>
{{ config('app.name') }}
@endunless

@slot('subcopy')
@lang(
    "If you’re having trouble clicking the \":actionText\" button, copy and paste the URL below\n".
    'into your web browser:',
    [
        'actionText' => $actionText,
    ]
) <span class="break-all">[{{ $displayableActionUrl }}]({{ $actionUrl }})</span>
@endslot
@endcomponent
