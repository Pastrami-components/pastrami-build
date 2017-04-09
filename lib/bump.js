var gulp = require('gulp');
var gulpBump = require('gulp-bump');

exports.major = function () {
  return gulp.src('./package.json')
    .pipe(gulpBump({type:'major'}))
    .pipe(gulp.dest('./'));
};

exports.minor = function () {
  return gulp.src('./package.json')
    .pipe(gulpBump({type:'minor'}))
    .pipe(gulp.dest('./'));
};

exports.patch = function () {
  return gulp.src('./package.json')
    .pipe(gulpBump())
    .pipe(gulp.dest('./'));
};

exports.alpha = function () {
  return gulp.src('./package.json')
    .pipe(gulpBump({ type: 'prerelease', preid: 'alpha' }))
    .pipe(gulp.dest('./'));
};

exports.beta = function () {
  return gulp.src('./package.json')
    .pipe(gulpBump({ type: 'prerelease', preid: 'beta' }))
    .pipe(gulp.dest('./'));
};
