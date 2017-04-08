var srcPath = 'src/';
var distPath = 'dist/';
var devPath = 'dev/';

exports.names = {
  file: 'pastrami-core',
  module: 'pastrami-core',
  styles: 'pastrami-core'
};
exports.paths = {
  src: srcPath,
  dist: {
    root: distPath
  },
  dev: {
    root: devPath
  },
  scripts: {
    root: srcPath,
    all: srcPath + '**/*.js',
    entry: srcPath + 'index.js'
  },
  styles: {
    root: srcPath,
    all: srcPath + '**/*.scss'
  }
};
