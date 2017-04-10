var gulp = require('gulp');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var jshint = require('gulp-jshint');
var rollupBetter = require('gulp-better-rollup');
var buble = require('rollup-plugin-buble');
var nodeResolve = require('rollup-plugin-node-resolve');
var gulpPlumber = require('gulp-plumber');
var config = require('./default-config');
var gulpMerge = require('gulp-merge');

// var rename = require('gulp-rename');
// var cleanup = require('rollup-plugin-cleanup');
// var uglify = require('rollup-plugin-uglify');
// var strip = require('rollup-plugin-strip');


module.exports = {
  debug: debug,
  release: release
};


function debug(paths, names) {
  paths = paths || config.paths;
  names = names || config.names;

  return function () {
    return gulp.src(paths.scripts.entry)
      .pipe(gulpPlumber())
      .pipe(jshint({esversion: 6}))
      .pipe(jshint.reporter('default'))
      .pipe(sourcemaps.init())
      .pipe(rollupBetter({
        moduleName: names.module,
        moduleId: true,
        plugins: [
          nodeResolve({
            jsnext: true
          }),
          buble()
        ]
      }, 'iife'))
      .pipe(sourcemaps.write(''))
      .pipe(gulp.dest(paths.dev.root));
  }
}


function release() {
  return gulpMerge(
    gulp.src(paths.scripts.entry)
      .pipe(gulpPlumber())
      .pipe(jshint({esversion: 6}))
      .pipe(jshint.reporter('default'))
      .pipe(jshint.reporter('fail'))
      .pipe(rollup({
        moduleName: names.module,
        moduleId: true,
        format: 'iife',
        plugins: [
          nodeResolve(),
          buble(),
          cleanup(),
          strip()
        ]
      }))
      .pipe(rename(names.file+'.js'))
      .pipe(gulp.dest(paths.dist)),

      gulp.src(paths.scripts.entry)
        .pipe(gulpPlumber())
        .pipe(jshint({esversion: 6}))
        .pipe(jshint.reporter('fail'))
        .pipe(rollup({
          moduleName: names.module,
          moduleId: true,
          format: 'iife',
          plugins: [
            nodeResolve(),
            buble(),
            cleanup(),
            strip(),
            uglify()
          ]
        }))
        .pipe(rename(names.file+'.min.js'))
        .pipe(gulp.dest(paths.dist))
    )
    .on('end', function() {
      gutil.log(gutil.colors.green('✔ JS Dev'), 'Finished');
    });
}
