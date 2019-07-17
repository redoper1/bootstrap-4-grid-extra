let gulp = require('gulp');
let sass = require('gulp-sass');
let cleanCSS = require('gulp-clean-css');
let sourcemaps = require('gulp-sourcemaps');
let autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');

gulp.task('styles-basic', function () {
    return gulp.src('./scss/basic/bootstrap-grid.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./css'));
});

gulp.task('styles-extra', function () {
    return gulp.src('./scss/extra/bootstrap-grid-extra.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./css'));
});

gulp.task('minifycss-basic', function () {
    return gulp.src('./css/bootstrap-grid.css')
        .pipe(cleanCSS({restructuring: false}))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('.'));
});

gulp.task('minifycss-extra', function () {
    return gulp.src('./css/bootstrap-grid-extra.css')
        .pipe(cleanCSS({restructuring: false}))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('.'));
});

gulp.task('build', gulp.series(
    gulp.parallel('styles-basic', 'styles-extra'),
    gulp.parallel('minifycss-basic', 'minifycss-extra'))
);

gulp.task('watch', function () {
    gulp.watch(['./scss/**/*.scss', './scss/*.scss'], gulp.parallel('build'));
});

gulp.task('default', gulp.parallel('build'));