@extends('_template.master')

@section('content')
    <div class="container">
        <h1 class="display-6">Contact us</h1>

        <section class="py-5">
            <div class="row g-5">
                <div class="col-lg-7">
                    <div class="contact-form">
                        <form method="post" action="#" id="contact-form" novalidate="novalidate">
                            <div class="row g-3">
                                <div class="col-lg-6">
                                    <div class="form-floating">
                                        <input type="text" class="form-control"
                                               name="full_name" id="full_name" placeholder="Enter your name here">
                                        <label for="full_name">Full name</label>
                                    </div>
                                </div>

                                <div class="col-lg-6">
                                    <div class="form-floating">
                                        <input type="email" class="form-control"
                                               name="email" id="email" placeholder="Enter your email here">
                                        <label for="email">Email Address</label>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-floating">
                                        <input type="tel" class="form-control"
                                               name="phone" id="phone" placeholder="Enter your phone here">
                                        <label for="phone">Phone</label>
                                    </div>
                                </div>

                                <div class="col-12">
                                    <div class="form-floating">
                                        <input type="text" class="form-control"
                                               name="subject" id="subject" placeholder="Enter your subject here">
                                        <label for="subject">Subject</label>
                                    </div>
                                </div>

                                <div class="col-12">
                                    <div class="form-floating">
                                    <textarea class="form-control" style="height: 8rem;"
                                              name="message" id="message" placeholder="Enter your message here"></textarea>
                                        <label for="message">Message</label>
                                    </div>
                                </div>

                                <div class="col-12">
                                    <button class="btn btn-warning btn-lg text-white" type="submit" name="submit-form"><span class="btn-title">Send Massage</span></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div class="col-lg-5">
                    <h3 class="text">Feel free to get in touch with me. </h3>
                    <address>
                        <strong>Location</strong><br>
                        12345 Laravel street, Suite 678<br>
                        Famous City, AAA 9876<br>
                        <abbr title="Phone">P:</abbr> (123) 456-7890
                    </address>
                    <address>
                        <strong>Call Center</strong><br>
                        <a href="tel:+911234123132">+91 1234 123 132</a>, <a href="tel:+911234123132">+91 1234 123 132</a>
                    </address>
                    <address>
                        <strong>Email Us</strong><br>
                        <a href="#">info@domain.com</a>, <a href="#">info@domain.com</a>
                    </address>
                </div>
            </div>
        </section>
    </div>

    <section>
        <div id="google-map" class="w-100" style="height: 400px;"></div>
    </section>
@endsection

@push('scripts')
    <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap&libraries=&v=weekly" async></script>
    <script>
        function initMap() {
            // The location of Uluru
            const position = { lat: -25.344, lng: 131.036 }

            // The map, centered at Uluru
            const map = new google.maps.Map(document.getElementById('google-map'), {
                zoom: 4,
                center: position,
            })

            // The marker, positioned at Uluru
            const marker = new google.maps.Marker({
                position: position,
                map: map,
            });
        }
    </script>
@endpush
