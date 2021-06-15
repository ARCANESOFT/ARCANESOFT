<footer class="main-footer bg-dark pt-5 pb-4">
    <div class="container">
        <section class="mb-3">
            <div class="row g-3">
                <div class="col-md-4 col-lg-3">
                    <h4 class="footer-header text-white">Company</h4>
                    <nav class="nav flex-column">
                        <a class="nav-link px-0 text-white-50"
                           href="{{ route('public::about-us') }}">About</a>
                        <a class="nav-link px-0 text-white-50"
                           href="#">Services</a>
                        <a class="nav-link px-0 text-white-50"
                           href="#">Pricing</a>
                        <a class="nav-link px-0 text-white-50"
                           href="#">Press</a>
                        <a class="nav-link px-0 text-white-50"
                           href="{{ route('public::contact.get') }}">Contact us</a>
                    </nav>
                </div>
                <div class="col-md-4 col-lg-3">
                    <h4 class="footer-header text-white">Services</h4>
                    <nav class="nav flex-column">
                        <a class="nav-link px-0 text-white-50"
                           href="#">Programming</a>
                        <a class="nav-link px-0 text-white-50"
                           href="#">Design</a>
                        <a class="nav-link px-0 text-white-50"
                           href="#">Web Hosting</a>
                        <a class="nav-link px-0 text-white-50"
                           href="#">Consulting</a>
                        <a class="nav-link px-0 text-white-50"
                           href="#">IT Support</a>
                    </nav>
                </div>
                <div class="col-md-4 col-lg-3">
                    <h4 class="footer-header text-white">Legal</h4>
                    <nav class="nav flex-column">
                        <a class="nav-link px-0 text-white-50"
                           href="{{ route('public::legal.privacy') }}">Privacy Policy</a>
                        <a class="nav-link px-0 text-white-50"
                           href="{{ route('public::legal.tos') }}">Terms & Conditions</a>
                        <a class="nav-link px-0 text-white-50"
                           href="{{ route('public::legal.cookies') }}">Cookies policy</a>
                    </nav>
                </div>
                <div class="col-12 col-lg-3">
                    <a class="footer-header h3 text-white text-decoration-none mb-4 d-block"
                       href="{{ route('public::index') }}">{{ config('app.name') }}</a>
                    <p class="small text-white-50">Lorem ipsum dolor sit amet, consectetur adipisicing elit officiis corporis optio natus. </p>
                </div>
            </div>
        </section>

        <hr class="bg-white">

        <section class="mt-1 mb-2">
            <nav class="nav justify-content-center">
                @foreach(['facebook', 'twitter', 'instagram', 'linkedin', 'github'] as $social)
                    <a class="nav-link text-white-50"
                       href="#"><i class="fab fa-{{ $social }}"></i></a>
                @endforeach
            </nav>
        </section>

        <section>
            <p class="mb-0 small text-white-50 text-center">&copy; {{ date('Y') }} {{ config('app.name') }}. @lang('All rights reserved.')</p>
        </section>
    </div>
</footer>
