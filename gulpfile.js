emailName = 'emailName'
archiveName = 'emailName.zip';

//----- required variables -----

var gulp = require('gulp');
var gutil = require('gulp-util');
var runSequence = require('run-sequence');
var connect = require('gulp-connect');
var open = require('gulp-open');
var prettify = require('gulp-prettify');
var zip = require('gulp-zip');

//----- required variables -----


//----- email building tasks -----


gulp.task('prettify', function () {
    gulp.src('src/*.html')
        .pipe(prettify({
            indent_size: 2
        }))
        .pipe(gulp.dest('src'));
    gutil.log(gutil.colors.green('.HTML is prettier now'));
});

//----- email building tasks -----

//----- server tasks -----

gulp.task('connect', function () {
    connect.server({
        root: ['src'],
        port: 8889,
        livereload: true,
    });
});

gulp.task('open', function () {
    var options = {
        uri: 'http://localhost:8889'
    };
    gutil.log('-----------------------------------------');
    gutil.log('Opening browser to:', gutil.colors.yellow('http://localhost:8889'));
    gutil.log('-----------------------------------------');
    gulp.src(__filename)
        .pipe(open(options));
});

gulp.task('basic-reload', function () {
    gulp.src('src')
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(['src/*.html', 'src/style/*.css', 'src/js/*.js', 'src/json/*.json', 'src/pages/*.html'], ['basic-reload']);
});

gulp.task('serve', function (callback) {
    runSequence(['connect'], ['open', 'watch'],
        callback);
});

//----- server tasks -----

//----- package tasks -----

gulp.task('copy-html-to-dist-folder', function () {
    gulp.src(['src/index.html'])
        .pipe(gulp.dest('deploy'));
    gutil.log(gutil.colors.green('html packaged to deploy folder'));
});

gulp.task('copy-images-to-dist-folder', function () {
    gulp.src(['src/images/*.png', 'src/images/*.jpg', 'src/images/*.gif'])
        .pipe(gulp.dest('deploy/images'));
    gutil.log(gutil.colors.green('images packaged to deploy folder'));
});

gulp.task('compress', function () {
    gulp.src('deploy/*')
        .pipe(zip(archiveName))
        .pipe(filesize())
        .pipe(gulp.dest('delivery'));
});

gulp.task('build', function (callback) {
    runSequence('copy-html-to-dist-folder', 'copy-images-to-dist-folder',
        callback);
    gutil.log(gutil.colors.green('Email ready to be delivered, test it first!!!'));
});

//----- package tasks -----

