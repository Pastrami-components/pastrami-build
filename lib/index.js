var gulp = require('gulp');
var bump = require('./bump');
var buildJS = require('./build-js');
gulp.task('lint', buildJS.lint());
gulp.task('build:debug:js', ['lint'], buildJS.debug());
gulp.task('build:release:js', ['lint'], buildJS.release());
