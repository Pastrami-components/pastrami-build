var gulp = require('gulp');
var bump = require('./lib/bump');

gulp.task('major', bump.major);
gulp.task('minor', bump.minor);
gulp.task('patch', bump.patch);
gulp.task('alpha', bump.alpha);
