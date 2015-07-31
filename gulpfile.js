'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var cssmin = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var scsslint = require('gulp-scss-lint');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('scss', function() {
  return gulp.src('scss/main.scss')
    .pipe(sass({errLogToConsole: true}))
    .pipe(cssmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(reload({stream:true}))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'dist/'
        }
    });
});

gulp.task('deploy', function () {
    return gulp.src('dist/**/*')
        .pipe(deploy());
});

gulp.task('js', function() {
  gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(rename('all.min.js'))
    .pipe(reload({stream:true}))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('scss-lint', function() {
  gulp.src('scss/**/*.scss')
    .pipe(scsslint());
});

gulp.task('html', function() {
  gulp.src('./*.html')
    .pipe(gulp.dest('dist/'))
    .pipe(reload({stream:true}));
});

gulp.task('jshint', function() {
  gulp.src('js/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch', function() {
  gulp.watch('scss/**/*.scss', ['scss']);
  gulp.watch('js/*.js', ['jshint', 'js']);
  gulp.watch('./*.html', ['html']);
});

gulp.task('default', ['scss-lint', 'browser-sync', 'js', 'html', 'scss', 'watch']);
