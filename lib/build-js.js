var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var rollup = require('rollup');
var buble = require('rollup-plugin-buble');
var nodeResolve = require('rollup-plugin-node-resolve');
var config = require('./default-config');
var cleanup = require('rollup-plugin-cleanup');
var uglify = require('rollup-plugin-uglify');
var strip = require('rollup-plugin-strip');
var multiEntry = require('rollup-plugin-multi-entry');

module.exports = {
  lint: lint,
  debug: debug,
  release: release
};

function lint(paths) {
  paths = paths || config.paths;

  return function () {
    return gulp.src(paths.scripts.entry)
      .pipe(jshint({esversion: 6}))
      .pipe(jshint.reporter('default'))
      .pipe(jshint.reporter('fail'));
  };
}

function debug(paths, names) {
  paths = paths || config.paths;
  names = names || config.names;

  return function () {
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
}


function release(paths, names) {
  paths = paths || config.paths;
  names = names || config.names;

  return function () {
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
  };
}
