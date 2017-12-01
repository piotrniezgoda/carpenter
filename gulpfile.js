let gulp = require('gulp');
let browserSync = require('browser-sync');
let sass = require('gulp-sass');
let sourcemaps = require('gulp-sourcemaps');
let autoprefixer = require('gulp-autoprefixer');
let cleanCss = require('gulp-clean-css');
let imagemin = require('gulp-imagemin');
let changed = require('gulp-changed');
let htmlReplace = require('gulp-html-replace');
let htmlmin = require('gulp-htmlmin');
let uglify = require('gulp-uglify');
let del = require('del');
let sequence = require('run-sequence');

let path = {
    dist: 'dist/',
    htmlin: 'src/*.html',
    cssin: 'src/css/**/*.css',
    scssin: 'src/scss/**/*.scss',
    imgin: 'src/images/**/*.{jpg,jpeg,png,gif}',
    jsin: 'src/js/**/*.js',
    imgout: 'dist/images',
    cssout: 'dist/css',
    scssout: 'src/css',
    jsout: 'dist/js/',
}


gulp.task('reload', function() {
  browserSync.reload();
})

gulp.task('serve', ['sass'], function() {
  browserSync({
    server: 'src'
  });
});

gulp.task('sass', function() {
  return gulp.src(path.scssin)
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: ['last 3 versions']
  }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(path.scssout))
  .pipe(browserSync.stream())
});

gulp.task('mincss', function() {
  return gulp.src(path.cssin)
  .pipe(cleanCss())
  .pipe(gulp.dest(path.cssout))
});

gulp.task('jsmove', function() {
  return gulp.src(path.jsin)
  .pipe(gulp.dest(path.jsout))
});

gulp.task('img', function() {
  return gulp.src(path.imgin)
  .pipe(changed(path.imgout))
  .pipe(imagemin())
  .pipe(gulp.dest(path.imgout))
});

gulp.task('html', function() {
  return gulp.src(path.htmlin)
  .pipe(htmlmin({
    SortAttributes: true,
    sortClassName: true,
    collapseWhitespace: true,
  }))
  .pipe(gulp.dest(path.dist))
});

gulp.task('clean', function() {
  return del(['dist']);
});

gulp.task('fontsmove', function() {
  return gulp.src('src/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
})

gulp.task('build', function() {
  sequence('clean', ['html','mincss','img', 'jsmove', 'fontsmove']);
});

gulp.watch(path.htmlin, ['reload']);
gulp.watch(path.scssin, ['sass']);
gulp.watch(path.jsin, ['reload']);

gulp.task('default', ['serve']);
