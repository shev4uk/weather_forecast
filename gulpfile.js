var gulp = require('gulp');

var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

var concat = require('gulp-concat');
var notify = require("gulp-notify");

// scripts
gulp.task('app_js', function() {
  return gulp.src([
      'app/app.js',
      'app/controllers.js',
      'app/filters.js'
    ])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('assets/js/'));
});

// styles
gulp.task('sass', function() {
  gulp.src('assets/scss/style.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .on('error', notify.onError('<%= error.message %>'))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('assets/css/'));
});

//watch
gulp.task('watch', ['sass'], function() {
  gulp.watch('assets/scss/**/*.scss', ['sass']);
  gulp.watch('app/**/*.js', ['app_js']);
});

gulp.task('default', function() {
  // place code for your default task here
});
