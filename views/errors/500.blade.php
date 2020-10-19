@extends('errors._template.illustrated')

@section('title', __('Server Error'))
@section('code', '500')
@section('message', __('Server Error'))

@section('illustration')
    <img src="{{ asset('assets/svg/app/errors/500.svg') }}" alt="" role="presentation">
@endsection
