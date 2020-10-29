const path = require('path');

/*--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 */

module.exports = (mix, options) => {
    mix.ts(path.join(__dirname, 'js/main.ts'), 'js/app.js');
    mix.sass(path.join(__dirname, 'scss/main.scss'), 'css/app.css');

    mix.copyDirectory(path.join(__dirname, 'svg'), path.join(options.paths.assets, 'svg/app'));
}
