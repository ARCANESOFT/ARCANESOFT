'use strict';

/* --------------------------------------------------------------------------
 *  Gulp libs
 * --------------------------------------------------------------------------
 */
var elixir = require('laravel-elixir'),
    gulp   = require('gulp');

/* --------------------------------------------------------------------------
 *  Directories
 * --------------------------------------------------------------------------
 */

var dirs       = {};
dirs.resources = './resources/assets';
dirs.public    = './www';
dirs.bower     = dirs.resources + '/bower';
dirs.assets    = dirs.public    + '/assets';

/* --------------------------------------------------------------------------
 *  Configs
 * --------------------------------------------------------------------------
 */
elixir.config.publicPath                  = dirs.assets;
elixir.config.css.minifyCss.pluginOptions = {
    keepSpecialComments: 0,
    processImport: false
};

elixir(function(mix) {
    mix.less('style.less')
       .browserify('app.js');

    // Vendors
    //======================================================>

    // Scripts
    //---------------------
    mix.scripts([
        dirs.bower + '/jquery/dist/jquery.js',
        dirs.bower + '/vue/dist/vue.js',
        dirs.bower + '/bootstrap/dist/js/bootstrap.js',
        dirs.bower + '/sweetalert/dist/sweetalert.min.js',
        dirs.bower + '/owl.carousel/dist/owl.carousel.js'
    ], dirs.assets + '/js/vendors.js');

    // Fonts
    //---------------------
    mix.copy(
        dirs.bower + '/bootstrap/fonts',
        dirs.assets + '/fonts'
    ).copy(
        dirs.bower + '/font-awesome/fonts',
        dirs.assets + '/fonts'
    );

    // Images
    //---------------------
    mix.copy(
        dirs.bower + '/owl.carousel/src/img',
        dirs.assets + '/img'
    );
});
