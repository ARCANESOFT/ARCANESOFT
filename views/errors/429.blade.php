@extends('errors._template.illustrated')

@section('title', __('Too Many Requests'))
@section('code', '429')
@section('message', __('Too Many Requests'))

@section('illustration')
    <img src="{{ asset('assets/svg/app/errors/429.svg') }}" alt="" role="presentation">
@endsection
