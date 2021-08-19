@extends('demo::_template.master')

@section('content')
    <div class="card">
        <div class="card-body">
            <h3>Headings</h3>

            <h1>h1. Bootstrap heading</h1>
            <h2>h2. Bootstrap heading</h2>
            <h3>h3. Bootstrap heading</h3>
            <h4>h4. Bootstrap heading</h4>
            <h5>h5. Bootstrap heading</h5>
            <h6>h6. Bootstrap heading</h6>

            <p class="h1">h1. Bootstrap heading</p>
            <p class="h2">h2. Bootstrap heading</p>
            <p class="h3">h3. Bootstrap heading</p>
            <p class="h4">h4. Bootstrap heading</p>
            <p class="h5">h5. Bootstrap heading</p>
            <p class="h6">h6. Bootstrap heading</p>
        </div>

        <div class="card-body">
            <h3>Customizing headings</h3>

            <h3>
                Fancy display heading
                <small class="text-muted">With faded secondary text</small>
            </h3>
        </div>

        <div class="card-body">
            <h3>Display headings</h3>

            <h1 class="display-1">Display 1</h1>
            <h1 class="display-2">Display 2</h1>
            <h1 class="display-3">Display 3</h1>
            <h1 class="display-4">Display 4</h1>
            <h1 class="display-5">Display 5</h1>
            <h1 class="display-6">Display 6</h1>
        </div>

        <div class="card-body">
            <h3>Lead</h3>

            <p class="lead">
                Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus.
            </p>
        </div>

        <div class="card-body">
            <h3>Inline text elements</h3>

            <p>You can use the mark tag to <mark>highlight</mark> text.</p>
            <p><del>This line of text is meant to be treated as deleted text.</del></p>
            <p><s>This line of text is meant to be treated as no longer accurate.</s></p>
            <p><ins>This line of text is meant to be treated as an addition to the document.</ins></p>
            <p><u>This line of text will render as underlined</u></p>
            <p><small>This line of text is meant to be treated as fine print.</small></p>
            <p><strong>This line rendered as bold text.</strong></p>
            <p><em>This line rendered as italicized text.</em></p>
        </div>

        <div class="card-body">
            <h3>Abbreviations</h3>

            <p><abbr title="attribute">attr</abbr></p>
            <p><abbr title="HyperText Markup Language" class="initialism">HTML</abbr></p>
        </div>

        <div class="card-body">
            <h3>Blockquotes</h3>

            <blockquote class="blockquote">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
            </blockquote>

            <figure>
                <blockquote class="blockquote">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                </blockquote>
                <figcaption class="blockquote-footer">
                    Someone famous in <cite title="Source Title">Source Title</cite>
                </figcaption>
            </figure>

            <figure class="text-center">
                <blockquote class="blockquote">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                </blockquote>
                <figcaption class="blockquote-footer">
                    Someone famous in <cite title="Source Title">Source Title</cite>
                </figcaption>
            </figure>

            <figure class="text-right">
                <blockquote class="blockquote">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                </blockquote>
                <figcaption class="blockquote-footer">
                    Someone famous in <cite title="Source Title">Source Title</cite>
                </figcaption>
            </figure>
        </div>

        <div class="card-body">
            <h3>Lists</h3>

            <ul class="list-unstyled">
                <li>Lorem ipsum dolor sit amet</li>
                <li>Consectetur adipiscing elit</li>
                <li>Integer molestie lorem at massa</li>
                <li>Facilisis in pretium nisl aliquet</li>
                <li>Nulla volutpat aliquam velit
                    <ul>
                        <li>Phasellus iaculis neque</li>
                        <li>Purus sodales ultricies</li>
                        <li>Vestibulum laoreet porttitor sem</li>
                        <li>Ac tristique libero volutpat at</li>
                    </ul>
                </li>
                <li>Faucibus porta lacus fringilla vel</li>
                <li>Aenean sit amet erat nunc</li>
                <li>Eget porttitor lorem</li>
            </ul>

            <h4>Inline</h4>

            <ul class="list-inline">
                <li class="list-inline-item">Lorem ipsum</li>
                <li class="list-inline-item">Phasellus iaculis</li>
                <li class="list-inline-item">Nulla volutpat</li>
            </ul>
        </div>

        <div class="card-body">
            <h3>Description list alignment</h3>

            <dl class="row">
                <dt class="col-sm-3">Description lists</dt>
                <dd class="col-sm-9">A description list is perfect for defining terms.</dd>

                <dt class="col-sm-3">Euismod</dt>
                <dd class="col-sm-9">
                    <p>Vestibulum id ligula porta felis euismod semper eget lacinia odio sem nec elit.</p>
                    <p>Donec id elit non mi porta gravida at eget metus.</p>
                </dd>

                <dt class="col-sm-3">Malesuada porta</dt>
                <dd class="col-sm-9">Etiam porta sem malesuada magna mollis euismod.</dd>

                <dt class="col-sm-3 text-truncate">Truncated term is truncated</dt>
                <dd class="col-sm-9">Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</dd>

                <dt class="col-sm-3">Nesting</dt>
                <dd class="col-sm-9">
                    <dl class="row">
                        <dt class="col-sm-4">Nested definition list</dt>
                        <dd class="col-sm-8">Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc.</dd>
                    </dl>
                </dd>
            </dl>
        </div>
    </div>
@endsection
