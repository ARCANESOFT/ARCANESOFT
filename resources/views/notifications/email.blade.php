@component('mail::message')
{{-- Greeting --}}
@if (! empty($greeting))
# {{ $greeting }}
@else
@if ($level == 'error')
# {{ trans('email.notification.whoops') }}
@else
# {{ trans('email.notification.hello') }}
@endif
@endif

{{-- Intro Lines --}}
@foreach ($introLines as $line)
{{ $line }}

@endforeach

{{-- Action Button --}}
@if (isset($actionText))
<?php
    switch ($level) {
        case 'success':
            $color = 'green';
            break;
        case 'error':
            $color = 'red';
            break;
        default:
            $color = 'blue';
    }
?>
@component('mail::button', ['url' => $actionUrl, 'color' => $color])
{{ $actionText }}
@endcomponent
@endif

{{-- Outro Lines --}}
@foreach ($outroLines as $line)
{{ $line }}

@endforeach

<!-- Salutation -->
@if (! empty($salutation))
{{ $salutation }}
@else
{!! trans('email.notification.salutation', ['name' => config('app.name')]) !!}
@endif

<!-- Subcopy -->
@if (isset($actionText))
@component('mail::subcopy')
{{ trans('email.notification.subcopy', ['text' => $actionText, 'url' => $actionUrl]) }}
@endcomponent
@endif
@endcomponent
