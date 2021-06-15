@extends('errors._template.illustrated')

@section('title', __('Unauthorized'))
@section('code', '401')
@section('message', __('Unauthorized'))

@section('illustration')
    <img src="{{ asset('assets/svg/app/errors/401.svg') }}" alt="" role="presentation">
@endsection
