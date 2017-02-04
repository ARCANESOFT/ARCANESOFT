const { mix } = require('laravel-mix');

// Styles
//-------------------------------------------------------

mix.sass('resources/assets/front/sass/app.scss', '/assets/css');
mix.sass('resources/assets/back/sass/admin.scss', '/assets/css');

// Scripts
//-------------------------------------------------------

mix.js('resources/assets/front/js/app.js', '/assets/js');
mix.js('resources/assets/back/js/admin.js', '/assets/js')
   .extract(
       [
           'axios', 'vue', 'jquery', 'bootstrap-sass', 'lodash', 'chart.js', 'simplemde',
           'eonasdan-bootstrap-datetimepicker', 'jquery-slimscroll', 'select2', 'js-cookie'
       ],
       '/assets/js/vendors.js'
   );

mix.copy('node_modules/pace-progress/pace.min.js', 'public/assets/js/vendors/pace.min.js');

mix.sourceMaps().version();

// Fonts
//-------------------------------------------------------

mix.copy('node_modules/bootstrap-sass/assets/fonts/bootstrap', 'public/assets/fonts');
mix.copy('node_modules/font-awesome/fonts', 'public/assets/fonts');
mix.copy('node_modules/ionicons/dist/fonts', 'public/assets/fonts');
mix.copy('node_modules/weathericons/font', 'public/assets/fonts');
mix.copy('resources/assets/back/fonts', 'public/assets/fonts');

// Images
//-------------------------------------------------------

mix.copy('node_modules/bootstrap-colorpicker/dist/img/bootstrap-colorpicker', 'public/assets/img/bootstrap-colorpicker');
mix.copy('node_modules/ion-rangeslider/img', 'public/assets/img/ion-rangeslider');
mix.copy('resources/assets/back/img', 'public/assets/img');

// SVG
//-------------------------------------------------------

mix.copy('node_modules/flag-icon-css/flags', 'public/assets/svg/flags');

// Demo assets
//-------------------------------------------------------
// mix.copy('resources/assets/demo/js/pages/dashboard.js', 'public/demo-assets/js/dashboard.js');
