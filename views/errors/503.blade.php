<?php
/** @var  Throwable|null  $exception */
$hasException = isset($exception);
?>

@extends($hasException ? 'errors._template.illustrated' : 'errors._template.minimal')

@section('title', __($title ?? 'Service Unavailable'))
@section('code', '503')
@section('message', __(($hasException ? $exception->getMessage() : null) ?: 'Service Unavailable'))

@section('illustration')
    <img src="{{ asset('assets/svg/app/errors/503.svg') }}" alt="" role="presentation">
@endsection
