var gulp = require('gulp');
var webmake = require('gulp-webmake');
var gulpStrip = require('gulp-strip-comments');
var gulpTap = require("gulp-tap");
var config = require('./default-config');


exports.debug = function (dest) {
  dest = dest || config.paths.dev.root;

  return gulp.src([
    'node_modules/es6-template-strings/index.js',
    'node_modules/es6-template-strings/compile.js',
    'node_modules/es6-template-strings/resolve-to-string.js'
  ])
  .pipe(webmake())
  .pipe(gulpStrip())
  .pipe(gulpTap(function(file) {
    var moduleName = 'template-strings-'+path.basename(file.path, '.js');
    file.contents = Buffer.concat([
        new Buffer('window["'+moduleName+'"] = '),
        file.contents
    ]);
  }))
  .pipe(gulp.dest(dest+'/template-strings/'));
};
