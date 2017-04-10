var gulp = require('gulp');
var bump = require('./lib/bump');
var buildJS = require('./lib/build-js');
gulp.task('lint', buildJS.lint());
gulp.task('build:debug:js', ['lint'], buildJS.debug());
gulp.task('build:release:js', ['lint'], buildJS.release());
