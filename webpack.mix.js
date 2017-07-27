let mix = require('laravel-mix');

// Configs & Options
//-------------------------------------------------------

const publicFolder  = 'public';
const assetsFolders = {
    styles: `${publicFolder}/assets/css`,
    fonts: `${publicFolder}/assets/fonts`,
    images: `${publicFolder}/assets/img`,
    scripts: `${publicFolder}/assets/js`,
    svg: `${publicFolder}/assets/svg`
};

mix.options({
    extractVueStyles: false,
    processCssUrls: false,
    clearConsole: true,
    publicPath: publicFolder
});

mix.disableNotifications();
// mix.sourceMaps();
// mix.version();

// Scripts
//-------------------------------------------------------
mix.autoload({
    jquery: ['$', 'window.jQuery', 'jQuery']
});

mix.js('resources/assets/front/js/app.js', `${assetsFolders.scripts}/app.js`);
mix.js('resources/assets/back/js/admin.js', `${assetsFolders.scripts}/admin.js`);
mix.extract([
    // Common dependencies
    'axios', 'vue', 'jquery', 'bootstrap-sass',

    // Backend dependencies
    'lodash', 'chart.js', 'simplemde', 'eonasdan-bootstrap-datetimepicker', 'jquery-slimscroll', 'select2',
    'js-cookie', 'fastclick',

    // Media manager dependencies
    'dropzone', 'laravel-lang-js', 'laravel-form-errors'
], `${assetsFolders.scripts}/vendors.js`);

mix.copy('node_modules/pace-progress/pace.min.js', `${assetsFolders.scripts}/vendors/pace.min.js`);

// Styles
//-------------------------------------------------------

mix.sass('resources/assets/front/sass/app.scss', `${assetsFolders.styles}/app.css`);
mix.sass('resources/assets/back/sass/admin.scss', `${assetsFolders.styles}/admin.css`);

// Fonts
//-------------------------------------------------------

mix.copy([
    'node_modules/bootstrap-sass/assets/fonts/bootstrap',
    'node_modules/font-awesome/fonts',
    'node_modules/ionicons/dist/fonts',
    'node_modules/weathericons/font',
    'resources/assets/back/fonts',
], assetsFolders.fonts);

// Images
//-------------------------------------------------------

mix.copy('node_modules/bootstrap-colorpicker/dist/img/bootstrap-colorpicker', `${assetsFolders.images}/bootstrap-colorpicker`);
mix.copy('node_modules/ion-rangeslider/img', `${assetsFolders.images}/ion-rangeslider`);
mix.copy('resources/assets/back/img', assetsFolders.images);

// SVG
//-------------------------------------------------------

mix.copy('node_modules/flag-icon-css/flags', `${assetsFolders.svg}/flags`);
