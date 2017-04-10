var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');

require('./lib/bump');
require('./lib/build-js');
require('./lib/docs');
require('./lib/es6-template-strings');

gulp.task('build:debug', gulpSequence(
  'build:debug:js',
  'es6-template-strings'
));
gulp.task('build:release', gulpSequence(
  'build:release:js'
));
gulp.task('docs', gulpSequence(
  'docs:inject',
  'docs:serve'
));
