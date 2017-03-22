const { mix } = require('laravel-mix');

const publicFolder  = 'public';
const publicFolders = {
    fonts: publicFolder + '/assets/fonts',
    images: publicFolder + '/assets/img',
    scripts: publicFolder + '/assets/js',
    svg: publicFolder + '/assets/svg'
};

mix.disableNotifications();
// mix.sourceMaps();
// mix.version();
mix.setPublicPath(publicFolder);

// Styles
//-------------------------------------------------------

mix.sass('resources/assets/front/sass/app.scss', '/assets/css')
    .options({ processCssUrls: false });

mix.sass('resources/assets/back/sass/admin.scss', '/assets/css')
    .options({ processCssUrls: false });

// Scripts
//-------------------------------------------------------

mix.js('resources/assets/front/js/app.js', '/assets/js');
mix.js('resources/assets/back/js/admin.js', '/assets/js')
   .extract([
       'axios', 'vue', 'jquery', 'bootstrap-sass', 'lodash', 'chart.js', 'simplemde', 'dropzone',
       'eonasdan-bootstrap-datetimepicker', 'jquery-slimscroll', 'select2', 'js-cookie', 'fastclick'
   ], '/assets/js/vendors.js');

mix.copy('node_modules/pace-progress/pace.min.js', publicFolders.scripts + '/vendors/pace.min.js');

// Fonts
//-------------------------------------------------------
mix.copy([
    'node_modules/bootstrap-sass/assets/fonts/bootstrap',
    'node_modules/font-awesome/fonts',
    'node_modules/ionicons/dist/fonts',
    'node_modules/weathericons/font',
    'resources/assets/back/fonts',
], publicFolders.fonts + '/fonts');

// Images
//-------------------------------------------------------

mix.copy('node_modules/bootstrap-colorpicker/dist/img/bootstrap-colorpicker', publicFolders.images + '/bootstrap-colorpicker');
mix.copy('node_modules/ion-rangeslider/img', publicFolders.images + '/ion-rangeslider');
mix.copy('resources/assets/back/img', publicFolders.images);

// SVG
//-------------------------------------------------------

mix.copy('node_modules/flag-icon-css/flags', publicFolders.svg + '/flags');

// Demo assets
//-------------------------------------------------------
// mix.copy('resources/assets/demo/js/pages/dashboard.js', publicFolder + '/demo-assets/js/dashboard.js');
