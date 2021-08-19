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
    <div class="card mb-3">
        <div class="card-header">
            <h5 class="mb-0">Checks</h5>
        </div>

        <div class="card-body">
            <h3>Checkboxes</h3>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                    Default checkbox
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
                <label class="form-check-label" for="flexCheckChecked">
                    Checked checkbox
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDisabled" disabled>
                <label class="form-check-label" for="flexCheckDisabled">
                    Disabled checkbox
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckCheckedDisabled" checked disabled>
                <label class="form-check-label" for="flexCheckCheckedDisabled">
                    Disabled checked checkbox
                </label>
            </div>
        </div>

        <div class="card-body">
            <h3>Radios</h3>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                <label class="form-check-label" for="flexRadioDefault1">
                    Default radio
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
                <label class="form-check-label" for="flexRadioDefault2">
                    Default checked radio
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDisabled" id="flexRadioDisabled" disabled>
                <label class="form-check-label" for="flexRadioDisabled">
                    Disabled radio
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDisabled" id="flexRadioCheckedDisabled" checked disabled>
                <label class="form-check-label" for="flexRadioCheckedDisabled">
                    Disabled checked radio
                </label>
            </div>
        </div>

        <div class="card-body">
            <h3>Switches</h3>
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
                <label class="form-check-label" for="flexSwitchCheckDefault">Default switch checkbox input</label>
            </div>
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked>
                <label class="form-check-label" for="flexSwitchCheckChecked">Checked switch checkbox input</label>
            </div>
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="flexSwitchCheckDisabled" disabled>
                <label class="form-check-label" for="flexSwitchCheckDisabled">Disabled switch checkbox input</label>
            </div>
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="flexSwitchCheckCheckedDisabled" checked disabled>
                <label class="form-check-label" for="flexSwitchCheckCheckedDisabled">Disabled checked switch checkbox input</label>
            </div>
        </div>

        <div class="card-body">
            <h3>Inline</h3>

            <div class="mb-3">
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1">
                    <label class="form-check-label" for="inlineCheckbox1">1</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2">
                    <label class="form-check-label" for="inlineCheckbox2">2</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3" disabled>
                    <label class="form-check-label" for="inlineCheckbox3">3 (disabled)</label>
                </div>
            </div>

            <div class="mb-3">
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
                    <label class="form-check-label" for="inlineRadio1">1</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
                    <label class="form-check-label" for="inlineRadio2">2</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" disabled>
                    <label class="form-check-label" for="inlineRadio3">3 (disabled)</label>
                </div>
            </div>
        </div>

        <div class="card-body">
            <h3>Without labels</h3>
            <div>
                <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="...">
            </div>
            <div>
                <input class="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel1" value="" aria-label="...">
            </div>
        </div>

        <div class="card-body">
            <h3>Toggle buttons</h3>

            <h5>Checkbox</h5>
            <div class="mb-3">
                <input type="checkbox" class="btn-check" id="btn-check" autocomplete="off">
                <label class="btn btn-primary" for="btn-check">Single toggle</label>
            </div>
            <div>
                <input type="checkbox" class="btn-check" id="btn-check-2" checked autocomplete="off">
                <label class="btn btn-primary" for="btn-check-2">Checked</label>
            </div>

            <h5 class="my-3">Radio</h5>

            <div class="mb-3">
                <div class="btn-group">
                    <input type="radio" class="btn-check" name="options" id="option1" autocomplete="off" checked>
                    <label class="btn btn-secondary" for="option1">Checked</label>

                    <input type="radio" class="btn-check" name="options" id="option2" autocomplete="off">
                    <label class="btn btn-secondary" for="option2">Radio</label>

                    <input type="radio" class="btn-check" name="options" id="option3" autocomplete="off">
                    <label class="btn btn-secondary" for="option3">Radio</label>
                </div>
            </div>

            <h5>Outlined styles</h5>

            <div class="mb-3">
                <input type="checkbox" class="btn-check" id="btn-check-outlined" autocomplete="off">
                <label class="btn btn-outline-primary" for="btn-check-outlined">Single toggle</label><br>
            </div>

            <div class="mb-3">
                <input type="checkbox" class="btn-check" id="btn-check-2-outlined" checked autocomplete="off">
                <label class="btn btn-outline-secondary" for="btn-check-2-outlined">Checked</label><br>
            </div>

            <div class="btn-group">
                <input type="radio" class="btn-check" name="options-outlined" id="success-outlined" autocomplete="off" checked>
                <label class="btn btn-outline-success" for="success-outlined">Checked success radio</label>

                <input type="radio" class="btn-check" name="options-outlined" id="danger-outlined" autocomplete="off">
                <label class="btn btn-outline-danger" for="danger-outlined">Danger radio</label>
            </div>
        </div>
    </div>

    <div class="card">
        <div class="card-header">With colors</div>
        <div class="card-body">
            <h3>Checkboxes</h3>
            <table>
                <tr>
                    <td>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" name="inline-checkbox-default" id="inline-checkbox-default" value="option1" checked>
                            <label class="form-check-label" for="inline-checkbox-default">default</label>
                        </div>
                    </td>
                    <td>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" name="inline-checkbox-default-disabled" id="inline-checkbox-default-disabled" value="option3" checked disabled>
                            <label class="form-check-label" for="inline-checkbox-default-disabled">default (disabled)</label>
                        </div>
                    </td>
                </tr>
                @foreach($colors as $color)
                <tr>
                    <td>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input {{ $color }}" type="checkbox" name="inline-checkbox-default" id="inline-checkbox-{{ $color }}" value="option1" checked>
                            <label class="form-check-label" for="inline-checkbox-{{ $color }}">{{ $color }}</label>
                        </div>
                    </td>
                    <td>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input {{ $color }}" type="checkbox" name="inline-checkbox-default-disabled" id="inline-checkbox-{{ $color }}-disabled" value="option3" checked disabled>
                            <label class="form-check-label" for="inline-checkbox-{{ $color }}-disabled">{{ $color }} (disabled)</label>
                        </div>
                    </td>
                </tr>
                @endforeach
            </table>
        </div>

        <div class="card-body">
            <h3>Radios</h3>

            <table>
                <tr>
                    <td>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inline-radio-default" id="inline-radio-default" value="option1" checked>
                        </div>
                    </td>
                    <td>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inline-radio-default" id="inline-radio-default" value="option2">
                            <label class="form-check-label" for="inline-radio-default">default</label>
                        </div>
                    </td>
                    <td>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inline-radio-default-disabled" id="inline-radio-default-disabled" value="option2" checked disabled>
                            <label class="form-check-label" for="inline-radio-default-disabled">default (disabled)</label>
                        </div>
                    </td>
                </tr>
                @foreach($colors as $color)
                    <tr>
                        <td>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input {{ $color }}" type="radio" name="inline-radio-{{ $color }}-default" id="inline-radio-{{ $color }}" value="option1" checked>
                            </div>
                        </td>
                        <td>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input {{ $color }}" type="radio" name="inline-radio-{{ $color }}-default" id="inline-radio-{{ $color }}" value="option2">
                                <label class="form-check-label" for="inline-radio-{{ $color }}">{{ $color }}</label>
                            </div>
                        </td>
                        <td>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input {{ $color }}" type="radio" name="inline-radio-{{ $color }}-disabled" id="inline-radio-{{ $color }}-disabled" value="option3" checked disabled>
                                <label class="form-check-label" for="inline-radio-{{ $color }}-disabled">{{ $color }} (disabled)</label>
                            </div>
                        </td>
                    </tr>
                @endforeach
            </table>
        </div>

        <div class="card-body">
            <h3>Switches</h3>

            <table>
                <tr>
                    <td>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" id="switch-default" checked>
                            <label class="form-check-label" for="switch-default">default</label>
                        </div>
                    </td>
                    <td>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" id="switch-default-disabled" checked disabled>
                            <label class="form-check-label" for="switch-default-disabled">default (disabled)</label>
                        </div>
                    </td>
                </tr>
                @foreach($colors as $color)
                    <tr>
                        <td>
                            <div class="form-check form-switch">
                                <input class="form-check-input {{ $color }}" type="checkbox" id="switch-{{ $color }}" checked>
                                <label class="form-check-label" for="switch-{{ $color }}">{{ $color }}</label>
                            </div>
                        </td>
                        <td>
                            <div class="form-check form-switch">
                                <input class="form-check-input {{ $color }}" type="checkbox" id="switch-{{ $color }}-disabled" checked disabled>
                                <label class="form-check-label" for="switch-{{ $color }}-disabled">{{ $color }} (disabled)</label>
                            </div>
                        </td>
                    </tr>
                @endforeach
            </table>
        </div>
    </div>
@endsection
