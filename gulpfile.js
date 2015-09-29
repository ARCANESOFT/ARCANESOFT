/* --------------------------------------------------------------------------
 *  Gulp libs
 * --------------------------------------------------------------------------
 */
var gulp      = require('gulp'),
    less      = require('gulp-less'),
    concat    = require('gulp-concat'),
    minifyCss = require('gulp-minify-css'),
    uglify    = require('gulp-uglify');

/* --------------------------------------------------------------------------
 *  Directories
 * --------------------------------------------------------------------------
 */
var resourcesDirectory    = './resources/assets',
    publicDirectory       = './www',
    bowerDirectory        = resourcesDirectory + '/bower',
    assetsDirectory       = publicDirectory + '/assets';

/* --------------------------------------------------------------------------
 *  Tasks
 * --------------------------------------------------------------------------
 */
gulp.task('default', ['less', 'js']);

gulp.task('all', ['fonts', 'js-vendors', 'default']);

gulp.task('less', function () {
    gulp.src(resourcesDirectory + '/less/style.less')
        .pipe(less())
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(gulp.dest(assetsDirectory + '/css/'));
});

gulp.task('js', function () {
    gulp.src(resourcesDirectory + '/js/app.js')
        .pipe(uglify())
        .pipe(gulp.dest(assetsDirectory + '/js/'));
});

gulp.task('js-vendors', function() {
    return gulp.src([
        bowerDirectory + '/jquery/dist/jquery.js',
        bowerDirectory + '/vue/dist/vue.js',
        bowerDirectory + '/bootstrap/dist/js/bootstrap.js'
    ])
        .pipe(concat('vendors.js'))
        .pipe(uglify())
        .pipe(gulp.dest(assetsDirectory + '/js/'));
});

gulp.task('fonts', function() {
    gulp.src([
        bowerDirectory + '/bootstrap/fonts/*',
        bowerDirectory + '/font-awesome/fonts/*'
    ]).pipe(gulp.dest(assetsDirectory + '/fonts/'))
});
