var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var rollup = require('rollup');
var buble = require('rollup-plugin-buble');
var nodeResolve = require('rollup-plugin-node-resolve');
var cleanup = require('rollup-plugin-cleanup');
var uglify = require('rollup-plugin-uglify');
var strip = require('rollup-plugin-strip');
var multiEntry = require('rollup-plugin-multi-entry');
var config = require('./default-config');
var paths = config.paths;
var names = config.names;

gulp.task('lint', lint);
gulp.task('build:debug:js', ['lint'], debug);
gulp.task('build:release:js', ['lint'], release);



function lint() {
  return gulp.src(paths.scripts.entry)
    .pipe(jshint({esversion: 6}))
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
}

function debug() {
  return rollup.rollup({
    moduleId: true,
    entry: [paths.scripts.entry, './node_modules/@battr/battr-core/src/index.js'],
    plugins: [
      multiEntry(),
      nodeResolve(),
      buble()
    ],
  })
    .then(function (bundle) {
      bundle.write({
        format: 'iife',
        moduleName: names.module,
        dest: paths.dev.root+'/'+names.module+'.js',
        sourceMap: true
      });
    });
}

function release(paths, names) {
  return Promise.all([
    rollup.rollup({
      moduleId: true,
      entry: [paths.scripts.entry, './node_modules/@battr/battr-core/src/index.js'],
      plugins: [
        multiEntry(),
        nodeResolve(),
        buble(),
        cleanup(),
        strip()
      ],
    })
      .then(function (bundle) {
        bundle.write({
          format: 'iife',
          moduleName: names.module,
          dest: paths.dist.root+'/'+names.module+'.js',
          sourceMap: true
        });
      }),
      rollup.rollup({
        moduleId: true,
        entry: [paths.scripts.entry, './node_modules/@battr/battr-core/src/index.js'],
        plugins: [
          multiEntry(),
          nodeResolve(),
          buble(),
          cleanup(),
          strip(),
          uglify()
        ],
      })
        .then(function (bundle) {
          bundle.write({
            format: 'iife',
            moduleName: names.module,
            dest: paths.dist.root+'/'+names.module+'.min.js',
            sourceMap: true
          });
        })
    ]);
}
