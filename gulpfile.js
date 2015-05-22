var gulp = require('gulp');

var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');


/*
 *    Dev tasks
 */

// JavaScript Linter
gulp.task('jshint', function () {
    return gulp.src('site/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile sass
gulp.task('sass', function () {
    return gulp.src('site/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('site/css'));
});

// Watch for changes
gulp.task('watch', function () {
    gulp.watch('site/js/*.js', ['jshint']);
    gulp.watch('site/scss/*.scss', ['sass']);
});

// Default task
gulp.task('default', ['jshint', 'sass', 'watch']);


/*
 *   Build tasks
 */

// Minify HTML
gulp.task('html', function () {
    gulp.src('site/index.html')
        .pipe(minifyHTML())
        .pipe(gulp.dest('build/'));
});

// Minify JS
gulp.task('scripts', function () {
    return browserify('./site/js/main.js')
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
});

// Build styles, concatenate files
gulp.task('styles', function () {
    gulp.src('site/css/*.css')
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('build/css'));
});

// Image optimization
gulp.task('images', function () {
    gulp.src('site/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/img'));
});

// Build task
gulp.task('build', ['jshint', 'sass', 'html', 'scripts', 'styles', 'images']);
