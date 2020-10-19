const path = require('path');

/*--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 */

module.exports = (mix, options) => {
    mix.ts(path.join(__dirname, 'js/main.ts'), 'js/arcanesoft.js');
    mix.sass(path.join(__dirname, 'scss/main.scss'), 'css/arcanesoft.css');

    // mix.copyDirectory(path.join(__dirname, 'svg'), `${options.assetsPath}/svg/arcanesoft`);
}
