@extends('demo::_template.master')

@section('content')
    <div class="card">
        <div class="card-body">
            <h3>Default</h3>

            <div class="form-file mb-3">
                <input type="file" class="form-file-input" id="customFile">
                <label class="form-file-label" for="customFile">
                    <span class="form-file-text">Choose file...</span>
                    <span class="form-file-button">Browse</span>
                </label>
            </div>

            <div class="form-file mb-3">
                <input type="file" class="form-file-input" id="customFileDisabled" disabled>
                <label class="form-file-label" for="customFileDisabled">
                    <span class="form-file-text">Choose file...</span>
                    <span class="form-file-button">Browse</span>
                </label>
            </div>

            <div class="form-file">
                <input type="file" class="form-file-input" id="customFileLong">
                <label class="form-file-label" for="customFileLong">
                    <span class="form-file-text">Lorem ipsum posuere consectetur est at lobortis nulla vitae elit libero a pharetra augue fusce dapibus tellus ac cursus commodo tortor mauris condimentum nibh ut fermentum massa justo sit amet risus cras mattis consectetur purus sit amet fermentum</span>
                    <span class="form-file-button">Browse</span>
                </label>
            </div>
        </div>
        <div class="card-body">
            <h3>Sizing</h3>

            <div class="form-file form-file-lg mb-3">
                <input type="file" class="form-file-input" id="customFileLg">
                <label class="form-file-label" for="customFileLg">
                    <span class="form-file-text">Choose file...</span>
                    <span class="form-file-button">Browse</span>
                </label>
            </div>

            <div class="form-file form-file-sm">
                <input type="file" class="form-file-input" id="customFileSm">
                <label class="form-file-label" for="customFileSm">
                    <span class="form-file-text">Choose file...</span>
                    <span class="form-file-button">Browse</span>
                </label>
            </div>
        </div>
    </div>
@endsection
