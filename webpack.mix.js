const { mix } = require('laravel-mix');

// Configs & Options
//-------------------------------------------------------

const publicFolder  = 'public';
const publicFolders = {
    fonts: `${publicFolder}/assets/fonts`,
    images: `${publicFolder}/assets/img`,
    scripts: `${publicFolder}/assets/js`,
    svg: `${publicFolder}/assets/svg`
};
const republishAssets = false;

mix.options({
    extractVueStyles: false,
    processCssUrls: false,
    clearConsole: true
});
mix.disableNotifications();
// mix.sourceMaps();
// mix.version();
mix.setPublicPath(publicFolder);

// Styles
//-------------------------------------------------------

mix.sass('resources/assets/front/sass/app.scss', '/assets/css');
mix.sass('resources/assets/back/sass/admin.scss', '/assets/css');

// Scripts
//-------------------------------------------------------
mix.autoload({
    jquery: ['$', 'window.jQuery', 'jQuery']
});

mix.js('resources/assets/front/js/app.js', '/assets/js/app.js');
mix.js('resources/assets/back/js/admin.js', '/assets/js/admin.js');
mix.extract([
    // Common dependencies
    'axios', 'vue', 'jquery', 'bootstrap-sass',

    // Backend dependencies
    'lodash', 'chart.js', 'simplemde', 'eonasdan-bootstrap-datetimepicker', 'jquery-slimscroll', 'select2',
    'js-cookie', 'fastclick',

    // Media manager dependencies
    'dropzone', 'laravel-lang-js', 'laravel-form-errors'
], '/assets/js/vendors.js');

mix.copy('node_modules/pace-progress/pace.min.js', `${publicFolders.scripts}/vendors/pace.min.js`);

// Publishes
//-------------------------------------------------------

if (republishAssets) {

    // Fonts
    //-------------------------------------------------------

    mix.copy([
        'node_modules/bootstrap-sass/assets/fonts/bootstrap',
        'node_modules/font-awesome/fonts',
        'node_modules/ionicons/dist/fonts',
        'node_modules/weathericons/font',
        'resources/assets/back/fonts',
    ], publicFolders.fonts);

    // Images
    //-------------------------------------------------------

    mix.copy('node_modules/bootstrap-colorpicker/dist/img/bootstrap-colorpicker', `${publicFolders.images}/bootstrap-colorpicker`);
    mix.copy('node_modules/ion-rangeslider/img', `${publicFolders.images}/ion-rangeslider`);
    mix.copy('resources/assets/back/img', publicFolders.images);

    // SVG
    //-------------------------------------------------------

    mix.copy('node_modules/flag-icon-css/flags', `${publicFolders.svg}/flags`);

}
