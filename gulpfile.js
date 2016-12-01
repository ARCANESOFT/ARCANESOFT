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
        './bower_components/jquery/dist/jquery.js',
        './bower_components/bootstrap/dist/js/bootstrap.js'
    ], 'public/assets/js/vendors.js');

    // Fonts
    mix.copy([
        './bower_components/bootstrap-sass/assets/fonts/bootstrap',
        './bower_components/font-awesome/fonts'
    ], 'public/assets/fonts');

    // Back assets
    //---------------------------------------------------------------------------------------
    mix.sass('./resources/assets/back/sass/app.scss', 'public/vendor/foundation/css')
       .webpack('./resources/assets/back/js/app.js',  'public/vendor/foundation/js');

    mix.scripts([
        './bower_components/jquery/dist/jquery.js',
        './bower_components/jquery-ui/jquery-ui.js',
        './resources/assets/back/js/vendors/jquery-ui-fix.js',
        './bower_components/bootstrap/dist/js/bootstrap.js',
        './resources/assets/back/js/vendors/bootstrap-fix.js',
        './bower_components/vue/dist/vue.js',
        './bower_components/jquery-flot/jquery.flot.js',
        './bower_components/jquery-flot/jquery.flot.resize.js',
        './bower_components/jquery-flot/jquery.flot.pie.js',
        './bower_components/jquery-flot/jquery.flot.stack.js',
        './bower_components/jquery-flot/jquery.flot.categories.js',
        './bower_components/raphael/raphael.js',
        './bower_components/morris.js/morris.js',
        './bower_components/chart.js/dist/Chart.js',
        './bower_components/sweetalert/dist/sweetalert-dev.js',
        './resources/assets/back/js/vendors/jquery.sparkline.js',
        './resources/assets/back/js/vendors/jquery-jvectormap.js',
        './resources/assets/back/js/vendors/jquery-jvectormap-world-mill-en.js',
        './bower_components/jquery-knob/js/jquery.knob.js',
        './bower_components/jquery-inputmask/dist/jquery.inputmask.bundle.js',
        './bower_components/moment/moment.js',
        './bower_components/fullcalendar/dist/fullcalendar.js',
        './bower_components/fullcalendar/dist/locale-all.js',
        './bower_components/bootstrap-colorpicker/dist/js/bootstrap-colorpicker.js',
        './bower_components/bootstrap-daterangepicker/daterangepicker.js',
        './bower_components/bootstrap-datetimepicker/src/js/bootstrap-datetimepicker.js',
        './bower_components/bootstrap-slider/dist/bootstrap-slider.js',
        './bower_components/select2/dist/js/select2.full.js',
        './bower_components/fastclick/lib/fastclick.js',
        './bower_components/ionrangeslider/js/ion.rangeSlider.js',
        './bower_components/datatables/js/jquery.dataTables.js',
        './bower_components/datatables-bs/js/dataTables.bootstrap.js',
        './bower_components/trumbowyg/dist/trumbowyg.js',
        './bower_components/trumbowyg/dist/langs/ar.min.js',
        './bower_components/trumbowyg/dist/langs/fr.min.js',
        './resources/assets/back/js/vendors/trumbowyg-config.js',
        './bower_components/toastr/toastr.js'
    ], 'public/vendor/foundation/js/vendors.js');

    mix.copy([
        './bower_components/pace/pace.min.js',
    ], 'public/vendor/foundation/js/vendors/pace.min.js');

    // Fonts
    mix.copy([
        './bower_components/bootstrap-sass/assets/fonts/bootstrap',
        './bower_components/font-awesome/fonts',
        './bower_components/ionicons/fonts',
        './bower_components/weather-icons/font',
        './resources/assets/back/fonts'
    ], 'public/vendor/foundation/fonts');

    // Images
    mix.copy(
        './bower_components/bootstrap-colorpicker/dist/img/bootstrap-colorpicker',
        'public/vendor/foundation/img/bootstrap-colorpicker'
    ).copy(
        './bower_components/ionrangeslider/img',
        'public/vendor/foundation/img/ion-rangeslider'
    );

    // Demo assets
    //---------------------------------------------------------------------------------------
    mix.scripts([
        './resources/assets/demo/js/pages/dashboard.js',
    ], 'public/demo-assets/js/dashboard.js');
});
