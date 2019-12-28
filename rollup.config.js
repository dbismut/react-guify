import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import { terser } from 'rollup-plugin-terser'
import fs from 'fs-extra'

import pkg from './package.json'

const options = { sourcemap: true, exports: 'named', freeze: false }

const getConfig = ({ format, file, env }) => {
  const shouldMinify = env === 'production'

  const outputName = [pkg.name, format, env, shouldMinify ? 'min' : '', 'js']
    .filter(Boolean)
    .join('.')

  return {
    sourcemap: true,
    exports: 'named',
    freeze: false,
    file: `./dist/${outputName}`,
    format,
    plugins: [
      shouldMinify &&
        terser({
          sourcemap: true,
          output: { comments: false },
          compress: {
            keep_infinity: true,
            pure_getters: true,
            passes: 10,
          },
          ecma: 5,
          toplevel: format === 'cjs',
          warnings: true,
        }),
    ],
  }
}

const config = {
  input: 'src/index.jsx',
  output: [
    getConfig({ format: 'cjs', env: 'development' }),
    getConfig({ format: 'cjs', env: 'production' }),
    getConfig({ format: 'esm' }),
  ],
  external: ['react', 'react-dom', 'guify'],
  plugins: [
    babel({ exclude: 'node_modules/**' }),
    resolve(),
    commonjs(),
    sourceMaps(),
  ],
}

function writeCjsEntryFile(name) {
  const baseLine = `module.exports = require('./${name}`
  const contents = `
'use strict'
if (process.env.NODE_ENV === 'production') {
  ${baseLine}.cjs.production.min.js')
} else {
  ${baseLine}.cjs.development.js')
}
`
  return fs.writeFile('./dist/index.js', contents)
}

export default config
