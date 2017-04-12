var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var paths = require('./lib/default-config').paths;

require('./lib/bump');
require('./lib/build-js');
require('./lib/docsApp');
require('./lib/es6-template-strings');

gulp.task('build:debug', gulpSequence(
  'build:debug:js',
  'build:debug:scss',
  'es6-template-strings'
));
gulp.task('build:release', gulpSequence(
  'build:release:js'
));
gulp.task('docs', gulpSequence(
  'docs:inject',
  'docs:serve'
));
gulp.task('build:watch:js', gulpSequence(
  'build:debug:js',
  'docs'
));
gulp.task('start-debug', gulpSequence(
  'build:debug',
  'docs',
  'watch'
));
gulp.task('watch', function (e) {
  gulp.watch(paths.scripts.all, ['build:watch:js']);
  // gulp.watch(paths.styles.all, ['build:dev:scss', 'build:dev:inject']);
});
