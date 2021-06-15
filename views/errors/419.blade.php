@extends('errors._template.illustrated')

@section('title', __('Page Expired'))
@section('code', '419')
@section('message', __('Page Expired'))

@section('illustration')
    <img src="{{ asset('assets/svg/app/errors/419.svg') }}" alt="" role="presentation">
@endsection
