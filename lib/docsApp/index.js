var gulp = require('gulp');
var gulpServe = require('gulp-serve');
var gulpSequence = require('gulp-sequence');
var config = require('../default-config');
var injectDocs = require('./inject-docs');

gulp.task('docs:inject', injectDocs());
gulp.task('docs:serve', serve);


function serve() {
  return gulpServe({
    root: [config.paths.docs.app.roo, 'bower_components', 'dev'],
    port: 8080
  });
}
