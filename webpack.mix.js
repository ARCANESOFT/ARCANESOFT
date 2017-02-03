const { mix } = require('laravel-mix');

// Front assets
//-------------------------------------------------------

// Style & Scripts
mix.sass('resources/assets/front/sass/app.scss', '/assets/css')
   .js('resources/assets/front/js/app.js', '/assets/js')
   .extract(
       ['axios', 'vue', 'jquery', 'bootstrap-sass', 'lodash'],
       '/assets/js/vendors.js'
   );

// Fonts
mix.copy('node_modules/bootstrap-sass/assets/fonts/bootstrap', 'public/assets/fonts');
mix.copy('node_modules/font-awesome/fonts', 'public/assets/fonts');

// Back assets
//-------------------------------------------------------

// Style & Scripts
mix.sass('resources/assets/back/sass/app.scss', '/vendor/foundation/css')
   .js('resources/assets/back/js/app.js', '/vendor/foundation/js')
   .extract(
       [
           'axios', 'vue', 'jquery', 'bootstrap-sass', 'lodash', 'simplemde', 'eonasdan-bootstrap-datetimepicker',
           'jquery-slimscroll', 'select2'
       ],
       '/vendor/foundation/js/vendors.js'
   );

mix.copy('node_modules/pace-progress/pace.min.js', 'public/vendor/foundation/js/vendors/pace.min.js');

// Fonts
mix.copy('node_modules/bootstrap-sass/assets/fonts/bootstrap', 'public/vendor/foundation/fonts');
mix.copy('node_modules/font-awesome/fonts', 'public/vendor/foundation/fonts');
mix.copy('node_modules/ionicons/dist/fonts', 'public/vendor/foundation/fonts');
mix.copy('node_modules/weathericons/font', 'public/vendor/foundation/fonts');
mix.copy('resources/assets/back/fonts', 'public/vendor/foundation/fonts');

// Images
mix.copy(
    'node_modules/bootstrap-colorpicker/dist/img/bootstrap-colorpicker',
    'public/vendor/foundation/img/bootstrap-colorpicker'
);

mix.copy(
    'node_modules/ion-rangeslider/img',
    'public/vendor/foundation/img/ion-rangeslider'
);

// SVG
mix.copy(
    'node_modules/flag-icon-css/flags',
    'public/vendor/foundation/svg/flags'
);

// Demo assets
//-------------------------------------------------------
// mix.copy('resources/assets/demo/js/pages/dashboard.js', 'public/demo-assets/js/dashboard.js');
