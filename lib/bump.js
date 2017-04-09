var gulp = require('gulp');
var gulpBump = require('gulp-bump');

gulp.task('major', function () {
  return gulp.src('./package.json')
    .pipe(gulpBump({type:'major'}))
    .pipe(gulp.dest('./'));
});
gulp.task('minor', function () {
  return gulp.src('./package.json')
    .pipe(gulpBump({type:'minor'}))
    .pipe(gulp.dest('./'));
});
gulp.task('patch', function () {
  return gulp.src('./package.json')
    .pipe(gulpBump())
    .pipe(gulp.dest('./'));
});
gulp.task('alpha', function () {
  return gulp.src('./package.json')
    .pipe(gulpBump({ type: 'prerelease', preid: 'alpha' }))
    .pipe(gulp.dest('./'));
});
gulp.task('beta', function () {
  return gulp.src('./package.json')
    .pipe(gulpBump({ type: 'prerelease', preid: 'beta' }))
    .pipe(gulp.dest('./'));
});
