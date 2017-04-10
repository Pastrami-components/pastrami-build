var srcPath = 'src/';
var distPath = 'dist/';
var devPath = 'dev/';
var docsApp = 'docs-app/';

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
    root: devPath,
    all: devPath + '**/*',
    scripts: devPath + '**/*.js',
    styles: devPath + '**/*.css'
  },
  scripts: {
    root: srcPath,
    all: srcPath + '**/*.js',
    entry: srcPath + 'index.js'
  },
  styles: {
    root: srcPath,
    all: srcPath + '**/*.scss'
  },
  docs: {
    app: {
      root: docsApp,
      index: docsApp+'index.html'
    }
  }
};
