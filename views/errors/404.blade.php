@extends('errors._template.illustrated')

@section('title', __('Page Not Found'))
@section('code', '404')
@section('message', __('Page Not Found'))

@section('illustration')
    <img src="{{ asset('assets/svg/app/errors/404.svg') }}" alt="" role="presentation">
@endsection
