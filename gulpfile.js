var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var cleanCss = require('gulp-clean-css');
var plumber = require('gulp-plumber');
var prefix = require('gulp-autoprefixer');
var flatten = require('gulp-flatten');
var connect = require('gulp-connect');

var path = {
  source: 'src/',
  assets: 'app/assets/'
}

gulp.task('styles', function (done) {
  gulp.src([path.source + '/styles/app.scss'])
    .pipe(plumber())
    .pipe(sass({ errLogToConsole: true }))
    .pipe(prefix(['ie >= 10', 'ff >= 30', 'chrome >= 34', 'safari >= 7', 'opera >= 23', 'ios >= 7', 'android >= 4.4']))
    .pipe(concat('styles.min.css'))
    .pipe(cleanCss({ compatibility: 'ie9' }))
    .pipe(gulp.dest(path.assets))

  done();
})

gulp.task('images', function (done) {
  gulp.src([path.source + '/images/*.{jpg,png,gif}'])
    .pipe(flatten())
    .pipe(gulp.dest(path.assets + '/images/'));

  done();
})

gulp.task('watch', function (done) {
  gulp.watch('./src/**/*', gulp.series('styles', 'images'));

  done();
})

gulp.task('connect', function(done) {
  connect.server({
    root: 'app'
  });

  done();
});

gulp.task('default', gulp.parallel('styles', 'images', 'connect', 'watch'));
