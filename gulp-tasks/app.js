'use strict';

/* --------------------------------------------------------------------------
 *  Gulp libs
 * --------------------------------------------------------------------------
 */
var gulp       = require('gulp'),
    less       = require('gulp-less'),
    concat     = require('gulp-concat'),
    minifyCss  = require('gulp-minify-css'),
    uglify     = require('gulp-uglify'),
    notify     = require('gulp-notify');

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
 *  Main Tasks
 * --------------------------------------------------------------------------
 */
gulp.task('default', ['less', 'js']);

gulp.task('watch', function () {
    gulp.watch(dirs.resources + '/less/**/*.less', ['less']);
    gulp.watch(dirs.resources + '/js/**/*.js', ['js']);
});

gulp.task('all', ['default', 'modules', 'vendors']);

/* --------------------------------------------------------------------------
 *  Resources Tasks
 * --------------------------------------------------------------------------
 */
gulp.task('less', function () {
    gulp.src(dirs.resources + '/less/style.less')
        .pipe(less())
        .on('error', notify.onError({
            title:   'Error compiling LESS.',
            message: 'Error: <%= error.message %>',
            onLast:  true,
            sound:   true
        }))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(gulp.dest(dirs.assets + '/css/'))
        .pipe(notify({
            title:   'Less compiled',
            message: 'Less compiled with success !',
            onLast:   true,
            sound:    false
        }));
});

gulp.task('js', function () {
    gulp.src(dirs.resources + '/js/app.js')
        .pipe(uglify())
        .pipe(gulp.dest(dirs.assets + '/js/'));
});

/* --------------------------------------------------------------------------
 *  Modules Tasks
 * --------------------------------------------------------------------------
 */
gulp.task('modules', function () {
    //
});

/* --------------------------------------------------------------------------
 *  Vendors Tasks
 * --------------------------------------------------------------------------
 */
gulp.task('vendors', ['js-vendors', 'img-vendors', 'fonts-vendors']);

gulp.task('js-vendors', function() {
    return gulp.src([
        dirs.bower + '/jquery/dist/jquery.js',
        dirs.bower + '/vue/dist/vue.js',
        dirs.bower + '/bootstrap/dist/js/bootstrap.js',
        dirs.bower + '/sweetalert/dist/sweetalert.min.js',
        dirs.bower + '/owl.carousel/dist/assets/owl.carousel.js'
    ])
        .pipe(concat('vendors.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dirs.assets + '/js/'));
});

gulp.task('img-vendors', function() {
    gulp.src([
        dirs.bower + '/owl.carousel/src/img/*'
    ]).pipe(gulp.dest(dirs.assets + '/img/'))
});

gulp.task('fonts-vendors', function() {
    gulp.src([
        dirs.bower + '/bootstrap/fonts/*',
        dirs.bower + '/font-awesome/fonts/*'
    ]).pipe(gulp.dest(dirs.assets + '/fonts/'))
});
