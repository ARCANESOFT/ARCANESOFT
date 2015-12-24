@section('content')
    <div class="services text-center">
        <div class="row">
            <div class="col-lg-4">
                <img class="img-circle" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Generic placeholder image" width="140" height="140">
                <h2>Heading</h2>
                <p>{{ str_limit('Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna.', 200, '&hellip;') }}</p>
                <p><a class="btn btn-default" href="#" role="button">View details »</a></p>
            </div>

            <div class="col-lg-4">
                <img class="img-circle" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Generic placeholder image" width="140" height="140">
                <h2>Heading</h2>
                <p>{{ str_limit('Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.', 200, '&hellip;') }}</p>
                <p><a class="btn btn-default" href="#" role="button">View details »</a></p>
            </div>

            <div class="col-lg-4">
                <img class="img-circle" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Generic placeholder image" width="140" height="140">
                <h2>Heading</h2>
                <p>{{ str_limit('Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.', 200, '&hellip;') }}</p>
                <p><a class="btn btn-default" href="#" role="button">View details »</a></p>
            </div>
        </div>
    </div>

    <div class="clearfix"></div>

    <div class="features">
        <div class="row feature">
            <div class="col-md-7">
                <h2 class="feature-heading">First featurette heading. <span class="text-muted">It'll blow your mind.</span></h2>
                <p class="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
            </div>
            <div class="col-md-5">
                <img class="feature-image img-responsive center-block" src="http://placehold.it/500x300" alt="Generic placeholder image">
            </div>
        </div>
        <hr class="divider">
        <div class="row feature">
            <div class="col-md-7 col-md-push-5">
                <h2 class="feature-heading">Oh yeah, it's that good. <span class="text-muted">See for yourself.</span></h2>
                <p class="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
            </div>
            <div class="col-md-5 col-md-pull-7">
                <img class="feature-image img-responsive center-block" src="http://placehold.it/500x300" alt="Generic placeholder image">
            </div>
        </div>
        <hr class="divider">
        <div class="row feature">
            <div class="col-md-7">
                <h2 class="feature-heading">And lastly, this one. <span class="text-muted">Checkmate.</span></h2>
                <p class="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
            </div>
            <div class="col-md-5">
                <img class="feature-image img-responsive center-block" src="http://placehold.it/500x300" alt="Generic placeholder image">
            </div>
        </div>
    </div>
@endsection

@section('scripts')
@endsection
