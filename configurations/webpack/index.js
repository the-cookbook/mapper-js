const merge = require('webpack-merge').merge;

module.exports = merge([require('./setup.dev'), require('./setup.common')]);
