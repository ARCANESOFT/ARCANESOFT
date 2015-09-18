var gulp   = require('gulp'),
    elixir = require('laravel-elixir');

/* --------------------------------------------------------------------------
 *  General Configs
 * --------------------------------------------------------------------------
 */
var bowerDirectory        = './vendor/bower_components/',
    publicDirectory       = './www/assets/';

/* --------------------------------------------------------------------------
 *  Elixir Configs
 * --------------------------------------------------------------------------
 */
elixir.config.assetsDir   = 'resources/assets/';
elixir.config.cssOutput   = publicDirectory + 'css';
elixir.config.jsOutput    = publicDirectory + 'js';
elixir.config.bowerDir    = bowerDirectory;
elixir.config.sourcemaps  = false;
//elixir.config.production  = !! util.env.production;
//elixir.config.srcDir      = 'app';
//elixir.config.tasks       = [];
//elixir.config.watchers    = { default: {} };
//elixir.config.duplicate   = [];
//elixir.config.concatenate = {
//    css: [],
//    js: []
//};

/* --------------------------------------------------------------------------
 *  Elixir Asset Management
 * --------------------------------------------------------------------------
 */
elixir(function(mix) {
    // Publishing the fonts
    mix.copy([
        bowerDirectory + 'bootstrap/fonts',
        bowerDirectory + 'font-awesome/fonts'
    ], publicDirectory + 'fonts');

    // Compiling app scripts
    mix.scripts([
        bowerDirectory + 'jquery/dist/jquery.js',
        bowerDirectory + 'vue/dist/vue.js',
        bowerDirectory + 'bootstrap/dist/js/bootstrap.js'
    ], publicDirectory + 'js/vendors.js');

    mix.scripts('app.js', publicDirectory + 'js/app.js');

    // Compiling app styles
    mix.less('style.less', publicDirectory + 'css/style.css');
});
