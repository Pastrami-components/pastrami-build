var srcPath = 'src/';
var distPath = 'dist/';
var devPath = 'dev/';

exports.names = {
  file: 'battr-core',
  module: 'battr-core',
  styles: 'battr-core'
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
