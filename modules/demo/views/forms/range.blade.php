@extends('demo::_template.master')

<?php
$colors = [
    'bg-info',
    'bg-success',
    'bg-warning',
    'bg-danger',
    'bg-primary',
    'bg-secondary',
    'bg-light',
    'bg-dark',
];
?>

@section('content')
    <div class="card">
        <div class="card-header">Range</div>
        <div class="card-body">
            <h3>Overview</h3>

            <label for="customRange1" class="form-label">Example range</label>
            <input type="range" class="form-range" id="customRange1">
        </div>
        <div class="card-body">
            <h3>Min and max</h3>
            <label for="customRange2" class="form-label">Example range</label>
            <input type="range" class="form-range" min="0" max="5" id="customRange2">
        </div>
        <div class="card-body">
            <h3>Steps</h3>
            <label for="customRange3" class="form-label">Example range</label>
            <input type="range" class="form-range" min="0" max="5" step="0.5" id="customRange3">
        </div>
        <div class="card-body">
            <h3>Colors</h3>

            <label for="range-default" class="form-label">Example range</label>
            <input type="range" class="form-range" id="range-default">

            @foreach($colors as $color)
                <label for="range-{{ $color }}" class="form-label">{{ $color }}</label>
                <input type="range" class="form-range {{ $color }}" id="range-{{ $color }}">
            @endforeach
        </div>
    </div>
@endsection
