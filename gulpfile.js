const elixir = require('laravel-elixir');

require('laravel-elixir-vue-2');

/* ------------------------------------------------------------------------------------------------
 |  Configs
 | ------------------------------------------------------------------------------------------------
 */
elixir.config.notifications = false;

/* ------------------------------------------------------------------------------------------------
 |  Elixir Asset Management
 | ------------------------------------------------------------------------------------------------
 */
elixir((mix) => {
    // Front assets
    //---------------------------------------------------------------------------------------
    mix.sass('./resources/assets/front/sass/app.scss', 'public/assets/css')
       .webpack('./resources/assets/front/js/app.js',  'public/assets/js');

    mix.scripts([
        './node_modules/jquery/dist/jquery.js',
        './node_modules/bootstrap/dist/js/bootstrap.js'
    ], 'public/assets/js/vendors.js');

    // Fonts
    mix.copy([
        './node_modules/bootstrap-sass/assets/fonts/bootstrap',
        './node_modules/font-awesome/fonts'
    ], 'public/assets/fonts');

    // Back assets
    //---------------------------------------------------------------------------------------
    mix.sass('./resources/assets/back/sass/app.scss', 'public/vendor/foundation/css')
       .webpack('./resources/assets/back/js/app.js',  'public/vendor/foundation/js');

    mix.scripts([
        './node_modules/jquery/dist/jquery.js',
        './node_modules/vue/dist/vue.js',
        './node_modules/bootstrap/dist/js/bootstrap.js',
        './node_modules/flot/jquery.flot.js',
        './node_modules/flot/jquery.flot.resize.js',
        './node_modules/flot/jquery.flot.pie.js',
        './node_modules/flot/jquery.flot.stack.js',
        './node_modules/flot/jquery.flot.categories.js',
        './node_modules/raphael/raphael.js',
        './node_modules/morris.js/morris.js',
        './node_modules/chart.js/dist/Chart.js',
        './node_modules/sweetalert/dist/sweetalert-dev.js',
        './resources/assets/back/js/vendors/jquery.sparkline.js',
        './resources/assets/back/js/vendors/jquery-jvectormap.js',
        './resources/assets/back/js/vendors/jquery-jvectormap-world-mill-en.js',
        './node_modules/jquery-knob/js/jquery.knob.js',
        './node_modules/jquery.inputmask/dist/jquery.inputmask.bundle.js',
        './node_modules/moment/moment.js',
        './node_modules/fullcalendar/dist/fullcalendar.js',
        './node_modules/fullcalendar/dist/locale-all.js',
        './node_modules/bootstrap-colorpicker/dist/js/bootstrap-colorpicker.js',
        './node_modules/bootstrap-daterangepicker/daterangepicker.js',
        // './node_modules/bootstrap-datetimepicker/src/js/bootstrap-datetimepicker.js',
        './node_modules/bootstrap-slider/dist/bootstrap-slider.js',
        // './node_modules/select2/dist/js/select2.full.js',
        './node_modules/fastclick/lib/fastclick.js',
        './node_modules/ion-rangeslider/js/ion.rangeSlider.js',
        './node_modules/datatables/media/js/jquery.dataTables.js',
        './node_modules/datatables.net-bs/js/dataTables.bootstrap.js',
        './node_modules/simplemde/dist/simplemde.min.js',
        './node_modules/toastr/toastr.js'
    ], 'public/vendor/foundation/js/vendors.js');

    mix.copy([
        './node_modules/pace-progress/pace.min.js',
    ], 'public/vendor/foundation/js/vendors/pace.min.js');

    // Fonts
    mix.copy([
        './node_modules/bootstrap-sass/assets/fonts/bootstrap',
        './node_modules/font-awesome/fonts',
        './node_modules/ionicons/dist/fonts',
        './node_modules/weathericons/font',
        './resources/assets/back/fonts'
    ], 'public/vendor/foundation/fonts');

    // Images
    mix.copy(
        './node_modules/bootstrap-colorpicker/dist/img/bootstrap-colorpicker',
        'public/vendor/foundation/img/bootstrap-colorpicker'
    ).copy(
        './node_modules/ionrangeslider/img',
        'public/vendor/foundation/img/ion-rangeslider'
    ).copy(
        './node_modules/flag-icon-css/flags',
        'public/vendor/foundation/svg/flags'
    );

    // Demo assets
    //---------------------------------------------------------------------------------------
    mix.scripts([
        './resources/assets/demo/js/pages/dashboard.js',
    ], 'public/demo-assets/js/dashboard.js');
});
