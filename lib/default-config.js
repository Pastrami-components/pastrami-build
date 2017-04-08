var srcPath = 'src/';
var distPath = 'dist/';
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
