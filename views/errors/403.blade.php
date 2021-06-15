@extends('errors._template.illustrated')

@section('title', __('Forbidden'))
@section('code', '403')
@section('message', __($exception->getMessage() ?: 'Forbidden'))

@section('illustration')
    <img src="{{ asset('assets/svg/app/errors/403.svg') }}" alt="" role="presentation">
@endsection
