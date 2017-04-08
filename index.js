exports.bump = require('./lib/bump');
exports.build = {
  js: {
    debug: require('./lib/build-js')
  },
  scss: {
    debug: require('./lib/build-scss')
  }
};
