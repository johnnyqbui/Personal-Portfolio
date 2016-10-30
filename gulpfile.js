var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    ngAnnotate = require('gulp-ng-annotate'),
    connect = require('gulp-connect');


// Reload if detect changes in HTML file
gulp.task('html', function() {
    gulp.src('./src/*.html')
        .pipe(connect.reload());
});

// Compile to CSS and reload
gulp.task('sass', function() {
    gulp.src('src/stylesheets/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/stylesheets/'))
        .pipe(connect.reload());
});

//  Reload if detect changes in JS file
gulp.task('script', function() {
    gulp.src('./src/scripts/*.js')
        .pipe(connect.reload());
});

/**** Concatenate and Minify ****/

// Minify Images
gulp.task('min-images', function() {
    return gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/images'));
});

// Concatenate all CSS files
gulp.task('concat-css', function() {
  gulp.src(['src/stylesheets/vendors/*.css', 'src/stylesheets/*.css'])
    .pipe(concat('concat-style.css'))
    .pipe(gulp.dest('src/concat'));
});

// Minify CSS file
gulp.task('min-css', function() {
    gulp.src('src/concat/*.css')
        .pipe(cssnano())
        .pipe(rename({ basename: 'style', suffix: '.min', extname: '.css' }))
        .pipe(gulp.dest('dist/stylesheets'));
});

// Concatenate all JS files
gulp.task('concat-js', function() {
  gulp.src(['src/scripts/vendors/jquery/dist/jquery.js', 'src/scripts/vendors/angular/angular.js', 'src/scripts/*.js'])
    .pipe(concat('concat-main.js'))
    .pipe(ngAnnotate())
    .pipe(gulp.dest('src/concat'));
});

// Minify JS file
gulp.task('min-js', function (cb) {
  pump([
      gulp.src('src/concat/*.js'),
      uglify(),
      rename({ basename: 'main', suffix: '.min', extname: '.js' }),
      gulp.dest('dist/scripts')
    ],
    cb
  );
});

// Local Web Server and live reload
gulp.task('connect', function() {
    connect.server({
        root: 'src',
        livereload: true,
        port: 8888,
    });
});

// Watch files for any changes and run specified tasks
gulp.task('watch', function() {
	gulp.watch(['./src/*.html'], ['html']);
    gulp.watch('src/stylesheets/sass/*.scss', ['sass']);
    gulp.watch(['./src/scripts/*.js'], ['script']);
});

gulp.task('default', ['min-images', 'concat-css', 'min-css', 'concat-js', 'min-js', 'sass', 'connect', 'watch']);
