@extends('_template.master')

@section('content')
    <div class="container py-5">
        <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
            <div class="col-10 col-sm-8 col-lg-6">
                <img src="https://getbootstrap.com/docs/5.0/examples/heroes/bootstrap-themes.png"
                     class="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes"
                     loading="lazy">
            </div>
            <div class="col-lg-6">
                <h1 class="display-5 fw-bold lh-1 mb-3">Welcome to ARCANESOFT</h1>
                <p class="lead">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
                <div class="d-grid gap-2 d-md-flex justify-content-md-start">
                    <button type="button" class="btn btn-primary btn-lg px-4 me-md-2">Primary</button>
                    <button type="button" class="btn btn-outline-secondary btn-lg px-4">Default</button>
                </div>
            </div>
        </div>
    </div>

    <section class="container py-5" id="icon-grid">
        <h2 class="pb-2 border-bottom">Features</h2>

        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 py-5">
            <div class="col d-flex align-items-start">
                <i class="far fa-check-circle fa-2x text-muted flex-shrink-0 me-3"></i>
                <div>
                    <h4 class="fw-bold mb-0">Featured title</h4>
                    <p>Paragraph of text beneath the heading to explain the heading.</p>
                </div>
            </div>
            <div class="col d-flex align-items-start">
                <i class="far fa-check-circle fa-2x text-muted flex-shrink-0 me-3"></i>
                <div>
                    <h4 class="fw-bold mb-0">Featured title</h4>
                    <p>Paragraph of text beneath the heading to explain the heading.</p>
                </div>
            </div>
            <div class="col d-flex align-items-start">
                <i class="far fa-check-circle fa-2x text-muted flex-shrink-0 me-3"></i>
                <div>
                    <h4 class="fw-bold mb-0">Featured title</h4>
                    <p>Paragraph of text beneath the heading to explain the heading.</p>
                </div>
            </div>
            <div class="col d-flex align-items-start">
                <i class="far fa-check-circle fa-2x text-muted flex-shrink-0 me-3"></i>
                <div>
                    <h4 class="fw-bold mb-0">Featured title</h4>
                    <p>Paragraph of text beneath the heading to explain the heading.</p>
                </div>
            </div>
            <div class="col d-flex align-items-start">
                <i class="far fa-check-circle fa-2x text-muted flex-shrink-0 me-3"></i>
                <div>
                    <h4 class="fw-bold mb-0">Featured title</h4>
                    <p>Paragraph of text beneath the heading to explain the heading.</p>
                </div>
            </div>
            <div class="col d-flex align-items-start">
                <i class="far fa-check-circle fa-2x text-muted flex-shrink-0 me-3"></i>
                <div>
                    <h4 class="fw-bold mb-0">Featured title</h4>
                    <p>Paragraph of text beneath the heading to explain the heading.</p>
                </div>
            </div>
            <div class="col d-flex align-items-start">
                <i class="far fa-check-circle fa-2x text-muted flex-shrink-0 me-3"></i>
                <div>
                    <h4 class="fw-bold mb-0">Featured title</h4>
                    <p>Paragraph of text beneath the heading to explain the heading.</p>
                </div>
            </div>
            <div class="col d-flex align-items-start">
                <i class="far fa-check-circle fa-2x text-muted flex-shrink-0 me-3"></i>
                <div>
                    <h4 class="fw-bold mb-0">Featured title</h4>
                    <p>Paragraph of text beneath the heading to explain the heading.</p>
                </div>
            </div>
            <div class="col d-flex align-items-start">
                <i class="far fa-check-circle fa-2x text-muted flex-shrink-0 me-3"></i>
                <div>
                    <h4 class="fw-bold mb-0">Featured title</h4>
                    <p>Paragraph of text beneath the heading to explain the heading.</p>
                </div>
            </div>
        </div>
    </section>

    <section id="pricing" class="py-4">
        <div class="container">
            <div class="p-3 pb-md-5 mx-auto text-center">
                <h1 class="display-4 fw-normal">Pricing</h1>
                <p class="fs-5 text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam at earum facere fugit illo ipsum nisi nulla, officia officiis quae quia quis, vitae voluptatem! Eveniet explicabo incidunt perferendis porro vitae!</p>
            </div>

            <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
                <div class="col">
                    <div class="card mb-4 rounded-3 shadow-sm">
                        <div class="card-header py-3">
                            <h4 class="my-0 fw-normal">Free</h4>
                        </div>
                        <div class="card-body">
                            <h1 class="card-title pricing-card-title">$0<small class="text-muted fw-light">/mo</small></h1>
                            <ul class="list-unstyled mt-3 mb-4">
                                <li>10 users included</li>
                                <li>2 GB of storage</li>
                                <li>Email support</li>
                                <li>Help center access</li>
                            </ul>
                            <button type="button" class="w-100 btn btn-lg btn-outline-primary">Sign up for free</button>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card mb-4 rounded-3 shadow-sm">
                        <div class="card-header py-3">
                            <h4 class="my-0 fw-normal">Pro</h4>
                        </div>
                        <div class="card-body">
                            <h1 class="card-title pricing-card-title">$15<small class="text-muted fw-light">/mo</small></h1>
                            <ul class="list-unstyled mt-3 mb-4">
                                <li>20 users included</li>
                                <li>10 GB of storage</li>
                                <li>Priority email support</li>
                                <li>Help center access</li>
                            </ul>
                            <button type="button" class="w-100 btn btn-lg btn-primary">Get started</button>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card mb-4 rounded-3 shadow-sm border-primary">
                        <div class="card-header py-3 text-white bg-primary border-primary">
                            <h4 class="my-0 fw-normal">Enterprise</h4>
                        </div>
                        <div class="card-body">
                            <h1 class="card-title pricing-card-title">$29<small class="text-muted fw-light">/mo</small></h1>
                            <ul class="list-unstyled mt-3 mb-4">
                                <li>30 users included</li>
                                <li>15 GB of storage</li>
                                <li>Phone and email support</li>
                                <li>Help center access</li>
                            </ul>
                            <button type="button" class="w-100 btn btn-lg btn-primary">Contact us</button>
                        </div>
                    </div>
                </div>
            </div>

            <h2 class="display-6 text-center mb-4">Compare plans</h2>

            <div class="table-responsive">
                <table class="table text-center">
                    <thead>
                    <tr>
                        <th style="width: 34%;"></th>
                        <th style="width: 22%;">Free</th>
                        <th style="width: 22%;">Pro</th>
                        <th style="width: 22%;">Enterprise</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row" class="text-start">Public</th>
                        <td><i class="fas fa-check"></i></td>
                        <td><i class="fas fa-check"></i></td>
                        <td><i class="fas fa-check"></i></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-start">Private</th>
                        <td></td>
                        <td><i class="fas fa-check"></i></td>
                        <td><i class="fas fa-check"></i></td>
                    </tr>
                    </tbody>

                    <tbody>
                    <tr>
                        <th scope="row" class="text-start">Permissions</th>
                        <td><i class="fas fa-check"></i></td>
                        <td><i class="fas fa-check"></i></td>
                        <td><i class="fas fa-check"></i></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-start">Sharing</th>
                        <td></td>
                        <td><i class="fas fa-check"></i></td>
                        <td><i class="fas fa-check"></i></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-start">Unlimited members</th>
                        <td></td>
                        <td><i class="fas fa-check"></i></td>
                        <td><i class="fas fa-check"></i></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-start">Extra security</th>
                        <td></td>
                        <td></td>
                        <td><i class="fas fa-check"></i></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-start">IT Support</th>
                        <td></td>
                        <td></td>
                        <td><i class="fas fa-check"></i></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>

    <section class="bg-warning py-5">
        <div class="container">
            <h3 class="h2">Call to action</h3>
            <p class="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium illo maxime quasi sit unde? Amet at beatae cumque eveniet exercitationem mollitia nesciunt nisi nobis quae quia, reiciendis sequi veritatis voluptatem.</p>
            <div class="d-flex justify-content-center mt-4">
                <a href="#" class="btn btn-lg btn-dark me-2">Click now</a>
                <a href="#" class="btn btn-lg btn-outline-dark">Click it later</a>
            </div>
        </div>
    </section>
@endsection

