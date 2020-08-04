const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const { terser } = require('rollup-plugin-terser');

const pkg = require('../../package.json');
const pkgName = 'mapper';
const global = [...Object.keys(pkg.dependencies)];

module.exports = [
  {
    input: './lib/index.js',
    output: {
      file: `lib/${pkgName}.min.js`,
      format: 'umd',
      name: pkgName,
      sourcemap: true,
      interop: false,
    },
    plugins: [
      resolve({
        mainFields: ['module', 'main'],
      }),
      commonjs(),
      terser(),
    ],
  },
  {
    input: './lib/index.js',
    output: {
      file: `lib/${pkgName}.clean.min.js`,
      format: 'umd',
      name: pkgName,
      sourcemap: true,
      interop: false,
    },
    plugins: [
      resolve({
        mainFields: ['module', 'main'],
      }),
      commonjs(),
      terser(),
    ],
    external: global,
  }
];
